import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import './types';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
const JWT_EXPIRES_IN = '30m';

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const verifyToken = (token: string): { userId: string } | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string };
  } catch {
    return null;
  }
};

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Токен не предоставлен' });
  }

  const token = authHeader.substring(7);
  const decoded = verifyToken(token);
  
  if (!decoded) {
    return res.status(401).json({ error: 'Недействительный токен' });
  }

  req.userId = decoded.userId;
  next();
};

// Crypto utilities for API token encryption
import crypto from 'crypto';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'your-32-character-key-here-change';
const ALGORITHM = 'aes-256-cbc';

export const encryptToken = (token: string): string => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY.slice(0, 32)), iv);
  let encrypted = cipher.update(token, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
};

export const decryptToken = (encryptedToken: string): string => {
  const textParts = encryptedToken.split(':');
  const iv = Buffer.from(textParts.shift()!, 'hex');
  const encryptedText = textParts.join(':');
  const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY.slice(0, 32)), iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

// Wildberries API validation
export const validateWildberriesToken = async (token: string): Promise<{ valid: boolean; error?: string }> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch('https://statistics-api.wildberries.ru/ping', {
      method: 'GET',
      headers: {
        'Authorization': token
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (response.status === 200) {
      return { valid: true };
    } else if (response.status === 401) {
      return { valid: false, error: 'Неверный токен. Проверьте правильность копирования' };
    } else if (response.status === 429) {
      return { valid: false, error: 'Слишком много попыток. Попробуйте через 30 секунд' };
    } else {
      return { valid: false, error: 'Ошибка валидации токена' };
    }
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return { valid: false, error: 'Превышено время ожидания ответа от Wildberries' };
    }
    return { valid: false, error: 'Ошибка соединения с Wildberries' };
  }
};