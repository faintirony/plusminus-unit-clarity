import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="pt-24 pb-12 lg:pt-32 lg:pb-20 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="animate-fade-in">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-success rounded-full mr-2"></span>
              Аналитика для тех, кто не любит аналитику
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Торгуете в{' '}
              <span className="text-success">плюс</span> или{' '}
              <span className="text-danger">минус</span>?
              <br />
              <span className="text-primary">
                Узнайте за 5 минут
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Простая юнит-экономика для селлеров Wildberries. 
              Никаких сложных отчетов — только понятные ответы.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                onClick={() => scrollToSection('cta')}
                className="bg-gradient-primary hover:shadow-primary transition-all duration-300 group"
              >
                Зарегистрироваться
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => scrollToSection('how-it-works')}
                className="border-primary/20 hover:border-primary/40"
              >
                Посмотреть как работает
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="animate-slide-up lg:order-first lg:order-last">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-2xl blur-3xl"></div>
              <div className="relative bg-card border border-border rounded-2xl shadow-lg w-full mx-auto p-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Кроссовки Nike Air Max 270</h3>
                    <div className="flex space-x-2">
                      <span className="bg-success/10 text-success px-3 py-1 rounded text-sm font-medium">ПРИБЫЛЬНЫЙ</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-2xl font-bold">₽5 990</div>
                      <div className="text-muted-foreground">ЦЕНА</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">₽3 500</div>
                      <div className="text-muted-foreground">СЕБЕСТОИМОСТЬ</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-success">₽1 021</div>
                      <div className="text-muted-foreground">МАРЖА ₽</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-success">17.1%</div>
                      <div className="text-muted-foreground">МАРЖА %</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Additional Details Section */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-success/10 rounded-xl blur-2xl"></div>
              <div className="relative bg-card border border-border/50 rounded-xl shadow-md w-full p-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Детальная структура расходов</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span>Логистика</span>
                      <span className="font-medium">₽200</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Эквайринг</span>
                      <span className="font-medium">₽45</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Штрафы от МП</span>
                      <span className="font-medium">₽0</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Прочие расходы</span>
                      <span className="font-medium">₽25</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Стоимость возвратов</span>
                      <span className="font-medium">₽120</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Реклама</span>
                      <span className="font-medium">₽150</span>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;