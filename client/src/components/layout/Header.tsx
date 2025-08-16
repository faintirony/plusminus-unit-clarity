import { SearchIcon, DownloadIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProductFilters, Product } from "@/types/products";

interface HeaderProps {
  filters: ProductFilters;
  setFilters: (filters: ProductFilters) => void;
  products: Product[];
  onExport: () => void;
  isExporting?: boolean;
}

export default function Header({ filters, setFilters, products, onExport, isExporting = false }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-gray-900" data-testid="page-title">Товары</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
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
              onKeyDown={(e) => e.key === 'Escape' && setFilters({ ...filters, search: '' })}
              data-testid="search-input"
            />
          </div>

          {/* Export Button */}
          <Button
            onClick={onExport}
            disabled={isExporting || !products || products.length === 0}
            data-testid="export-button"
            className="inline-flex items-center px-4 h-10 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <DownloadIcon className={`w-4 h-4 mr-2 ${isExporting ? 'animate-spin' : ''}`} />
            {isExporting ? 'Экспорт...' : 'Экспорт'}
          </Button>
        </div>
      </div>
    </header>
  );
}
