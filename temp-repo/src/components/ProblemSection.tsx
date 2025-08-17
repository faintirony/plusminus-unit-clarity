import { Card, CardContent } from '@/components/ui/card';
import { BarChart3, TrendingDown, Clock } from 'lucide-react';

const ProblemSection = () => {
  const problems = [
    {
      icon: <BarChart3 className="w-8 h-8 text-danger" />,
      title: "45+ отчетов в сервисе аналитики, а простого ответа нет",
      description: "Теряетесь в море данных и не можете быстро понять какие товары приносят прибыль"
    },
    {
      icon: <TrendingDown className="w-8 h-8 text-danger" />,
      title: "Теряете деньги на убыточных товарах",
      description: "Продолжаете продвигать товары в минусе, не зная об этом до конца месяца"
    },
    {
      icon: <Clock className="w-8 h-8 text-danger" />,
      title: "Тратите часы на анализ вместо продаж",
      description: "Вместо развития бизнеса сидите в Excel'е и пытаетесь разобраться в цифрах"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-danger-light/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Существующие сервисы{' '}
            <span className="text-danger">перегружают данными</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Большинство аналитических сервисов дают много данных, но не дают простых ответов на главные вопросы бизнеса
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <Card 
              key={index} 
              className="border-danger/20 hover:border-danger/40 transition-all duration-300 hover:shadow-lg group"
            >
              <CardContent className="p-8 text-center">
                <div className="bg-danger-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  {problem.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  {problem.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {problem.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;