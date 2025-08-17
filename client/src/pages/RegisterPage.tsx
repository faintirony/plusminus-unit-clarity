import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { registerSchema, type RegisterData } from '@shared/schema';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

export default function RegisterPage() {
  const [, setLocation] = useLocation();
  const [serverError, setServerError] = useState<string>('');
  const { toast } = useToast();

  const form = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterData) => apiRequest('/api/auth/register', {
      method: 'POST',
      body: data,
    }),
    onSuccess: (result) => {
      // Store auth token in localStorage
      localStorage.setItem('authToken', result.token);
      
      toast({
        title: 'Регистрация успешна!',
        description: 'Теперь добавьте API-ключ Wildberries для работы с товарами',
        variant: 'default',
      });
      
      // Force page reload to trigger auth check
      window.location.href = '/app/stores';
    },
    onError: (error: any) => {
      const message = error?.message || 'Произошла ошибка при регистрации';
      setServerError(message);
    },
  });

  const onSubmit = (data: RegisterData) => {
    setServerError('');
    registerMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Регистрация в ПлюсМинус</CardTitle>
          <CardDescription>
            Создайте аккаунт для управления товарами
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {serverError && (
              <Alert variant="destructive">
                <AlertDescription>{serverError}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@mail.ru"
                {...form.register('email')}
                className={form.formState.errors.email ? 'border-red-500' : ''}
                data-testid="email-input"
              />
              {form.formState.errors.email && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="Минимум 8 символов с цифрой"
                {...form.register('password')}
                className={form.formState.errors.password ? 'border-red-500' : ''}
                data-testid="password-input"
              />
              {form.formState.errors.password && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.password.message}
                </p>
              )}
              <p className="text-xs text-gray-500">
                Пароль должен содержать минимум 8 символов и хотя бы одну цифру
              </p>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={registerMutation.isPending}
              data-testid="register-button"
            >
              {registerMutation.isPending ? 'Регистрация...' : 'Зарегистрироваться'}
            </Button>

            <div className="text-center text-sm">
              <span className="text-gray-600">Уже есть аккаунт? </span>
              <Link href="/login">
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                  data-testid="login-link"
                >
                  Войти
                </button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}