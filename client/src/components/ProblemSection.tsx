import { Card, CardContent } from '@/components/ui/card';
import { BarChart3, TrendingDown, Clock } from 'lucide-react';

const ProblemSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Существующие сервисы{' '}
            <span className="text-red-600">перегружают данными</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Большинство аналитических сервисов дают много данных, но не дают простых ответов на главные вопросы бизнеса
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center border-red-200">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                45+ отчетов в сервисе аналитики, а простого ответа нет
              </h3>
              <p className="text-muted-foreground">
                Теряетесь в море данных и не можете быстро понять какие товары приносят прибыль
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-red-200">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingDown className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Теряете деньги на убыточных товарах
              </h3>
              <p className="text-muted-foreground">
                Продолжаете продвигать товары в минусе, не зная об этом до конца месяца
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-red-200">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Тратите часы на анализ вместо продаж
              </h3>
              <p className="text-muted-foreground">
                Вместо развития бизнеса сидите в Excel'е и пытаетесь разобраться в цифрах
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;