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

    </div>
  );
}
