import { XIcon, PinIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ColumnVisibility } from "@/types/products";

interface ColumnCustomizerProps {
  isOpen: boolean;
  columnVisibility: ColumnVisibility;
  onToggleColumn: (column: keyof ColumnVisibility) => void;
  onClose: () => void;
}

const columnLabels: Record<keyof ColumnVisibility, string> = {
  name: "Товар",
  marketplace: "Площадка", 
  category: "Категория",
  brand: "Бренд",
  subject: "Предмет",
  sku: "SKU",
  barcode: "Штрихкод",
  currentPrice: "Цена продажи",
  costPrice: "Себестоимость",
  commission: "Комиссия",
  logisticsCost: "Логистика",
  advertisingCost: "Реклама",
  totalExpenses: "Все расходы",
  marginRub: "Маржа ₽",
  marginPercent: "Маржа %",
  isProfitable: "Прибыльный",
  lastSyncedAt: "Обновлено",
};

const pinnedColumns = ["name", "costPrice", "marginRub", "marginPercent"];

export default function ColumnCustomizer({ isOpen, columnVisibility, onToggleColumn, onClose }: ColumnCustomizerProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-y-0 right-0 max-w-sm w-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50"
      data-testid="column-customizer"
    >
      <div className="flex flex-col h-full">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Настройка колонок</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
              data-testid="close-column-customizer"
            >
              <XIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="space-y-3">
            {Object.entries(columnLabels).map(([key, label]) => (
              <div key={key} className="flex items-center justify-between">
                <div className="flex items-center">
                  <Checkbox
                    id={`column-${key}`}
                    checked={columnVisibility[key as keyof ColumnVisibility]}
                    onCheckedChange={() => onToggleColumn(key as keyof ColumnVisibility)}
                    data-testid={`toggle-column-${key}`}
                  />
                  <Label 
                    htmlFor={`column-${key}`}
                    className="ml-2 text-sm text-gray-700 cursor-pointer"
                  >
                    {label}
                  </Label>
                </div>
                {pinnedColumns.includes(key) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-blue-800 p-1"
                    title="Закрепить колонку"
                    data-testid={`pin-column-${key}`}
                  >
                    <PinIcon className="w-3 h-3" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="px-6 py-4 border-t border-gray-200">
          <Button 
            className="w-full"
            onClick={onClose}
            data-testid="apply-column-settings"
          >
            Применить
          </Button>
        </div>
      </div>
    </div>
  );
}
