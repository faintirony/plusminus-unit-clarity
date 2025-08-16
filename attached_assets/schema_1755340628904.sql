-- ПлюсМинус - Схема базы данных для Supabase
-- Оптимизирована для работы с большими каталогами (до 50,000 SKU)

-- Включаем необходимые расширения
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Enum типы
CREATE TYPE marketplace_type AS ENUM ('wildberries', 'ozon');
CREATE TYPE sync_status_type AS ENUM ('pending', 'running', 'completed', 'failed');

-- Таблица пользователей (расширяет auth.users)
CREATE TABLE public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Зашифрованные API ключи маркетплейсов
CREATE TABLE public.marketplace_credentials (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    marketplace marketplace_type NOT NULL,
    encrypted_api_key TEXT NOT NULL, -- AES-256 зашифрованный ключ
    is_valid BOOLEAN DEFAULT true,
    last_validated_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(user_id, marketplace)
);

-- Товары пользователей
CREATE TABLE public.products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    marketplace marketplace_type NOT NULL,
    sku TEXT NOT NULL, -- SKU товара на маркетплейсе
    name TEXT NOT NULL,
    
    -- Финансовые данные (в копейках для точности)
    current_price INTEGER, -- Текущая цена продажи
    cost_price INTEGER,    -- Себестоимость (вводит пользователь)
    commission INTEGER,    -- Комиссия маркетплейса
    logistics_cost INTEGER, -- Затраты на логистику
    advertising_cost INTEGER, -- Затраты на рекламу за единицу
    
    -- Рассчитываемые поля (в копейках и процентах)
    margin_rub INTEGER GENERATED ALWAYS AS (
        COALESCE(current_price, 0) - 
        COALESCE(cost_price, 0) - 
        COALESCE(commission, 0) - 
        COALESCE(logistics_cost, 0) - 
        COALESCE(advertising_cost, 0)
    ) STORED,
    
    margin_percent DECIMAL(5,2) GENERATED ALWAYS AS (
        CASE 
            WHEN COALESCE(current_price, 0) > 0 THEN
                ((COALESCE(current_price, 0) - 
                  COALESCE(cost_price, 0) - 
                  COALESCE(commission, 0) - 
                  COALESCE(logistics_cost, 0) - 
                  COALESCE(advertising_cost, 0)) * 100.0 / current_price)
            ELSE 0
        END
    ) STORED,
    
    -- Дополнительные поля
    is_profitable BOOLEAN GENERATED ALWAYS AS (
        (COALESCE(current_price, 0) - 
         COALESCE(cost_price, 0) - 
         COALESCE(commission, 0) - 
         COALESCE(logistics_cost, 0) - 
         COALESCE(advertising_cost, 0)) > 0
    ) STORED,
    
    -- Статусы и метаданные
    is_active BOOLEAN DEFAULT true,
    last_synced_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(user_id, marketplace, sku)
);

-- Исторические данные продаж (для анализа динамики)
CREATE TABLE public.sales_data (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
    date DATE NOT NULL,
    
    -- Данные за день (в копейках)
    revenue INTEGER DEFAULT 0, -- Выручка
    quantity INTEGER DEFAULT 0, -- Количество продаж
    returns INTEGER DEFAULT 0, -- Возвраты
    ad_spend INTEGER DEFAULT 0, -- Расходы на рекламу
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(product_id, date)
);

-- Логи синхронизации данных
CREATE TABLE public.sync_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    marketplace marketplace_type,
    status sync_status_type NOT NULL,
    started_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    products_synced INTEGER DEFAULT 0,
    error_message TEXT,
    metadata JSONB -- Дополнительная информация
);

-- Пресеты фильтров пользователей
CREATE TABLE public.filter_presets (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    filters JSONB NOT NULL, -- Сохраненные фильтры в JSON
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Создание индексов для производительности
CREATE INDEX idx_products_user_active ON public.products(user_id, is_active);
CREATE INDEX idx_products_user_margin ON public.products(user_id, margin_percent DESC) WHERE is_active = true;
CREATE INDEX idx_products_unprofitable ON public.products(user_id) WHERE margin_percent < 0 AND is_active = true;
CREATE INDEX idx_products_marketplace_sku ON public.products(marketplace, sku);
CREATE INDEX idx_sales_data_product_date ON public.sales_data(product_id, date);
CREATE INDEX idx_sync_logs_user_status ON public.sync_logs(user_id, status);
CREATE INDEX idx_sync_logs_started_at ON public.sync_logs(started_at);
CREATE INDEX idx_filter_presets_user ON public.filter_presets(user_id);

-- Функция для автоматического обновления updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Триггеры для автоматического обновления updated_at
CREATE TRIGGER users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER marketplace_credentials_updated_at
    BEFORE UPDATE ON public.marketplace_credentials
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER products_updated_at
    BEFORE UPDATE ON public.products
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER filter_presets_updated_at
    BEFORE UPDATE ON public.filter_presets
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Row Level Security (RLS) политики
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketplace_credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sync_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.filter_presets ENABLE ROW LEVEL SECURITY;

-- Политики безопасности для users
CREATE POLICY "Users can view own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

-- Политики для marketplace_credentials
CREATE POLICY "Users can manage own credentials" ON public.marketplace_credentials
    FOR ALL USING (auth.uid() = user_id);

-- Политики для products
CREATE POLICY "Users can manage own products" ON public.products
    FOR ALL USING (auth.uid() = user_id);

-- Политики для sales_data
CREATE POLICY "Users can view own sales data" ON public.sales_data
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.products 
            WHERE products.id = sales_data.product_id 
            AND products.user_id = auth.uid()
        )
    );

CREATE POLICY "System can insert sales data" ON public.sales_data
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.products 
            WHERE products.id = sales_data.product_id 
            AND products.user_id = auth.uid()
        )
    );

-- Политики для sync_logs
CREATE POLICY "Users can view own sync logs" ON public.sync_logs
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can manage sync logs" ON public.sync_logs
    FOR ALL USING (auth.uid() = user_id);

-- Политики для filter_presets
CREATE POLICY "Users can manage own filter presets" ON public.filter_presets
    FOR ALL USING (auth.uid() = user_id);

-- Функции для расчета метрик
CREATE OR REPLACE FUNCTION public.calculate_user_metrics(user_uuid UUID)
RETURNS TABLE (
    total_products INTEGER,
    profitable_products INTEGER,
    unprofitable_products INTEGER,
    avg_margin_percent DECIMAL,
    total_revenue_today INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*)::INTEGER as total_products,
        COUNT(*) FILTER (WHERE is_profitable = true)::INTEGER as profitable_products,
        COUNT(*) FILTER (WHERE is_profitable = false)::INTEGER as unprofitable_products,
        AVG(margin_percent) as avg_margin_percent,
        COALESCE(SUM(
            SELECT revenue 
            FROM public.sales_data 
            WHERE sales_data.product_id = products.id 
            AND sales_data.date = CURRENT_DATE
        ), 0)::INTEGER as total_revenue_today
    FROM public.products
    WHERE user_id = user_uuid AND is_active = true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Функция для поиска товаров
CREATE OR REPLACE FUNCTION public.search_products(
    user_uuid UUID,
    search_term TEXT DEFAULT '',
    marketplace_filter marketplace_type DEFAULT NULL,
    min_margin DECIMAL DEFAULT NULL,
    max_margin DECIMAL DEFAULT NULL,
    only_unprofitable BOOLEAN DEFAULT false
)
RETURNS SETOF public.products AS $$
BEGIN
    RETURN QUERY
    SELECT *
    FROM public.products
    WHERE user_id = user_uuid
    AND is_active = true
    AND (search_term = '' OR name ILIKE '%' || search_term || '%' OR sku ILIKE '%' || search_term || '%')
    AND (marketplace_filter IS NULL OR marketplace = marketplace_filter)
    AND (min_margin IS NULL OR margin_percent >= min_margin)
    AND (max_margin IS NULL OR margin_percent <= max_margin)
    AND (only_unprofitable = false OR is_profitable = false)
    ORDER BY margin_percent DESC NULLS LAST;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Вставка тестовых данных (только для разработки)
-- INSERT INTO auth.users (id, email) VALUES 
-- ('550e8400-e29b-41d4-a716-446655440000', 'test@example.com');

-- INSERT INTO public.users (id, email, name) VALUES 
-- ('550e8400-e29b-41d4-a716-446655440000', 'test@example.com', 'Тестовый пользователь');