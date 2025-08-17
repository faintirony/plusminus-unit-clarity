import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, Clock, TrendingDown } from 'lucide-react';

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
          <Card className="text-center border-danger/20">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-danger/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-8 h-8 text-danger" />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                95% селлеров сдают позиции в первые месяцы
              </h3>
              <p className="text-muted-foreground">
                В погоне за оборотами забывают про затраты и торгуют в убыток
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-danger/20">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-danger/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-danger" />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Тратят часы на аналитические дашборды
              </h3>
              <p className="text-muted-foreground">
                Вместо одной метрики — десятки графиков и непонятных показателей
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-danger/20">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-danger/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TrendingDown className="w-8 h-8 text-danger" />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Тратят тысячи рублей на ненужный функционал
              </h3>
              <p className="text-muted-foreground">
                Платят за сложные системы, когда нужен простой ответ: плюс или минус
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;