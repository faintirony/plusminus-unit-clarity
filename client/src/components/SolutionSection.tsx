import { Card, CardContent } from '@/components/ui/card';
import { Table2, Calculator, MessageSquare } from 'lucide-react';

const SolutionSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-success-light/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ПлюсМинус дает{' '}
            <span className="text-green-600">простые ответы</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Мы убрали все лишнее и оставили только то, что действительно нужно для принятия решений
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center border-green-200">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Table2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Один ответ вместо десятков отчётов
              </h3>
              <p className="text-muted-foreground">
                Привычный интерфейс таблицы с понятными данными. Никаких сложных дашбордов.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-green-200">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calculator className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Автоматический расчет по каждому SKU
              </h3>
              <p className="text-muted-foreground">
                Мы считаем прибыль и убытки за вас. Вы только указываете себестоимость.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-green-200">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Telegram-уведомления об убытках (скоро)
              </h3>
              <p className="text-muted-foreground">
                Моментально узнавайте когда товар уходит в минус и принимайте быстрые решения.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;