import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "lucide-react";
import { ProductFilters } from "@/types/products";

interface DatePickerProps {
  filters: ProductFilters;
  setFilters: (filters: ProductFilters) => void;
}

const periodButtons = [
  { key: 'day', label: 'День' },
  { key: 'week', label: 'Неделя' },
  { key: '2weeks', label: '2 недели' },
  { key: 'month', label: 'Месяц' },
  { key: '2months', label: '2 месяца' },
] as const;

export default function DatePicker({ filters, setFilters }: DatePickerProps) {
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
      case '2weeks':
        dateFrom = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
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
      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* Period Selection Buttons */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">Период:</span>
          {periodButtons.map((period) => (
            <Button
              key={period.key}
              variant={filters.selectedPeriod === period.key ? "default" : "outline"}
              size="sm"
              onClick={() => handlePeriodChange(period.key)}
              className={`px-3 py-1 text-sm ${
                filters.selectedPeriod === period.key 
                  ? "bg-blue-600 text-white" 
                  : "text-gray-600 hover:text-gray-800"
              }`}
              data-testid={`period-${period.key}`}
            >
              {period.label}
            </Button>
          ))}
        </div>

        {/* Custom Date Range */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">или</span>
          <div className="flex items-center space-x-2">
            <CalendarIcon className="w-4 h-4 text-gray-400" />
            <label className="text-sm text-gray-700">от:</label>
            <Input
              type="date"
              value={filters.dateFrom || ""}
              onChange={(e) => handleCustomDateChange('dateFrom', e.target.value)}
              className="w-36"
              data-testid="date-from-input"
            />
            <label className="text-sm text-gray-700">до:</label>
            <Input
              type="date"
              value={filters.dateTo || ""}
              onChange={(e) => handleCustomDateChange('dateTo', e.target.value)}
              className="w-36"
              data-testid="date-to-input"
            />
          </div>
        </div>
      </div>
    </div>
  );
}