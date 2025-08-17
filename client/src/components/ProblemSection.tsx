import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, Clock, TrendingDown } from 'lucide-react';

const ProblemSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Существующие сервисы{' '}
            <span className="text-danger">перегружают данными</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Сложная аналитика отнимает время, вместо того чтобы давать простые ответы
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center border-danger/20">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-danger/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-8 h-8 text-danger" />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Кто готовы к сложным аналитикам?
              </h3>
              <p className="text-muted-foreground">
                А нужно просто знать: какой товар убыточный и что с этим делать?
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-danger/20">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-danger/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-danger" />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Тратите десятки на аналитику но работаете
              </h3>
              <p className="text-muted-foreground">
                Покупаете дорогие сервисы аналитики, но все равно торгуете интуитивно
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-danger/20">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-danger/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TrendingDown className="w-8 h-8 text-danger" />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Тратите время на анализ вместо принятия решений
              </h3>
              <p className="text-muted-foreground">
                Аналитика должна давать простые рекомендации, а не заставлять думать
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;