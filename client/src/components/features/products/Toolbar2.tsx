import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { XIcon, SearchIcon } from "lucide-react";
import { ProductFilters, ProductStats } from "@/types/products";

interface Toolbar2Props {
  filters: ProductFilters;
  setFilters: (filters: ProductFilters) => void;
  onResetFilters: () => void;
  stats: ProductStats;
}

export default function Toolbar2({ filters, setFilters, onResetFilters, stats }: Toolbar2Props) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setFilters({ ...filters, search: '' });
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center space-x-4 flex-wrap">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              type="text"
              className="block w-64 pl-10 pr-3 h-10 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Поиск по названию или SKU..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              onKeyDown={handleKeyDown}
              data-testid="toolbar-search-input"
            />
          </div>

          {/* Marketplace Filter */}
          <div className="flex items-center space-x-2">
            <Select 
              value={filters.marketplace} 
              onValueChange={(value) => setFilters({ ...filters, marketplace: value as any })}
            >
              <SelectTrigger className="w-40 h-10" data-testid="marketplace-filter">
                <SelectValue placeholder="Маркетплейс" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все маркетплейсы</SelectItem>
                <SelectItem value="wildberries">Wildberries</SelectItem>
                <SelectItem value="ozon">OZON</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Profitability Filter */}
          <div className="flex items-center space-x-2">
            <Select 
              value={filters.profitability} 
              onValueChange={(value) => setFilters({ ...filters, profitability: value as any })}
            >
              <SelectTrigger className="w-40 h-10" data-testid="profitability-filter">
                <SelectValue placeholder="Прибыльность" />
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
            className="h-10 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            data-testid="reset-filters"
          >
            <XIcon className="w-4 h-4 mr-1" />
            Сбросить
          </Button>
        </div>

        {/* Results Counter */}
        <div className="text-sm text-gray-600">
          <span data-testid="results-count">
            Количество результатов: <span className="font-medium">{stats.displayedCount} товаров</span>
          </span>
        </div>
      </div>
    </div>
  );
}