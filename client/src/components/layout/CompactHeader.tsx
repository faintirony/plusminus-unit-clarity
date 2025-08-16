import { useState } from "react";
import { SearchIcon, DownloadIcon, MenuIcon, CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProductFilters, Product } from "@/types/products";
import { cn } from "@/lib/utils";

interface CompactHeaderProps {
  filters: ProductFilters;
  setFilters: (filters: ProductFilters) => void;
  products: Product[];
  onExport: () => void;
  isExporting?: boolean;
  stats: {
    total: number;
    profitable: number;
    unprofitable: number;
  };
}

export default function CompactHeader({ 
  filters, 
  setFilters, 
  products, 
  onExport, 
  isExporting = false,
  stats 
}: CompactHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handlePeriodChange = (period: string) => {
    let dateFrom = "";
    let dateTo = "";
    const now = new Date();
    
    switch (period) {
      case "today":
        dateFrom = dateTo = now.toISOString().split('T')[0];
        break;
      case "yesterday":
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        dateFrom = dateTo = yesterday.toISOString().split('T')[0];
        break;
      case "week":
        const weekAgo = new Date(now);
        weekAgo.setDate(weekAgo.getDate() - 7);
        dateFrom = weekAgo.toISOString().split('T')[0];
        dateTo = now.toISOString().split('T')[0];
        break;
      case "month":
        const monthAgo = new Date(now);
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        dateFrom = monthAgo.toISOString().split('T')[0];
        dateTo = now.toISOString().split('T')[0];
        break;
    }

    setFilters({
      ...filters,
      dateFrom,
      dateTo,
    });
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="px-6 py-2">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <h1 className="text-xl font-bold text-gray-900 mr-6" data-testid="app-title">
            ПлюсМинус
          </h1>

          {/* Desktop Filters */}
          <div className="hidden lg:flex items-center gap-3 flex-1">
            {/* Period Selector */}
            <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-md border">
              <CalendarIcon className="w-4 h-4 text-gray-500" />
              <Select value="month" onValueChange={handlePeriodChange}>
                <SelectTrigger className="border-0 bg-transparent p-0 h-auto font-medium text-sm min-w-[80px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Сегодня</SelectItem>
                  <SelectItem value="yesterday">Вчера</SelectItem>
                  <SelectItem value="week">Неделя</SelectItem>
                  <SelectItem value="month">Месяц</SelectItem>
                  <SelectItem value="custom">Кастомный</SelectItem>
                </SelectContent>
              </Select>
              
              {false && (
                <>
                  <Input
                    type="date"
                    value={filters.dateFrom}
                    onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                    className="border-0 bg-transparent p-0 text-sm w-28"
                  />
                  <span className="text-gray-500 text-sm">до</span>
                  <Input
                    type="date"
                    value={filters.dateTo}
                    onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                    className="border-0 bg-transparent p-0 text-sm w-28"
                  />
                </>
              )}
            </div>

            {/* Search */}
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="🔍 Поиск товаров..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="pl-10 w-48 h-9"
                data-testid="search-input"
              />
            </div>

            {/* Marketplace Filter */}
            <Select 
              value={filters.marketplace} 
              onValueChange={(value) => setFilters({ ...filters, marketplace: value as any })}
            >
              <SelectTrigger className="w-36 h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все площадки</SelectItem>
                <SelectItem value="wildberries">Wildberries</SelectItem>
                <SelectItem value="ozon">OZON</SelectItem>
              </SelectContent>
            </Select>

            {/* Profitability Filter */}
            <Select 
              value={filters.profitability} 
              onValueChange={(value) => setFilters({ ...filters, profitability: value as any })}
            >
              <SelectTrigger className="w-32 h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все товары</SelectItem>
                <SelectItem value="profitable">Прибыльные</SelectItem>
                <SelectItem value="unprofitable">Убыточные</SelectItem>
              </SelectContent>
            </Select>

            {/* Export Button */}
            <Button
              onClick={onExport}
              disabled={isExporting || !products || products.length === 0}
              size="sm"
              className="h-9"
              data-testid="export-button"
            >
              <DownloadIcon className={`w-4 h-4 mr-2 ${isExporting ? 'animate-spin' : ''}`} />
              {isExporting ? 'Экспорт...' : 'Экспорт'}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            <Input
              placeholder="🔍 Поиск..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-32 h-9"
              data-testid="mobile-search-input"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="h-9"
            >
              <MenuIcon className="w-4 h-4" />
            </Button>
          </div>

          {/* Stats Counter */}
          <div className="hidden md:flex items-center gap-4 text-sm ml-4">
            <div className="flex items-center gap-1">
              <span className="text-green-600 font-medium">Прибыльные:</span>
              <span className="font-semibold" data-testid="profitable-count">
                {stats.profitable}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-red-600 font-medium">Убыточные:</span>
              <span className="font-semibold" data-testid="unprofitable-count">
                {stats.unprofitable}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-bold text-gray-900" data-testid="total-count">
                {stats.total}
              </span>
              <span className="text-gray-600">товаров</span>
            </div>
          </div>
        </div>

        {/* Mobile Filters Panel */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 pt-3 pb-2 mt-2">
            <div className="grid grid-cols-2 gap-3">
              {/* Period */}
              <div className="col-span-2">
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-md border">
                  <CalendarIcon className="w-4 h-4 text-gray-500" />
                  <Select value="month" onValueChange={handlePeriodChange}>
                    <SelectTrigger className="border-0 bg-transparent p-0 h-auto font-medium text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Сегодня</SelectItem>
                      <SelectItem value="yesterday">Вчера</SelectItem>
                      <SelectItem value="week">Неделя</SelectItem>
                      <SelectItem value="month">Месяц</SelectItem>
                      <SelectItem value="custom">Кастомный</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {false && (
                <>
                  <Input
                    type="date"
                    value={filters.dateFrom}
                    onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                    className="text-sm"
                  />
                  <Input
                    type="date"
                    value={filters.dateTo}
                    onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                    className="text-sm"
                  />
                </>
              )}

              {/* Filters */}
              <Select 
                value={filters.marketplace} 
                onValueChange={(value) => setFilters({ ...filters, marketplace: value as any })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все площадки</SelectItem>
                  <SelectItem value="wildberries">Wildberries</SelectItem>
                  <SelectItem value="ozon">OZON</SelectItem>
                </SelectContent>
              </Select>

              <Select 
                value={filters.profitability} 
                onValueChange={(value) => setFilters({ ...filters, profitability: value as any })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все товары</SelectItem>
                  <SelectItem value="profitable">Прибыльные</SelectItem>
                  <SelectItem value="unprofitable">Убыточные</SelectItem>
                </SelectContent>
              </Select>

              {/* Export button for mobile */}
              <div className="col-span-2">
                <Button
                  onClick={onExport}
                  disabled={isExporting || !products || products.length === 0}
                  className="w-full"
                  data-testid="mobile-export-button"
                >
                  <DownloadIcon className={`w-4 h-4 mr-2 ${isExporting ? 'animate-spin' : ''}`} />
                  {isExporting ? 'Экспорт...' : 'Экспорт'}
                </Button>
              </div>
            </div>

            {/* Mobile Stats */}
            <div className="flex items-center justify-center gap-4 text-sm mt-3 pt-2 border-t border-gray-100">
              <span className="text-green-600">
                Прибыльные: <strong>{stats.profitable}</strong>
              </span>
              <span className="text-red-600">
                Убыточные: <strong>{stats.unprofitable}</strong>
              </span>
              <span className="text-gray-900">
                <strong>{stats.total}</strong> товаров
              </span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}