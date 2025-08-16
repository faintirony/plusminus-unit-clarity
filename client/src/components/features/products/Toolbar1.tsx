import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "lucide-react";
import { ProductFilters, ProductStats } from "@/types/products";

interface Toolbar1Props {
  filters: ProductFilters;
  setFilters: (filters: ProductFilters) => void;
  stats: ProductStats;
}

const periodButtons = [
  { key: 'day', label: 'День' },
  { key: 'week', label: 'Неделя' },
  { key: 'month', label: 'Месяц' },
  { key: '2months', label: '2мес' },
] as const;

export default function Toolbar1({ filters, setFilters, stats }: Toolbar1Props) {
  const handlePeriodChange = (period: typeof periodButtons[number]['key']) => {
    const now = new Date();
    let dateFrom: Date;
    
    switch (period) {
      case 'day':
        dateFrom = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case 'week':
        dateFrom = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        dateFrom = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '2months':
        dateFrom = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);
        break;
      default:
        dateFrom = now;
    }
    
    setFilters({
      ...filters,
      selectedPeriod: period,
      dateFrom: dateFrom.toISOString().split('T')[0],
      dateTo: now.toISOString().split('T')[0],
    });
  };

  const handleCustomDateChange = (field: 'dateFrom' | 'dateTo', value: string) => {
    setFilters({
      ...filters,
      selectedPeriod: 'custom',
      [field]: value,
    });
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left: Period Selection */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Период:</span>
            {periodButtons.map((period) => (
              <Button
                key={period.key}
                variant={filters.selectedPeriod === period.key ? "default" : "outline"}
                size="sm"
                onClick={() => handlePeriodChange(period.key)}
                className={`h-10 px-3 text-sm ${
                  filters.selectedPeriod === period.key 
                    ? "bg-blue-600 text-white hover:bg-blue-700" 
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                }`}
                data-testid={`period-${period.key}`}
              >
                {period.label}
              </Button>
            ))}
          </div>

          {/* Custom Date Range */}
          <div className="flex items-center space-x-2 ml-6">
            <CalendarIcon className="w-4 h-4 text-gray-400" />
            <label className="text-sm text-gray-700">от:</label>
            <Input
              type="date"
              value={filters.dateFrom || ""}
              onChange={(e) => handleCustomDateChange('dateFrom', e.target.value)}
              className="w-36 h-10"
              data-testid="date-from-input"
            />
            <label className="text-sm text-gray-700">до:</label>
            <Input
              type="date"
              value={filters.dateTo || ""}
              onChange={(e) => handleCustomDateChange('dateTo', e.target.value)}
              className="w-36 h-10"
              data-testid="date-to-input"
            />
          </div>
        </div>

        {/* Right: Profit Indicators */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Прибыльные:</span>
            <span className="text-lg font-semibold text-green-600" data-testid="profitable-count">
              {stats.profitableProducts}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Убыточные:</span>
            <span className="text-lg font-semibold text-red-600" data-testid="unprofitable-count">
              {stats.unprofitableProducts}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}