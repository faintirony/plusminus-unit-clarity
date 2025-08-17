import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

const HeroSection = () => {
  return (
    <section className="pt-24 pb-12 lg:pt-32 lg:pb-20 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Торгуете в{' '}
              <span className="text-success">плюс</span> или{' '}
              <span className="text-danger">минус</span>?
              <br />
              Узнайте за 5 минут
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Простой сервис мониторинга для селлеров Wildberries<br/>
              Без сложной аналитики — только суть
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register" data-testid="button-hero-register">
                <Button 
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-primary hover:shadow-primary transition-all duration-300"
                >
                  Попробовать бесплатно
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Images */}
          <div className="animate-slide-up lg:order-first lg:order-last space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-2xl blur-3xl"></div>
              <img 
                src="/attached_assets/Снимок экрана 2025-08-17 в 13.54.40_1755441160785.png" 
                alt="ПлюсМинус интерфейс - список товаров" 
                className="relative w-full rounded-lg shadow-lg border border-gray-200"
              />
            </div>
            <div className="relative">
              <img 
                src="/attached_assets/Снимок экрана 2025-08-17 в 17.10.21_1755441160786.png" 
                alt="ПлюсМинус интерфейс - детальная аналитика" 
                className="w-full rounded-lg shadow-lg border border-gray-200"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;