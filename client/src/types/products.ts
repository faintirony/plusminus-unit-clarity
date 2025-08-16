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
  marginRub?: number; // рассчитываемое поле
  marginPercent?: number; // рассчитываемое поле
  isProfitable?: boolean; // рассчитываемое поле
  isActive: boolean;
  lastSyncedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilters {
  search: string;
  marketplace: MarketplaceType | 'all';
  profitability: 'all' | 'profitable' | 'unprofitable';
  marginFrom?: number;
  marginTo?: number;
}

export interface ColumnVisibility {
  name: boolean;
  marketplace: boolean;
  currentPrice: boolean;
  costPrice: boolean;
  commission: boolean;
  logisticsCost: boolean;
  advertisingCost: boolean;
  marginRub: boolean;
  marginPercent: boolean;
  lastSyncedAt: boolean;
}

export interface ProductStats {
  totalProducts: number;
  profitableProducts: number;
  unprofitableProducts: number;
  displayedCount: number;
}
