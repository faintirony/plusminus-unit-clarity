import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Target, Zap } from 'lucide-react';

const SolutionSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-success-light/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ПлюсМинус даёт{' '}
            <span className="text-success">простые ответы</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Мы анализируем ваши данные и даём конкретные рекомендации без лишней сложности
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center border-success/20">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Один простой дашборд вместо
                сотни отчётов
              </h3>
              <p className="text-muted-foreground">
                Видите все товары и сразу понимаете, какие приносят прибыль
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-success/20">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Автоматический расчёт юнит-экономики WB
              </h3>
              <p className="text-muted-foreground">
                Подключите API-ключ и получите полную картину прибыльности
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-success/20">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Подключение за 5 минут
              </h3>
              <p className="text-muted-foreground">
                Быстрая настройка без сложных интеграций и обучения команды
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;