import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import screenshot1 from "@assets/Снимок экрана 2025-08-17 в 17.10.21_1755445898921.png";
import screenshot2 from "@assets/Снимок экрана 2025-08-17 в 18.57.09_1755446295092.png";

const HeroSection = () => {
  return (
    <section className="section-spacing bg-gradient-hero">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="animate-fade-in">
            {/* Blue Label */}
            <div className="mb-6 flex justify-center lg:justify-start">
              <span className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
                Аналитика для тех, кто не любит аналитику
              </span>
            </div>
            
            <h1 className="heading-section mb-6">
              <span className="text-gray-900">Торгуете в</span>{' '}
              <span style={{color: '#00AA5B'}}>плюс</span>{' '}
              <span className="text-gray-900">или</span>{' '}
              <span style={{color: '#FF4444'}}>минус</span>
              <span className="text-gray-900">?</span>
              <br />
              <span style={{color: '#0066FF'}}>Узнайте за 5 минут</span>
            </h1>
            
            <p className="heading-sub mb-8">
              Простая юнит-экономика для селлеров Wildberries. Никаких сложных отчетов — только понятные ответы.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register" data-testid="button-hero-register">
                <Button 
                  size="lg"
                  className="w-full sm:w-auto text-white font-semibold transition-all duration-300"
                  style={{backgroundColor: '#0066FF'}}
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
                src={screenshot1} 
                alt="Интерфейс ПлюсМинус - список товаров с прибыльностью" 
                className="relative w-full rounded-lg shadow-lg border border-gray-200"
              />
            </div>
            <div className="relative">
              <img 
                src={screenshot2} 
                alt="Интерфейс ПлюсМинус - детальная карточка товара" 
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