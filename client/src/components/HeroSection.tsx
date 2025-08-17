import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

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
              <span className="bg-gradient-primary bg-clip-text text-transparent">
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
              <img 
                src="/lovable-uploads/7c511d17-56f0-4a0b-9bbb-d96e3a5fc992.png"
                alt="Список товаров в сервисе ПлюсМинус с показателями прибыльности"
                className="relative rounded-2xl shadow-lg w-4/5 mx-auto"
              />
              <div className="absolute -bottom-6 -right-6 bg-card border border-border rounded-xl p-4 shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                  <span className="text-sm font-medium">90 товаров в плюсе</span>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="w-3 h-3 bg-danger rounded-full"></div>
                  <span className="text-sm font-medium">35 товаров в минусе</span>
                </div>
              </div>
            </div>
            
            {/* Additional Details Section */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-success/10 rounded-xl blur-2xl"></div>
                <img 
                  src="/lovable-uploads/282e9a2d-2991-41a6-a52a-15b84543b633.png"
                  alt="Детальная структура расходов по товару"
                  className="relative rounded-xl shadow-md w-full border border-border/50"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;