import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { registerSchema, loginSchema, addStoreSchema } from "@shared/schema";
import { hashPassword, comparePassword, generateToken, authMiddleware, encryptToken, validateWildberriesToken } from "./auth";
import './types';

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.post('/api/auth/register', async (req, res) => {
    try {
      const validatedData = registerSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(validatedData.email);
      if (existingUser) {
        return res.status(400).json({ error: 'Пользователь с таким email уже существует' });
      }

      // Hash password and create user
      const passwordHash = await hashPassword(validatedData.password);
      const user = await storage.createUser({
        email: validatedData.email,
        passwordHash,
        name: null
      });

      // Generate token
      const token = generateToken(user.id);

      res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      });
    } catch (error: any) {
      if (error.issues) {
        return res.status(400).json({ error: error.issues[0].message });
      }
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
  });

  app.post('/api/auth/login', async (req, res) => {
    try {
      const validatedData = loginSchema.parse(req.body);
      
      // Find user
      const user = await storage.getUserByEmail(validatedData.email);
      if (!user) {
        return res.status(400).json({ error: 'Неверный email или пароль' });
      }

      // Verify password
      const isValidPassword = await comparePassword(validatedData.password, user.passwordHash);
      if (!isValidPassword) {
        return res.status(400).json({ error: 'Неверный email или пароль' });
      }

      // Check if user has stores
      const stores = await storage.getStoresByUserId(user.id);
      const hasStores = stores.length > 0;

      // Generate token
      const token = generateToken(user.id);

      res.json({
        token,
        hasStores,
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      });
    } catch (error: any) {
      if (error.issues) {
        return res.status(400).json({ error: error.issues[0].message });
      }
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
  });

  app.get('/api/auth/me', authMiddleware, async (req, res) => {
    try {
      const user = await storage.getUser(req.userId!);
      if (!user) {
        return res.status(404).json({ error: 'Пользователь не найден' });
      }

      res.json({
        id: user.id,
        email: user.email,
        name: user.name
      });
    } catch (error) {
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
  });

  // Store management routes
  app.get('/api/stores', authMiddleware, async (req, res) => {
    try {
      const stores = await storage.getStoresByUserId(req.userId!);
      
      // Don't expose encrypted API tokens
      const storesResponse = stores.map(store => ({
        id: store.id,
        userId: store.userId,
        marketplace: store.marketplace,
        name: store.name,
        isActive: store.isActive,
        lastValidatedAt: store.lastValidatedAt,
        createdAt: store.createdAt,
        updatedAt: store.updatedAt
      }));

      res.json(storesResponse);
    } catch (error) {
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
  });

  app.post('/api/stores', authMiddleware, async (req, res) => {
    try {
      const validatedData = addStoreSchema.parse(req.body);
      
      // Validate token with Wildberries API
      if (validatedData.marketplace === 'wildberries') {
        const validation = await validateWildberriesToken(validatedData.apiToken);
        if (!validation.valid) {
          return res.status(400).json({ error: validation.error });
        }
      }

      // Encrypt the API token
      const encryptedToken = encryptToken(validatedData.apiToken);

      // Create store
      const store = await storage.createStore({
        userId: req.userId!,
        marketplace: validatedData.marketplace,
        name: validatedData.name,
        apiToken: encryptedToken,
        lastValidatedAt: new Date()
      });

      res.json({
        id: store.id,
        userId: store.userId,
        marketplace: store.marketplace,
        name: store.name,
        isActive: store.isActive,
        lastValidatedAt: store.lastValidatedAt,
        createdAt: store.createdAt,
        updatedAt: store.updatedAt
      });
    } catch (error: any) {
      if (error.issues) {
        return res.status(400).json({ error: error.issues[0].message });
      }
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
  });

  app.post('/api/stores/validate-token', authMiddleware, async (req, res) => {
    try {
      const { token } = req.body;
      if (!token) {
        return res.status(400).json({ error: 'Токен не предоставлен' });
      }

      const validation = await validateWildberriesToken(token);
      
      if (validation.valid) {
        res.json({ valid: true });
      } else {
        res.status(400).json({ error: validation.error });
      }
    } catch (error) {
      res.status(500).json({ error: 'Ошибка валидации токена' });
    }
  });

  // Products routes (existing functionality)
  app.get('/api/products', authMiddleware, async (req, res) => {
    try {
      const products = await storage.getProductsByUserId(req.userId!);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Ошибка получения товаров' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
