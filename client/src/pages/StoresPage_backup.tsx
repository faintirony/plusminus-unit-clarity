import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { PlusIcon, StoreIcon, CheckCircleIcon, AlertCircleIcon } from 'lucide-react';
import { addStoreSchema, type AddStoreData, type Store } from '@shared/schema';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Link } from 'wouter';

export default function StoresPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [serverError, setServerError] = useState<string>('');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<AddStoreData>({
    resolver: zodResolver(addStoreSchema),
    defaultValues: {
      name: '',
      marketplace: 'wildberries',
      apiToken: '',
    },
  });

  // Fetch user's stores
  const { data: stores = [], isLoading } = useQuery<Store[]>({
    queryKey: ['/api/stores'],
  });

  const addStoreMutation = useMutation({
    mutationFn: (data: AddStoreData) => apiRequest('/api/stores', {
      method: 'POST',
      body: data,
    }),
    onSuccess: () => {
      toast({
        title: 'Магазин успешно добавлен',
        description: 'Теперь вы можете перейти в раздел "Товары" для просмотра данных',
        variant: 'default',
      });
      setIsDialogOpen(false);
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['/api/stores'] });
    },
    onError: (error: any) => {
      const message = error?.message || 'Произошла ошибка при добавлении магазина';
      setServerError(message);
    },
  });

  const onSubmit = (data: AddStoreData) => {
    setServerError('');
    addStoreMutation.mutate(data);
  };

  const validateTokenMutation = useMutation({
    mutationFn: (token: string) => apiRequest('/api/stores/validate-token', {
      method: 'POST',
      body: { token },
    }),
  });

  const handleValidateToken = () => {
    const token = form.getValues('apiToken');
    if (token) {
      validateTokenMutation.mutate(token);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Управление магазинами</h2>
            <p className="text-gray-600 mt-1">Подключите ваши магазины для автоматической синхронизации</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700" data-testid="add-store-button">
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Добавить магазин
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Добавить новый магазин</DialogTitle>
                  <DialogDescription>
                    Подключите ваш магазин на маркетплейсе для автоматической синхронизации данных
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {serverError && (
                    <Alert variant="destructive">
                      <AlertDescription>{serverError}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="name">Название магазина</Label>
                    <Input
                      id="name"
                      placeholder="Мой магазин на Wildberries"
                      {...form.register('name')}
                      className={form.formState.errors.name ? 'border-red-500' : ''}
                      data-testid="store-name-input"
                    />
                    {form.formState.errors.name && (
                      <p className="text-sm text-red-600">
                        {form.formState.errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="marketplace">Маркетплейс</Label>
                    <select
                      id="marketplace"
                      {...form.register('marketplace')}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      data-testid="marketplace-select"
                    >
                      <option value="wildberries">Wildberries</option>
                      <option value="ozon">OZON</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="apiToken">API Токен</Label>
                    <div className="flex gap-2">
                      <Input
                        id="apiToken"
                        type="password"
                        placeholder="Например, eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9..."
                        {...form.register('apiToken')}
                        className={form.formState.errors.apiToken ? 'border-red-500' : ''}
                        data-testid="api-token-input"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleValidateToken}
                        disabled={validateTokenMutation.isPending}
                        data-testid="validate-token-button"
                      >
                        {validateTokenMutation.isPending ? 'Проверка...' : 'Проверить'}
                      </Button>
                    </div>
                    {form.formState.errors.apiToken && (
                      <p className="text-sm text-red-600">
                        {form.formState.errors.apiToken.message}
                      </p>
                    )}
                    {validateTokenMutation.data && (
                      <div className="flex items-center gap-2 text-sm text-green-600">
                        <CheckCircleIcon className="w-4 h-4" />
                        Токен действителен
                      </div>
                    )}
                    {validateTokenMutation.error && (
                      <div className="flex items-center gap-2 text-sm text-red-600">
                        <AlertCircleIcon className="w-4 h-4" />
                        {(validateTokenMutation.error as any)?.message || 'Ошибка проверки токена'}
                      </div>
                    )}
                  </div>

                  {/* Instructions */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
                    <h4 className="font-medium text-blue-900">📋 Как получить токен Wildberries:</h4>
                    <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                      <li>Войдите в личный кабинет WB Партнеры</li>
                      <li>Перейдите в раздел "Настройки" → "Доступ к API"</li>
                      <li>Создайте токен с правами:
                        <ul className="ml-4 mt-1 list-disc list-inside">
                          <li>Контент</li>
                          <li>Маркетплейс</li>
                          <li>Статистика</li>
                          <li>Аналитика</li>
                        </ul>
                      </li>
                      <li>Скопируйте токен и вставьте в поле выше</li>
                    </ol>
                  </div>

                  <div className="flex justify-end gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Отмена
                    </Button>
                    <Button
                      type="submit"
                      disabled={addStoreMutation.isPending}
                      data-testid="submit-store-button"
                    >
                      {addStoreMutation.isPending ? 'Добавление...' : 'Добавить магазин'}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stores list */}

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : stores.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <StoreIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Нет подключенных магазинов
              </h3>
              <p className="text-gray-500 mb-6">
                Добавьте ваш первый магазин для начала работы с товарами
              </p>
              <Button
                onClick={() => setIsDialogOpen(true)}
                className="bg-blue-600 hover:bg-blue-700"
                data-testid="add-first-store-button"
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                Добавить первый магазин
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stores.map((store) => (
              <Card key={store.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{store.name}</CardTitle>
                    <Badge
                      variant={store.isActive ? "default" : "secondary"}
                      className={store.isActive ? "bg-green-100 text-green-800" : ""}
                    >
                      {store.isActive ? 'Активен' : 'Неактивен'}
                    </Badge>
                  </div>
                  <CardDescription className="capitalize">
                    {store.marketplace === 'wildberries' ? 'Wildberries' : 'OZON'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Добавлен:</span>
                      <span>{new Date(store.createdAt).toLocaleDateString('ru-RU')}</span>
                    </div>
                    {store.lastValidatedAt && (
                      <div className="flex justify-between">
                        <span>Проверен:</span>
                        <span>{store.lastValidatedAt ? new Date(store.lastValidatedAt).toLocaleDateString('ru-RU') : 'Никогда'}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}