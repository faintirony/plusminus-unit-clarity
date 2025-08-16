import { useState } from "react";
import { ChevronDown, ChevronRight, Edit2 } from "lucide-react";
import { Product } from "@/types/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice, getMarginColorClass } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  onEdit: (productId: string) => void;
  columnVisibility?: Record<string, boolean>;
}

interface CollapsibleSectionProps {
  title: string;
  icon: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function CollapsibleSection({ title, icon, isOpen, onToggle, children }: CollapsibleSectionProps) {
  return (
    <div className="border-t border-gray-100">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 transition-colors"
        data-testid={`section-toggle-${title.toLowerCase()}`}
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">{icon}</span>
          <span className="font-medium text-gray-700">{title}</span>
        </div>
        {isOpen ? (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronRight className="w-4 h-4 text-gray-500" />
        )}
      </button>
      {isOpen && (
        <div className="px-3 pb-3">
          {children}
        </div>
      )}
    </div>
  );
}

export default function ProductCard({ product, onEdit, columnVisibility = {} }: ProductCardProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const profitabilityBadge = product.isProfitable ? (
    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
      ПРИБЫЛЬНЫЙ
    </Badge>
  ) : (
    <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
      УБЫТОЧНЫЙ
    </Badge>
  );

  return (
    <div 
      className={cn(
        "bg-white border border-gray-200 rounded-lg shadow-sm mb-3 overflow-hidden transition-shadow hover:shadow-md",
        product.isProfitable ? "border-l-4 border-l-green-500" : "border-l-4 border-l-red-500"
      )}
      data-testid={`product-card-${product.id}`}
    >
      {/* Header */}
      <div className="p-4">
        <div className="flex items-start gap-4">
          {/* Product Image */}
          <div className="flex-shrink-0">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-16 h-16 rounded-lg object-cover bg-gray-100"
              data-testid={`product-image-${product.id}`}
            />
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate mb-1" data-testid={`product-name-${product.id}`}>
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  {profitabilityBadge}
                  <span className="text-sm text-gray-500">
                    {product.marketplace === "wildberries" ? "Wildberries" : "OZON"}
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(product.id)}
                data-testid={`edit-button-${product.id}`}
              >
                <Edit2 className="w-4 h-4" />
              </Button>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-4 mt-3">
              <div>
                <div className="text-sm text-gray-500 mb-1">Цена продажи</div>
                <div className="font-semibold text-lg" data-testid={`price-${product.id}`}>
                  {formatPrice(product.currentPrice)}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Маржа руб</div>
                <div 
                  className={cn(
                    "font-semibold text-lg",
                    product.isProfitable ? "text-green-600" : "text-red-600"
                  )}
                  data-testid={`margin-rub-${product.id}`}
                >
                  {formatPrice(product.marginRub)}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Маржа %</div>
                <div 
                  className={cn(
                    "font-semibold text-lg",
                    product.isProfitable ? "text-green-600" : "text-red-600"
                  )}
                  data-testid={`margin-percent-${product.id}`}
                >
                  {product.marginPercent?.toFixed(1)}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Collapsible Sections */}
      <div className="border-t border-gray-100">
        {/* Finances Section */}
        <CollapsibleSection
          title="Финансы"
          icon="💰"
          isOpen={expandedSections.finances}
          onToggle={() => toggleSection('finances')}
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-500 mb-1">Себестоимость</div>
              <div className="font-medium" data-testid={`cost-price-${product.id}`}>
                {formatPrice(product.costPrice)}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Все расходы</div>
              <div className="font-medium" data-testid={`total-expenses-${product.id}`}>
                {formatPrice(product.totalExpenses)}
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* Expenses Section */}
        <CollapsibleSection
          title="Расходы"
          icon="📊"
          isOpen={expandedSections.expenses}
          onToggle={() => toggleSection('expenses')}
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-500 mb-1">Комиссия МП</div>
              <div className="font-medium">{formatPrice(product.commission)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Логистика</div>
              <div className="font-medium">{formatPrice(product.logisticsCost)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Эквайринг</div>
              <div className="font-medium">{formatPrice(product.acquiringCost)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Возвраты</div>
              <div className="font-medium">{formatPrice(product.returnCost)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Утилизация</div>
              <div className="font-medium">{formatPrice(product.disposalCost)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Штрафы</div>
              <div className="font-medium">{formatPrice(product.penaltyCost)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Прочие</div>
              <div className="font-medium">{formatPrice(product.otherCosts)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Реклама</div>
              <div className="font-medium">{formatPrice(product.advertisingCost)}</div>
            </div>
          </div>
        </CollapsibleSection>

        {/* Product Details Section */}
        <CollapsibleSection
          title="Товар"
          icon="📦"
          isOpen={expandedSections.product}
          onToggle={() => toggleSection('product')}
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-500 mb-1">Артикул</div>
              <div className="font-medium font-mono text-sm">{product.sku}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Площадка</div>
              <div className="font-medium">
                {product.marketplace === "wildberries" ? "Wildberries" : "OZON"}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Категория</div>
              <div className="font-medium">{product.category || "—"}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Бренд</div>
              <div className="font-medium">{product.brand || "—"}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">SKU</div>
              <div className="font-medium font-mono text-sm">{product.sku}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Штрихкод</div>
              <div className="font-medium font-mono text-sm">{product.barcode || "—"}</div>
            </div>
          </div>
        </CollapsibleSection>
      </div>
    </div>
  );
}