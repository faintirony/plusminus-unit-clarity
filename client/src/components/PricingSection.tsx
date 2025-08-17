import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';
import { Link } from 'wouter';

const PricingSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Часто задаваемые{' '}
            <span className="text-primary">вопросы</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ответы на главные вопросы о ПлюсМинус, функциональности и процессе подключения
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-success/10 text-success hover:bg-success/10">
              🎉 Ограниченное предложение!
            </Badge>
          </div>
          
          <Card className="border-primary/20 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl mb-2">
                Готовы узнать, торгуете ли вы в{' '}
                <span className="text-success">плюс</span>?
              </CardTitle>
              <p className="text-muted-foreground">
                Подключите API-ключи Wildberries и получите анализ прибыльности ваших товаров
              </p>
            </CardHeader>
            
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">📋</div>
                  <div className="text-sm text-muted-foreground">
                    Проанализируем все товары WB
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">⚡</div>
                  <div className="text-sm text-muted-foreground">
                    Быстро получите
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">💰</div>
                  <div className="text-sm text-muted-foreground">
                    Понятная отчёт по каждому товару
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Link href="/register" data-testid="button-pricing-register">
                  <Button 
                    size="lg"
                    className="w-full md:w-auto bg-gradient-primary hover:shadow-primary transition-all duration-300"
                  >
                    Зарегистрироваться в ПлюсМинус
                  </Button>
                </Link>
                <p className="text-sm text-muted-foreground mt-4">
                  ✅ Подключение API-ключи Wildberries<br/>
                  ✅ Получите анализ за 5 минут<br/>
                  ✅ Автоматический расчёт прибыльности товаров
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;