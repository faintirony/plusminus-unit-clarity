import { useState } from "react";
import { Product } from "@/types/products";
import { formatPrice } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  onEdit: (productId: string) => void;
  onUpdateProduct?: (productId: string, updates: Partial<Product>) => void;
  columnVisibility?: Record<string, boolean>;
}

const ProductImage = ({ name }: { name: string }) => {
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
    <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center text-base flex-shrink-0">
      {getIcon()}
    </div>
  );
};

export default function ProductCard({ product, onEdit, onUpdateProduct, columnVisibility = {} }: ProductCardProps) {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [isEditingCostPrice, setIsEditingCostPrice] = useState(false);
  const [costPriceValue, setCostPriceValue] = useState(((product.costPrice || 0) / 100).toString());
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState<'success' | 'error'>('success');

  const isProfitable = product.isProfitable;

  const toggleTab = (tab: string) => {
    setActiveTab(activeTab === tab ? null : tab);
  };

  const handleCostPriceEdit = () => {
    setIsEditingCostPrice(true);
    setCostPriceValue(((product.costPrice || 0) / 100).toString());
  };

  const showNotificationMessage = (message: string, type: 'success' | 'error' = 'success') => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const handleCostPriceSave = () => {
    const newValue = parseFloat(costPriceValue) * 100;
    const oldValue = product.costPrice || 0;
    
    if (isNaN(newValue) || newValue < 0) {
      showNotificationMessage('Введите корректную стоимость', 'error');
      return;
    }

    if (oldValue === newValue) {
      setIsEditingCostPrice(false);
      return;
    }

    // Calculate new margin values
    const salePrice = product.currentPrice || 0;
    const fees = (product.commission || 0) + (product.logisticsCost || 0) + (product.advertisingCost || 0);
    const marginRub = salePrice - newValue - fees;
    const marginPercent = salePrice > 0 ? (marginRub / salePrice) * 100 : 0;
    
    // Update the product data
    if (onUpdateProduct) {
      onUpdateProduct(product.id, {
        costPrice: newValue,
        marginRub,
        marginPercent,
        isProfitable: marginRub > 0,
      });
      
      const oldFormatted = formatPrice(oldValue);
      const newFormatted = formatPrice(newValue);
      showNotificationMessage(`Себестоимость обновлена: ${oldFormatted} → ${newFormatted}`);
    }
    
    setIsEditingCostPrice(false);
  };

  const handleCostPriceCancel = () => {
    setIsEditingCostPrice(false);
    setCostPriceValue(((product.costPrice || 0) / 100).toString());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCostPriceSave();
    } else if (e.key === 'Escape') {
      handleCostPriceCancel();
    }
  };

  const getMarketplaceName = (marketplace: string) => {
    const names: Record<string, string> = {
      'wildberries': 'WB',
      'ozon': 'OZON',
      'Wildberries': 'WB',
      'OZON': 'OZON'
    };
    return names[marketplace] || marketplace;
  };

  return (
    <>
      {/* Notification */}
      {showNotification && (
        <div className={`fixed top-20 right-5 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-white font-medium transform transition-all duration-300 ${
          notificationType === 'success' ? 'bg-green-500' : 'bg-red-500'
        } ${showNotification ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
          <span className="text-base">{notificationType === 'success' ? '✓' : '⚠'}</span>
          <span className="text-sm">{notificationMessage}</span>
          <button
            onClick={() => setShowNotification(false)}
            className="ml-2 text-white hover:text-gray-200 transition-colors"
          >
            ✕
          </button>
        </div>
      )}

      <div className="bg-white hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0">
      {/* Main card content - fixed grid layout */}
      <div className="px-2 py-3 grid gap-2 items-center min-h-[52px] 
                     grid-cols-[32px_1fr_60px_60px_50px_28px_84px] 
                     sm:grid-cols-[36px_1fr_70px_90px_70px_60px_120px_96px] 
                     lg:grid-cols-[40px_1fr_80px_100px_80px_70px_140px_120px]
                     xl:grid-cols-[45px_1fr_90px_110px_90px_75px_160px_140px]">
        {/* Product Icon */}
        <div className="flex items-center justify-center">
          <ProductImage name={product.name} />
        </div>

        {/* Product Info */}
        <div className="min-w-0">
          <h3 
            className="text-sm font-semibold text-gray-900 mb-0.5 truncate leading-tight" 
            title={product.name}
            data-testid={`product-name-${product.id}`}
          >
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 font-medium" data-testid={`product-marketplace-${product.id}`}>
            {getMarketplaceName(product.marketplace)}
          </p>
        </div>

        {/* Price Column */}
        <div className="flex flex-col items-center justify-center text-center">
          <div className="text-sm font-bold text-gray-900" data-testid={`product-price-${product.id}`}>
            {formatPrice(product.currentPrice)}
          </div>
          <div className="text-[9px] text-gray-400 uppercase tracking-wide font-medium">ЦЕНА</div>
        </div>

        {/* Cost Price Column with Enhanced Inline Editing */}
        <div className="hidden sm:flex flex-col items-center justify-center text-center relative">
          {isEditingCostPrice ? (
            <div className={`flex items-center gap-1 border-2 rounded px-2 py-1 shadow-sm ${
              product.costPrice === null || product.costPrice === undefined 
                ? 'bg-yellow-50 border-yellow-300' 
                : 'bg-orange-50 border-orange-300'
            }`}>
              <input
                type="number"
                value={costPriceValue}
                onChange={(e) => setCostPriceValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-16 text-sm font-bold text-center border-none outline-none bg-transparent"
                autoFocus
                step="0.01"
                min="0"
              />
              <div className="flex gap-1">
                <button
                  onClick={handleCostPriceSave}
                  className="w-4 h-4 flex items-center justify-center bg-green-100 text-green-600 hover:bg-green-200 rounded text-xs transition-colors"
                  title="Сохранить"
                >
                  ✓
                </button>
                <button
                  onClick={handleCostPriceCancel}
                  className="w-4 h-4 flex items-center justify-center bg-red-100 text-red-600 hover:bg-red-200 rounded text-xs transition-colors"
                  title="Отменить"
                >
                  ✕
                </button>
              </div>
            </div>
          ) : (
            <div 
              className={`flex items-center gap-1 text-sm font-bold cursor-pointer px-2 py-1 rounded transition-colors border group ${
                product.costPrice === null || product.costPrice === undefined
                  ? 'text-gray-500 italic hover:bg-yellow-50 border-transparent hover:border-yellow-300'
                  : 'text-gray-900 hover:bg-gray-100 border-transparent hover:border-gray-200'
              }`}
              onClick={handleCostPriceEdit}
              data-testid={`product-cost-price-${product.id}`}
            >
              <span>
                {product.costPrice === null || product.costPrice === undefined 
                  ? 'Не указано' 
                  : formatPrice(product.costPrice)
                }
              </span>
              <span className="text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">✏️</span>
            </div>
          )}
          <div className="text-[9px] text-gray-400 uppercase tracking-wide font-medium">СЕБЕСТОИМОСТЬ</div>
        </div>

        {/* Margin Rub Column */}
        <div className="flex flex-col items-center justify-center text-center">
          <div 
            className={cn(
              "text-sm font-bold", 
              product.marginRub === null || product.marginRub === undefined ? "text-gray-400" :
              (product.marginRub >= 0 ? "text-green-600" : "text-red-600")
            )} 
            data-testid={`product-margin-rub-${product.id}`}
          >
            {product.marginRub === null ? "—" : formatPrice(product.marginRub)}
          </div>
          <div className="text-[9px] text-gray-400 uppercase tracking-wide font-medium">МАРЖА ₽</div>
        </div>

        {/* Margin Percent Column */}
        <div className="flex flex-col items-center justify-center text-center">
          <div 
            className={cn(
              "text-sm font-bold", 
              product.marginPercent === null || product.marginPercent === undefined ? "text-gray-400" :
              (product.marginPercent >= 0 ? "text-green-600" : "text-red-600")
            )} 
            data-testid={`product-margin-percent-${product.id}`}
          >
            {product.marginPercent === null || product.marginPercent === undefined ? "—" : `${product.marginPercent.toFixed(1)}%`}
          </div>
          <div className="text-[9px] text-gray-400 uppercase tracking-wide font-medium">МАРЖА %</div>
        </div>

        {/* Profitability Badge */}
        <div className="flex justify-center items-center w-full overflow-visible">
          {product.isProfitable === null ? (
            <div className="relative group">
              <div className="w-7 h-7 bg-gray-50 border border-gray-300 rounded-full flex items-center justify-center text-sm font-bold text-gray-600 cursor-help hover:bg-gray-100 hover:border-gray-400 transition-colors">
                ?
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                  Укажите себестоимость
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center w-full">
              <span 
                className={cn(
                  "px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide whitespace-nowrap text-center flex items-center justify-center",
                  product.isProfitable === true
                    ? "bg-green-100 text-green-700" 
                    : "bg-red-100 text-red-700"
                )}
                data-testid={`product-profitability-${product.id}`}
                style={{ fontSize: '8px', padding: '2px 6px', lineHeight: '1.2' }}
              >
                {product.isProfitable === true ? 'ПРИБЫЛЬНЫЙ' : 'УБЫТОЧНЫЙ'}
              </span>
            </div>
          )}
        </div>

        {/* Tab Buttons */}
        <div className="flex gap-1 justify-end">
          <button
            className={cn(
              "px-2 py-1.5 border rounded text-xs font-medium transition-all flex items-center gap-1 relative group",
              activeTab === 'finances' 
                ? "bg-blue-500 text-white border-blue-500" 
                : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
            )}
            onClick={() => toggleTab('finances')}
            data-testid={`finances-tab-${product.id}`}
          >
            <span className="text-xs">💰</span>
            <span className="hidden xl:inline text-xs">Финансы</span>
            <div className="xl:hidden absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              Финансы
            </div>
          </button>
          <button
            className={cn(
              "px-2 py-1.5 border rounded text-xs font-medium transition-all flex items-center gap-1 relative group",
              activeTab === 'expenses' 
                ? "bg-blue-500 text-white border-blue-500" 
                : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
            )}
            onClick={() => toggleTab('expenses')}
            data-testid={`expenses-tab-${product.id}`}
          >
            <span className="text-xs">📊</span>
            <span className="hidden xl:inline text-xs">Расходы</span>
            <div className="xl:hidden absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              Расходы
            </div>
          </button>
          <button
            className={cn(
              "px-2 py-1.5 border rounded text-xs font-medium transition-all flex items-center gap-1 relative group",
              activeTab === 'product' 
                ? "bg-blue-500 text-white border-blue-500" 
                : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
            )}
            onClick={() => toggleTab('product')}
            data-testid={`product-tab-${product.id}`}
          >
            <span className="text-xs">📦</span>
            <span className="hidden xl:inline text-xs">О товаре</span>
            <div className="xl:hidden absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              О товаре
            </div>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'finances' && (
        <div className="bg-gray-50 border-t border-gray-200 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="flex justify-between items-center py-1.5 px-3 bg-white rounded border">
              <span className="text-xs text-gray-600 font-medium">Себестоимость</span>
              <span 
                className="text-sm font-semibold cursor-pointer hover:bg-gray-100 px-2 py-1 rounded transition-colors" 
                onClick={handleCostPriceEdit}
              >
                {formatPrice(product.costPrice || 0)}
              </span>
            </div>
            <div className="flex justify-between items-center py-1.5 px-3 bg-white rounded border">
              <span className="text-xs text-gray-600 font-medium">Все расходы</span>
              <span className="text-sm font-semibold">{formatPrice(product.totalExpenses || 0)}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 px-3 bg-white rounded border">
              <span className="text-xs text-gray-600 font-medium">Комиссия МП</span>
              <span className="text-sm font-semibold">{formatPrice(product.commission)}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 px-3 bg-white rounded border">
              <span className="text-xs text-gray-600 font-medium">Маржа руб</span>
              <span className={cn("text-sm font-semibold", (product.marginRub || 0) >= 0 ? "text-green-600" : "text-red-600")}>
                {formatPrice(product.marginRub || 0)}
              </span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'expenses' && (
        <div className="bg-gray-50 border-t border-gray-200 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            <div className="flex justify-between items-center py-1.5 px-3 bg-white rounded border">
              <span className="text-xs text-gray-600 font-medium">Логистика</span>
              <span className="text-sm font-semibold">{formatPrice(product.logisticsCost)}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 px-3 bg-white rounded border">
              <span className="text-xs text-gray-600 font-medium">Эквайринг</span>
              <span className="text-sm font-semibold">{formatPrice(product.acquiringCost || 0)}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 px-3 bg-white rounded border">
              <span className="text-xs text-gray-600 font-medium">Стоимость возвратов</span>
              <span className="text-sm font-semibold">{formatPrice(product.returnCost || 0)}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 px-3 bg-white rounded border">
              <span className="text-xs text-gray-600 font-medium">Утилизация</span>
              <span className="text-sm font-semibold">{formatPrice(product.disposalCost || 0)}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 px-3 bg-white rounded border">
              <span className="text-xs text-gray-600 font-medium">Штрафы от МП</span>
              <span className="text-sm font-semibold">{formatPrice(product.penaltyCost || 0)}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 px-3 bg-white rounded border">
              <span className="text-xs text-gray-600 font-medium">Прочие расходы</span>
              <span className="text-sm font-semibold">{formatPrice(product.otherCosts || 0)}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 px-3 bg-white rounded border">
              <span className="text-xs text-gray-600 font-medium">Реклама</span>
              <span className="text-sm font-semibold">{formatPrice(product.advertisingCost || 0)}</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'product' && (
        <div className="bg-gray-50 border-t border-gray-200 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="flex justify-between items-center py-1.5 px-3 bg-white rounded border">
              <span className="text-xs text-gray-600 font-medium">SKU</span>
              <span className="text-sm font-semibold">{product.sku}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 px-3 bg-white rounded border">
              <span className="text-xs text-gray-600 font-medium">Категория</span>
              <span className="text-sm font-semibold">{product.category || 'Не указана'}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 px-3 bg-white rounded border">
              <span className="text-xs text-gray-600 font-medium">Бренд</span>
              <span className="text-sm font-semibold">{product.brand || 'Не указан'}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 px-3 bg-white rounded border">
              <span className="text-xs text-gray-600 font-medium">Предмет</span>
              <span className="text-sm font-semibold">{product.subject || 'Не указан'}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 px-3 bg-white rounded border">
              <span className="text-xs text-gray-600 font-medium">Штрихкод</span>
              <span className="text-sm font-semibold">{product.barcode || 'Не указан'}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 px-3 bg-white rounded border">
              <span className="text-xs text-gray-600 font-medium">Последняя синхронизация</span>
              <span className="text-sm font-semibold">{new Date(product.lastSyncedAt).toLocaleDateString('ru-RU')}</span>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
}