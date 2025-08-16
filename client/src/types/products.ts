export type MarketplaceType = 'wildberries' | 'ozon';

export interface Product {
  id: string;
  userId: string;
  marketplace: MarketplaceType;
  sku: string;
  name: string;
  imageUrl?: string;
  currentPrice?: number; // в копейках
  costPrice?: number; // в копейках
  commission?: number; // в копейках
  logisticsCost?: number; // в копейках
  advertisingCost?: number; // в копейках
  acquiringCost?: number; // эквайринг/обработка платежей в копейках
  returnCost?: number; // стоимость возвратов в копейках
  disposalCost?: number; // утилизация товаров в копейках
  penaltyCost?: number; // штрафы от маркетплейса в копейках
  otherCosts?: number; // прочие расходы в копейках
  marginRub?: number; // рассчитываемое поле
  marginPercent?: number; // рассчитываемое поле
  isProfitable?: boolean; // рассчитываемое поле
  isActive: boolean;
  lastSyncedAt: string;
  createdAt: string;
  updatedAt: string;
  // Новые поля
  category?: string;
  brand?: string;
  subject?: string;
  barcode?: string;
  totalExpenses?: number; // все расходы в копейках
  ordersCount?: number; // количество заказов
  purchasesCount?: number; // количество выкупов
  revenue?: number; // доходы в копейках
}

export interface ProductFilters {
  search: string;
  marketplace: MarketplaceType | 'all';
  profitability: 'all' | 'profitable' | 'unprofitable';
  marginFrom?: number;
  marginTo?: number;
  dateFrom?: string;
  dateTo?: string;
  selectedPeriod?: 'day' | 'week' | '2weeks' | 'month' | '2months' | 'custom';
}

export interface ColumnVisibility {
  name: boolean;
  marketplace: boolean;
  category: boolean;
  brand: boolean;
  subject: boolean;
  sku: boolean;
  barcode: boolean;
  currentPrice: boolean;
  costPrice: boolean;
  commission: boolean;
  logisticsCost: boolean;
  advertisingCost: boolean;
  acquiringCost: boolean;
  returnCost: boolean;
  disposalCost: boolean;
  penaltyCost: boolean;
  otherCosts: boolean;
  totalExpenses: boolean;
  marginRub: boolean;
  marginPercent: boolean;
  isProfitable: boolean;
  lastSyncedAt: boolean;
}

export interface ProductStats {
  totalProducts: number;
  profitableProducts: number;
  unprofitableProducts: number;
  displayedCount: number;
  totalOrders: number;
  totalPurchases: number;
  totalRevenue: number;
  totalExpenses: number;
  totalMargin: number;
}
