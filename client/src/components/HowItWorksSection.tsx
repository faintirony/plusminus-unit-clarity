import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Database, BarChart, Target } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: <Database className="w-8 h-8 text-primary" />,
      title: "Подключение за 7 минут",
      description: "Простой ввод API-ключа WB. Никакой больше ручной работы с данными и таблицами"
    },
    {
      icon: <BarChart className="w-8 h-8 text-primary" />,
      title: "Автоматический расчёт юнит-экономики WB",
      description: "Система рассчитывает все комиссии, логистику и реальную прибыль по каждому товару"
    },
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: "Понятные рекомендации на основе данных",
      description: "Получаете конкретные советы: какие товары убрать, где поднять цены"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/10">
            Как это работает
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Подключение за 7 минут
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Простой процесс настройки для получения полной картины вашего бизнеса
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="h-full border-primary/20 hover:border-primary/40 transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
              
              {index < steps.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <div className="bg-white rounded-full p-2 shadow-lg">
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;