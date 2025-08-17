import { Card, CardContent } from '@/components/ui/card';
import { FileSpreadsheet, Calculator, MessageSquare } from 'lucide-react';

const SolutionSection = () => {
  const solutions = [
    {
      icon: <FileSpreadsheet className="w-8 h-8 text-success" />,
      title: "Один ответ вместо десятков отчётов",
      description: "Привычный интерфейс таблицы с понятными данными. Никаких сложных дашбордов."
    },
    {
      icon: <Calculator className="w-8 h-8 text-success" />,
      title: "Автоматический расчет по каждому SKU",
      description: "Мы считаем прибыль и убытки за вас. Вы только указываете себестоимость."
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-success" />,
      title: "Telegram-уведомления об убытках (скоро)",
      description: "Моментально узнавайте когда товар уходит в минус и принимайте быстрые решения."
    }
  ];

  return (
    <section id="about" className="py-16 lg:py-24 bg-success-light/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ПлюсМинус дает{' '}
            <span className="text-success">простые ответы</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Мы убрали все лишнее и оставили только то, что действительно нужно для принятия решений
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <Card 
              key={index} 
              className="border-success/20 hover:border-success/40 transition-all duration-300 hover:shadow-lg group bg-card"
            >
              <CardContent className="p-8 text-center">
                <div className="bg-success-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  {solution.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  {solution.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {solution.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;