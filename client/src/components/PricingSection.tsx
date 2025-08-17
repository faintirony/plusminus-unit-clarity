import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Shield, BarChart, MessageSquare, RefreshCw } from 'lucide-react';

const PricingSection = () => {
  const features = [
    {
      icon: <BarChart className="w-5 h-5 text-success" />,
      text: "Мониторинг до 1000 SKU"
    },
    {
      icon: <RefreshCw className="w-5 h-5 text-success" />,
      text: "Ежедневное обновление данных"
    },
    {
      icon: <MessageSquare className="w-5 h-5 text-success" />,
      text: "Telegram-уведомления"
    },
    {
      icon: <Shield className="w-5 h-5 text-success" />,
      text: "Безопасное хранение API-ключей"
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" className="py-16 lg:py-24 bg-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Простая и{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              честная цена
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            MVP-подход к ценообразованию. Один тариф, все включено, без скрытых платежей.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <Card className="border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-primary"></div>
            
            <CardHeader className="text-center pb-4">
              <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-success-light text-success text-sm font-medium mb-4">
                Пилотный тариф
              </div>
              <CardTitle className="text-2xl mb-2">
                Юнит-экономика
              </CardTitle>
              <div className="flex items-center justify-center">
                <span className="text-4xl font-bold">1,000</span>
                <span className="text-xl text-muted-foreground ml-1">₽/мес</span>
              </div>
            </CardHeader>

            <CardContent className="pt-4">
              <div className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    {feature.icon}
                    <span className="text-foreground">{feature.text}</span>
                  </div>
                ))}
              </div>


              <Button 
                onClick={() => scrollToSection('cta')}
                className="w-full bg-gradient-primary hover:shadow-primary transition-all duration-300"
                size="lg"
              >
                Начать бесплатный пилот
              </Button>

              <p className="text-sm text-muted-foreground text-center mt-4">
                Отмена в любое время. Без обязательств.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Нужно больше 1000 SKU?{' '}
            <button 
              onClick={() => scrollToSection('contacts')}
              className="text-primary hover:underline font-medium"
            >
              Напишите нам
            </button>
            {' '}для индивидуального предложения
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;