# План разделения ПлюсМинус на фронтенд и бэкенд

## Обзор

Согласно PRD, проект использует **единую Next.js архитектуру** с API Routes, деплоящуюся на **Vercel**. 

Для удобства разработки:
1. **Разрабатываем API здесь (Claude Code)** - быстрая итерация с AI
2. **Затем переносим все в Replit** - единый проект для деплоя на Vercel

---

## Структура разделения

### 📱 Фронтенд (переносится в Replit)

**Папки и файлы для переноса:**
```
plusminus-frontend/
├── app/                          # Next.js App Router (только UI части)
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Landing page
│   ├── globals.css              # Стили
│   ├── (auth)/                  # Страницы авторизации
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── layout.tsx
│   └── dashboard/               # Основное приложение
│       ├── page.tsx             # Главная панель
│       ├── products/            # Страница товаров
│       ├── integrations/        # Настройки интеграций
│       ├── settings/            # Настройки профиля
│       └── layout.tsx
│
├── components/                   # React компоненты
│   ├── ui/                      # shadcn/ui базовые компоненты
│   ├── features/                # Функциональные компоненты
│   │   ├── auth/                # Компоненты авторизации
│   │   ├── products/            # Компоненты товаров
│   │   │   ├── ProductsTable.tsx
│   │   │   ├── ProductFilters.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   └── ExportButton.tsx
│   │   ├── table/               # Компоненты таблиц
│   │   │   ├── DataTable.tsx
│   │   │   ├── TableFilters.tsx
│   │   │   └── TablePagination.tsx
│   │   └── integrations/        # Компоненты интеграций
│   └── layout/                  # Layout компоненты
│       ├── Header.tsx
│       ├── Sidebar.tsx
│       └── Footer.tsx
│
├── hooks/                        # React hooks
│   ├── use-auth.ts              # Аутентификация
│   ├── use-products.ts          # Работа с товарами
│   ├── use-filters.ts           # Фильтрация
│   ├── use-table.ts             # Состояние таблицы
│   └── use-sync.ts              # Синхронизация
│
├── lib/                         # Клиентские утилиты
│   ├── api.ts                   # API клиент
│   ├── auth.ts                  # Клиентская аутентификация
│   ├── utils.ts                 # Общие утилиты
│   ├── constants.ts             # Константы
│   └── validations.ts           # Схемы валидации
│
├── types/                       # TypeScript типы (общие)
│   ├── auth.ts
│   ├── products.ts
│   ├── api.ts
│   └── ui.ts
│
├── public/                      # Статические файлы
│   ├── icons/
│   ├── images/
│   └── favicon.ico
│
├── package.json                 # Зависимости фронтенда
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
└── .env.local.example
```

**Основные зависимости фронтенда:**
```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@supabase/supabase-js": "^2.38.0",
    "next-auth": "^4.24.0",
    "@tanstack/react-table": "^8.10.0",
    "@tanstack/react-query": "^5.0.0",
    "axios": "^1.6.0",
    "zod": "^3.22.0",
    "date-fns": "^2.30.0",
    "tailwindcss": "^3.3.0",
    "lucide-react": "^0.294.0"
  }
}
```

### 🔧 Бэкенд (остается в Claude Code)

**Папки и файлы остаются здесь:**
```
plusminus-backend/
├── app/api/                     # API Routes
│   ├── auth/
│   │   ├── register/route.ts
│   │   ├── login/route.ts
│   │   └── logout/route.ts
│   ├── users/
│   │   ├── profile/route.ts
│   │   └── metrics/route.ts
│   ├── products/
│   │   ├── route.ts             # GET, POST products
│   │   ├── [id]/route.ts        # GET, PUT, DELETE product
│   │   └── [id]/cost/route.ts   # PUT cost price
│   ├── credentials/
│   │   ├── route.ts             # GET, POST credentials
│   │   └── [id]/route.ts        # DELETE credential
│   ├── sync/
│   │   ├── start/route.ts       # POST start sync
│   │   ├── status/[id]/route.ts # GET sync status
│   │   └── logs/route.ts        # GET sync logs
│   ├── exports/
│   │   └── excel/route.ts       # POST export to excel
│   ├── filters/
│   │   ├── route.ts             # GET, POST filters
│   │   └── [id]/route.ts        # PUT, DELETE filter
│   └── webhooks/
│       └── marketplace/route.ts # POST webhook
│
├── lib/                         # Серверные утилиты
│   ├── server/                  # Серверная логика
│   │   ├── auth.ts              # Серверная аутентификация
│   │   ├── db.ts                # Подключение к БД
│   │   ├── cache.ts             # Redis кэширование
│   │   ├── encryption.ts        # Шифрование API ключей
│   │   ├── validation.ts        # Валидация данных
│   │   └── rate-limit.ts        # Rate limiting
│   ├── marketplaces/            # Интеграции с маркетплейсами
│   │   ├── wildberries/
│   │   │   ├── client.ts        # WB API клиент
│   │   │   ├── parser.ts        # Парсинг данных WB
│   │   │   └── types.ts         # Типы WB API
│   │   ├── ozon/
│   │   │   ├── client.ts        # OZON API клиент
│   │   │   ├── parser.ts        # Парсинг данных OZON
│   │   │   └── types.ts         # Типы OZON API
│   │   ├── base.ts              # Базовый интерфейс
│   │   └── factory.ts           # Фабрика клиентов
│   ├── jobs/                    # Background jobs
│   │   ├── sync-products.ts     # Синхронизация товаров
│   │   ├── calculate-metrics.ts # Расчет метрик
│   │   ├── worker.ts            # Worker процесс
│   │   └── scheduler.ts         # Планировщик задач
│   └── utils/                   # Общие утилиты
│       ├── logger.ts            # Логирование
│       ├── errors.ts            # Обработка ошибок
│       └── email.ts             # Отправка email
│
├── types/                       # TypeScript типы (серверные)
│   ├── api.ts                   # API типы
│   ├── database.ts              # Типы БД
│   └── jobs.ts                  # Типы задач
│
├── supabase/                    # Конфигурация БД
│   ├── schema.sql               # Схема БД
│   └── migrations/              # Миграции
│
├── scripts/                     # Утилитарные скрипты
│   ├── setup-db.ts              # Настройка БД
│   ├── seed.ts                  # Заполнение тестовыми данными
│   └── deploy.sh                # Скрипт деплоя
│
├── tests/                       # Тесты
│   ├── api/                     # Тесты API
│   ├── services/                # Тесты сервисов
│   └── utils/                   # Тесты утилит
│
├── package.json                 # Зависимости бэкенда
├── tsconfig.json
├── next.config.js               # Конфигурация для API routes
└── .env.local.example
```

**Основные зависимости бэкенда:**
```json
{
  "dependencies": {
    "next": "^14.0.0",
    "@supabase/supabase-js": "^2.38.0",
    "next-auth": "^4.24.0",
    "axios": "^1.6.0",
    "zod": "^3.22.0",
    "bcryptjs": "^2.4.3",
    "crypto-js": "^4.2.0",
    "bullmq": "^4.15.0",
    "ioredis": "^5.3.2",
    "node-cron": "^3.0.3",
    "resend": "^2.0.0"
  }
}
```

---

## Процесс разделения

### Этап 1: Подготовка бэкенда (в Claude Code)

1. **Создать API endpoints:**
```bash
# Создаем базовые API routes
mkdir -p app/api/{auth,users,products,sync,exports,filters,webhooks}

# Создаем серверные сервисы
mkdir -p lib/{server,marketplaces,jobs}
```

2. **Настроить Supabase:**
```bash
# Применить схему БД
psql -d your_database -f supabase/schema.sql

# Настроить переменные окружения
cp .env.local.example .env.local
```

3. **Реализовать ключевые API:**
   - Аутентификация
   - CRUD товаров
   - Интеграции с маркетплейсами
   - Синхронизация данных

### Этап 2: Подготовка фронтенда (в Replit)

1. **Создать новый Next.js проект:**
```bash
npx create-next-app@latest plusminus-frontend --typescript --tailwind --app
```

2. **Перенести компоненты:**
   - Скопировать папки `components/`, `hooks/`, `app/` (UI части)
   - Настроить API клиент для подключения к бэкенду

3. **Настроить переменные окружения:**
```env
NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Этап 3: Интеграция

1. **API клиент на фронтенде:**
```typescript
// lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
})

// Добавление JWT токена к запросам
apiClient.interceptors.request.use((config) => {
  const token = getSupabaseToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
```

2. **CORS настройки на бэкенде:**
```typescript
// next.config.js
async headers() {
  return [
    {
      source: '/api/(.*)',
      headers: [
        {
          key: 'Access-Control-Allow-Origin',
          value: 'https://your-frontend-domain.com',
        },
      ],
    },
  ]
}
```

---

## Deployment Strategy

### Фронтенд (Replit → Vercel)
1. Разработка в Replit
2. Деплой на Vercel для продакшена
3. Настройка домена и SSL

### API Routes (Claude Code → Replit → Vercel)
1. Разработка API здесь в Claude Code
2. Перенос готового API в Replit
3. Деплой единого проекта на Vercel

---

## Переменные окружения

### Фронтенд (.env.local)
```env
NEXT_PUBLIC_API_URL=https://api.plusminus.ru
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

### Бэкенд (.env.local)
```env
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...
ENCRYPTION_KEY=your_32_character_key
REDIS_URL=redis://localhost:6379
RESEND_API_KEY=re_...
```

---

## Следующие шаги

1. ✅ Создать архитектуру и базовую структуру
2. 🔄 Реализовать API endpoints в бэкенде
3. ⏳ Создать фронтенд в Replit
4. ⏳ Интегрировать фронтенд с бэкендом
5. ⏳ Тестирование и деплой

**Готово для разделения!** Теперь можно копировать нужные файлы в Replit и начинать параллельную разработку.