import { Card, CardContent } from '@/components/ui/card';
import { Key, Send, FileSpreadsheet, DollarSign } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      icon: <Key className="w-6 h-6 text-primary" />,
      title: "Регистрируетесь и создаёте API-ключи WB",
      description: "Генерируете API-ключи в личном кабинете маркетплейса. Это займет 2 минуты."
    },
    {
      number: "02",
      icon: <DollarSign className="w-6 h-6 text-primary" />,
      title: "Заполняете себестоимость и видите прибыль",
      description: "Указываете себестоимость товаров и сразу видите какие в плюсе, а какие в минусе."
    },
    {
      number: "03",
      icon: <FileSpreadsheet className="w-6 h-6 text-primary" />,
      title: "Получаете структуру расходов по каждому товару",
      description: "В течение 5 минут видите, какие товары убыточные и почему и можете оперативно внести изменения."
    }
  ];

  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Подключение за 7 минут
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Простой процесс настройки без сложных интеграций и долгих ожиданий
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 right-0 w-full h-0.5 bg-gradient-to-r from-primary to-primary/30 transform translate-x-1/2 z-0"></div>
              )}
              
              <Card className="relative z-10 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg group">
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                  <div className="text-2xl font-bold text-primary mb-2">{step.number}</div>
                  <h3 className="text-lg font-semibold mb-3 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-success-light text-success font-medium">
            <span className="w-2 h-2 bg-success rounded-full mr-3 animate-pulse"></span>
            Среднее время подключения: 7 минут
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;