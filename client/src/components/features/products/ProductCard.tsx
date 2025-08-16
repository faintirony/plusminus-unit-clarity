import { useState } from "react";
import { PencilIcon } from "lucide-react";
import { Product } from "@/types/products";
import { formatPrice } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  onEdit: (productId: string) => void;
  columnVisibility?: Record<string, boolean>;
}

const ProductImage = ({ name, marketplace }: { name: string; marketplace: string }) => {
  const getIcon = () => {
    if (name.toLowerCase().includes('худи') || name.toLowerCase().includes('толстовка')) return '👘';
    if (name.toLowerCase().includes('футболка') || name.toLowerCase().includes('майка')) return '👕';
    if (name.toLowerCase().includes('джинсы') || name.toLowerCase().includes('брюки')) return '👖';
    if (name.toLowerCase().includes('кроссовки') || name.toLowerCase().includes('обувь')) return '👟';
    if (name.toLowerCase().includes('рюкзак') || name.toLowerCase().includes('сумка')) return '🎒';
    if (name.toLowerCase().includes('часы')) return '⌚';
    if (name.toLowerCase().includes('телефон') || name.toLowerCase().includes('смартфон')) return '📱';
    return '📦';
  };

  return (
    <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center text-xl flex-shrink-0">
      {getIcon()}
    </div>
  );
};

export default function ProductCard({ product, onEdit, columnVisibility = {} }: ProductCardProps) {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const isProfitable = (product.marginRub || 0) > 0;

  const toggleTab = (tab: string) => {
    setActiveTab(activeTab === tab ? null : tab);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg mb-2 hover:border-gray-300 hover:shadow-sm transition-all duration-200 overflow-hidden">
      <div className="p-3">
        {/* Header */}
        <div className="flex items-start gap-3 mb-2">
          <ProductImage name={product.name} marketplace={product.marketplace} />
          <div className="flex-1 min-w-0">
            <h3 
              className="text-[15px] font-semibold text-gray-900 mb-0.5 line-clamp-1 leading-tight" 
              title={product.name}
              data-testid={`product-name-${product.id}`}
            >
              {product.name}
            </h3>
            <p className="text-xs text-gray-500" data-testid={`product-marketplace-${product.id}`}>
              {product.marketplace}
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span 
              className={cn(
                "px-2 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wide",
                isProfitable 
                  ? "bg-green-100 text-green-700" 
                  : "bg-red-100 text-red-700"
              )}
              data-testid={`product-profitability-${product.id}`}
            >
              {isProfitable ? 'ПРИБЫЛЬНЫЙ' : 'УБЫТОЧНЫЙ'}
            </span>
            <button
              onClick={() => onEdit(product.id)}
              className="border border-gray-200 rounded px-1.5 py-1 text-xs text-gray-600 hover:border-gray-300 hover:text-gray-700 transition-colors"
              data-testid={`edit-product-${product.id}`}
            >
              ✏️
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="flex gap-6 mb-3">
          <div className="text-left">
            <div className="text-base font-bold text-gray-900" data-testid={`product-price-${product.id}`}>
              {formatPrice(product.currentPrice)}
            </div>
            <div className="text-[11px] text-gray-400 uppercase tracking-wide">ЦЕНА</div>
          </div>
          <div className="text-left">
            <div className={cn("text-base font-bold", (product.marginRub || 0) >= 0 ? "text-green-600" : "text-red-600")} data-testid={`product-margin-rub-${product.id}`}>
              {formatPrice(product.marginRub || 0)}
            </div>
            <div className="text-[11px] text-gray-400 uppercase tracking-wide">МАРЖА ₽</div>
          </div>
          <div className="text-left">
            <div className={cn("text-base font-bold", (product.marginPercent || 0) >= 0 ? "text-green-600" : "text-red-600")} data-testid={`product-margin-percent-${product.id}`}>
              {(product.marginPercent || 0).toFixed(1)}%
            </div>
            <div className="text-[11px] text-gray-400 uppercase tracking-wide">МАРЖА %</div>
          </div>
        </div>

        {/* Horizontal Tabs */}
        <div className="flex gap-1 mb-0">
          <button
            className={cn(
              "px-3 py-1.5 border rounded-md text-xs font-medium transition-all flex items-center gap-1",
              activeTab === 'finances' 
                ? "bg-blue-500 text-white border-blue-500" 
                : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-gray-300"
            )}
            onClick={() => toggleTab('finances')}
            data-testid={`finances-tab-${product.id}`}
          >
            <span className="text-xs">💰</span>
            Финансы
          </button>
          <button
            className={cn(
              "px-3 py-1.5 border rounded-md text-xs font-medium transition-all flex items-center gap-1",
              activeTab === 'expenses' 
                ? "bg-blue-500 text-white border-blue-500" 
                : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-gray-300"
            )}
            onClick={() => toggleTab('expenses')}
            data-testid={`expenses-tab-${product.id}`}
          >
            <span className="text-xs">📊</span>
            Расходы
          </button>
          <button
            className={cn(
              "px-3 py-1.5 border rounded-md text-xs font-medium transition-all flex items-center gap-1",
              activeTab === 'product' 
                ? "bg-blue-500 text-white border-blue-500" 
                : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-gray-300"
            )}
            onClick={() => toggleTab('product')}
            data-testid={`product-tab-${product.id}`}
          >
            <span className="text-xs">📦</span>
            О товаре
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'finances' && (
        <div className="bg-gray-50 border-t border-gray-200 p-4 -mt-3 mx-[-1px] -mb-[-1px]">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex justify-between items-center py-1.5">
              <span className="text-sm text-gray-600">Себестоимость</span>
              <span 
                className="text-sm font-semibold cursor-pointer hover:bg-gray-100 px-2 py-1 rounded transition-colors" 
                onClick={() => onEdit(product.id)}
              >
                {formatPrice(product.costPrice)}
              </span>
            </div>
            <div className="flex justify-between items-center py-1.5">
              <span className="text-sm text-gray-600">Все расходы</span>
              <span className="text-sm font-semibold">{formatPrice(product.totalExpenses || 0)}</span>
            </div>
            <div className="flex justify-between items-center py-1.5">
              <span className="text-sm text-gray-600">Комиссия МП</span>
              <span className="text-sm font-semibold">{formatPrice(product.commission)}</span>
            </div>
            <div className="flex justify-between items-center py-1.5">
              <span className="text-sm text-gray-600">Маржа руб</span>
              <span className={cn("text-sm font-semibold", (product.marginRub || 0) >= 0 ? "text-green-600" : "text-red-600")}>
                {formatPrice(product.marginRub || 0)}
              </span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'expenses' && (
        <div className="bg-gray-50 border-t border-gray-200 p-4 -mt-3 mx-[-1px] -mb-[-1px]">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex justify-between items-center py-1.5">
              <span className="text-sm text-gray-600">Логистика</span>
              <span className="text-sm font-semibold">{formatPrice(product.logisticsCost)}</span>
            </div>
            <div className="flex justify-between items-center py-1.5">
              <span className="text-sm text-gray-600">Эквайринг</span>
              <span className="text-sm font-semibold">{formatPrice(product.acquiringCost || 0)}</span>
            </div>
            <div className="flex justify-between items-center py-1.5">
              <span className="text-sm text-gray-600">Стоимость возвратов</span>
              <span className="text-sm font-semibold">{formatPrice(product.returnCost || 0)}</span>
            </div>
            <div className="flex justify-between items-center py-1.5">
              <span className="text-sm text-gray-600">Утилизация</span>
              <span className="text-sm font-semibold">{formatPrice(product.disposalCost || 0)}</span>
            </div>
            <div className="flex justify-between items-center py-1.5">
              <span className="text-sm text-gray-600">Штрафы от МП</span>
              <span className="text-sm font-semibold">{formatPrice(product.penaltyCost || 0)}</span>
            </div>
            <div className="flex justify-between items-center py-1.5">
              <span className="text-sm text-gray-600">Прочие расходы</span>
              <span className="text-sm font-semibold">{formatPrice(product.otherCosts || 0)}</span>
            </div>
            <div className="flex justify-between items-center py-1.5">
              <span className="text-sm text-gray-600">Реклама</span>
              <span className="text-sm font-semibold">{formatPrice(product.advertisingCost || 0)}</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'product' && (
        <div className="bg-gray-50 border-t border-gray-200 p-4 -mt-3 mx-[-1px] -mb-[-1px]">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex justify-between items-center py-1.5">
              <span className="text-sm text-gray-600">SKU</span>
              <span className="text-sm font-semibold">{product.sku}</span>
            </div>
            <div className="flex justify-between items-center py-1.5">
              <span className="text-sm text-gray-600">Категория</span>
              <span className="text-sm font-semibold">{product.category || 'Не указана'}</span>
            </div>
            <div className="flex justify-between items-center py-1.5">
              <span className="text-sm text-gray-600">Бренд</span>
              <span className="text-sm font-semibold">{product.brand || 'Не указан'}</span>
            </div>
            <div className="flex justify-between items-center py-1.5">
              <span className="text-sm text-gray-600">Предмет</span>
              <span className="text-sm font-semibold">{product.subject || 'Не указан'}</span>
            </div>
            <div className="flex justify-between items-center py-1.5">
              <span className="text-sm text-gray-600">Штрихкод</span>
              <span className="text-sm font-semibold">{product.barcode || 'Не указан'}</span>
            </div>
            <div className="flex justify-between items-center py-1.5">
              <span className="text-sm text-gray-600">Последняя синхронизация</span>
              <span className="text-sm font-semibold">{new Date(product.lastSyncedAt).toLocaleDateString('ru-RU')}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}