import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CheckCircle } from 'lucide-react';

const CTASection = () => {

  return (
    <section id="cta" className="py-16 lg:py-24 bg-gradient-to-br from-primary/10 via-background to-success/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Готовы узнать,{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              торгуете ли вы в плюс?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Подключите API-ключи Wildberries и получите анализ прибыльности ваших товаров
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="border-primary/20 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">
                Регистрация в ПлюсМинус
              </CardTitle>
              <p className="text-muted-foreground">
                Простая настройка, быстрый результат
              </p>
            </CardHeader>
            
            <CardContent className="p-8 text-center">
              <div className="space-y-6 mb-8">
                <div className="flex items-center justify-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-success" />
                  <span className="text-lg">Подключите API-ключи Wildberries</span>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-success" />
                  <span className="text-lg">Получите анализ за 5 минут</span>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-success" />
                  <span className="text-lg">Контролируйте прибыльность товаров</span>
                </div>
              </div>

              <Button 
                size="lg"
                className="w-full bg-gradient-primary hover:shadow-primary transition-all duration-300 group"
              >
                Зарегистрироваться
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CTASection;