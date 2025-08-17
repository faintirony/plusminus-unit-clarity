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

          {/* Hero Image */}
          <div className="animate-slide-up lg:order-first lg:order-last">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-2xl blur-3xl"></div>
              <div className="relative bg-card border border-border rounded-2xl shadow-lg w-full mx-auto p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-4">Ваши товары</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-2 font-medium text-muted-foreground">SKU</th>
                        <th className="text-left py-2 px-2 font-medium text-muted-foreground">Название</th>
                        <th className="text-right py-2 px-2 font-medium text-muted-foreground">Цена</th>
                        <th className="text-right py-2 px-2 font-medium text-muted-foreground">Маржа %</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-2 text-muted-foreground">123456</td>
                        <td className="py-3 px-2">Кроссовки Nike Air Max</td>
                        <td className="py-3 px-2 text-right">₽5 990</td>
                        <td className="py-3 px-2 text-right">
                          <span className="text-success font-medium">17.1%</span>
                        </td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-2 text-muted-foreground">789012</td>
                        <td className="py-3 px-2">Платье летнее</td>
                        <td className="py-3 px-2 text-right">₽2 490</td>
                        <td className="py-3 px-2 text-right">
                          <span className="text-danger font-medium">-3.2%</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-2 text-muted-foreground">345678</td>
                        <td className="py-3 px-2">Чехол для телефона</td>
                        <td className="py-3 px-2 text-right">₽790</td>
                        <td className="py-3 px-2 text-right">
                          <span className="text-success font-medium">24.5%</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
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