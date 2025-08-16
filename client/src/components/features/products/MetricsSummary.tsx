import { Card, CardContent } from "@/components/ui/card";
import { ProductStats } from "@/types/products";
import { formatPrice } from "@/lib/mock-data";

interface MetricsSummaryProps {
  stats: ProductStats;
}

export default function MetricsSummary({ stats }: MetricsSummaryProps) {
  const metrics = [
    {
      title: "Заказы",
      value: stats.totalOrders.toLocaleString("ru-RU"),
      emoji: "📦",
    },
    {
      title: "Выкупы", 
      value: stats.totalPurchases.toLocaleString("ru-RU"),
      emoji: "✅",
    },
    {
      title: "Доходы",
      value: formatPrice(stats.totalRevenue),
      emoji: "💰",
    },
    {
      title: "Расходы",
      value: formatPrice(stats.totalExpenses),
      emoji: "📉",
    },
    {
      title: "Маржа",
      value: formatPrice(stats.totalMargin),
      emoji: "🎯",
    },
  ];

  return (
    <div className="bg-white px-6 py-3 mb-3">      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {metrics.map((metric) => {
          return (
            <Card key={metric.title} className="border border-gray-200 hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl" role="img" aria-label={metric.title}>
                    {metric.emoji}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                    <p className="text-xl font-bold text-gray-900 mt-1" data-testid={`metric-${metric.title.toLowerCase()}`}>
                      {metric.value}
                    </p>
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