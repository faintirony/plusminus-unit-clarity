import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { loginSchema, type LoginData } from '@shared/schema';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const [serverError, setServerError] = useState<string>('');
  const { toast } = useToast();

  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const loginMutation = useMutation({
    mutationFn: (data: LoginData) => apiRequest('/api/auth/login', {
      method: 'POST',
      body: data,
    }),
    onSuccess: (result) => {
      // Store auth token in localStorage
      localStorage.setItem('authToken', result.token);
      
      // Check if user has stores/API keys
      if (result.hasStores) {
        setLocation('/app/products');
      } else {
        toast({
          title: 'Добро пожаловать!',
          description: 'Для работы с товарами необходимо добавить API-ключ Wildberries',
          variant: 'default',
        });
        setLocation('/app/stores');
      }
    },
    onError: (error: any) => {
      const message = error?.message || 'Произошла ошибка при авторизации';
      setServerError(message);
    },
  });

  const onSubmit = (data: LoginData) => {
    setServerError('');
    loginMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Вход в ПлюсМинус</CardTitle>
          <CardDescription>
            Введите email и пароль для входа в систему
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
                placeholder="Введите пароль"
                {...form.register('password')}
                className={form.formState.errors.password ? 'border-red-500' : ''}
                data-testid="password-input"
              />
              {form.formState.errors.password && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loginMutation.isPending}
              data-testid="login-button"
            >
              {loginMutation.isPending ? 'Вход...' : 'Войти'}
            </Button>

            <div className="text-center text-sm">
              <span className="text-gray-600">Нет аккаунта? </span>
              <Link href="/register">
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                  data-testid="register-link"
                >
                  Зарегистрироваться
                </button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}