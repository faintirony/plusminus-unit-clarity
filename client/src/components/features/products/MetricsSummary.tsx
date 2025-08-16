import { Card, CardContent } from "@/components/ui/card";
import { ProductStats } from "@/types/products";
import { formatPrice } from "@/lib/mock-data";
import { PackageIcon, CheckCircleIcon, DollarSignIcon, TrendingDownIcon, TargetIcon } from "lucide-react";

interface MetricsSummaryProps {
  stats: ProductStats;
  profitableCount: number;
  unprofitableCount: number;
}

export default function MetricsSummary({ stats, profitableCount, unprofitableCount }: MetricsSummaryProps) {
  const metrics = [
    {
      title: "Заказы",
      value: stats.totalOrders.toLocaleString("ru-RU"),
      icon: PackageIcon,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Выкупы", 
      value: stats.totalPurchases.toLocaleString("ru-RU"),
      icon: CheckCircleIcon,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Доходы",
      value: formatPrice(stats.totalRevenue),
      icon: DollarSignIcon,
      iconColor: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Расходы",
      value: formatPrice(stats.totalExpenses),
      icon: TrendingDownIcon,
      iconColor: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Маржа",
      value: formatPrice(stats.totalMargin),
      icon: TargetIcon,
      iconColor: stats.totalMargin > 0 ? "text-green-600" : "text-red-600",
      bgColor: stats.totalMargin > 0 ? "bg-green-50" : "bg-red-50",
    },
  ];

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Сводка по периоду</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm font-medium text-green-700">
              Прибыльные товары: {profitableCount}
            </span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <span className="text-sm font-medium text-red-700">
              Убыточные товары: {unprofitableCount}
            </span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.title} className="border border-gray-200 hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1" data-testid={`metric-${metric.title.toLowerCase()}`}>
                      {metric.value}
                    </p>
                  </div>
                  <div className={`p-2 ${metric.bgColor} rounded-lg`}>
                    <Icon className={`w-6 h-6 ${metric.iconColor}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}