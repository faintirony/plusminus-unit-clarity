import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { XIcon } from "lucide-react";
import { ProductFilters, ProductStats } from "@/types/products";

interface ProductFiltersProps {
  filters: ProductFilters;
  setFilters: (filters: ProductFilters) => void;
  onApplyPreset: (preset: string) => void;
  onResetFilters: () => void;
  stats: ProductStats;
}

export default function ProductFiltersComponent({ filters, setFilters, onApplyPreset, onResetFilters, stats }: ProductFiltersProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center space-x-4 flex-wrap">
        {/* Marketplace Filter */}
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">Маркетплейс:</label>
          <Select 
            value={filters.marketplace} 
            onValueChange={(value) => setFilters({ ...filters, marketplace: value as any })}
          >
            <SelectTrigger className="w-40" data-testid="marketplace-filter">
              <SelectValue placeholder="Все" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все</SelectItem>
              <SelectItem value="wildberries">Wildberries</SelectItem>
              <SelectItem value="ozon">OZON</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Profitability Filter */}
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">Прибыльность:</label>
          <Select 
            value={filters.profitability} 
            onValueChange={(value) => setFilters({ ...filters, profitability: value as any })}
          >
            <SelectTrigger className="w-40" data-testid="profitability-filter">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все товары</SelectItem>
              <SelectItem value="profitable">Прибыльные</SelectItem>
              <SelectItem value="unprofitable">Убыточные</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Margin Filter */}
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">Маржа:</label>
          <Input
            type="number"
            placeholder="От"
            className="w-20"
            value={filters.marginFrom || ""}
            onChange={(e) => setFilters({ ...filters, marginFrom: e.target.value ? Number(e.target.value) : undefined })}
            data-testid="margin-from-input"
          />
          <span className="text-gray-500">-</span>
          <Input
            type="number"
            placeholder="До"
            className="w-20"
            value={filters.marginTo || ""}
            onChange={(e) => setFilters({ ...filters, marginTo: e.target.value ? Number(e.target.value) : undefined })}
            data-testid="margin-to-input"
          />
          <span className="text-sm text-gray-500">%</span>
        </div>
        
        {/* Filter Presets */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onApplyPreset("unprofitable")}
            className={`px-3 py-1 text-xs font-medium rounded-full ${
              filters.profitability === "unprofitable" 
                ? "filter-active text-blue-600 bg-blue-50 border-blue-500" 
                : "text-gray-600 bg-gray-100 hover:bg-gray-200"
            }`}
            data-testid="preset-unprofitable"
          >
            Убыточные
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onApplyPreset("high-margin")}
            className={`px-3 py-1 text-xs font-medium rounded-full ${
              filters.marginFrom === 15 
                ? "filter-active text-blue-600 bg-blue-50 border-blue-500" 
                : "text-gray-600 bg-gray-100 hover:bg-gray-200"
            }`}
            data-testid="preset-high-margin"
          >
            Высокая маржа
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onApplyPreset("new-products")}
            className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200"
            data-testid="preset-new-products"
          >
            Новые товары
          </Button>
        </div>
        
        {/* Reset Filters */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onResetFilters}
          className="text-sm text-gray-500 hover:text-gray-700"
          data-testid="reset-filters"
        >
          <XIcon className="w-4 h-4 mr-1" />
          Сбросить фильтры
        </Button>
      </div>
      
      {/* Stats */}
      <div className="mt-4 flex items-center space-x-6 text-sm text-gray-500">
        <div>
          Показано <span className="font-medium text-gray-900">{stats.displayedCount}</span> из <span className="font-medium text-gray-900">{stats.totalProducts}</span> товаров
        </div>
        <div className="flex items-center space-x-4 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-100 rounded-sm mr-1"></div>
            <span>Прибыльных: <span className="font-medium">{stats.profitableProducts}</span></span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-100 rounded-sm mr-1"></div>
            <span>Убыточных: <span className="font-medium">{stats.unprofitableProducts}</span></span>
          </div>
        </div>
      </div>
    </div>
  );
}
