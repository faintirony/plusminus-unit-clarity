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
                <div className="mb-4 flex items-center justify-between">
                  <div className="text-lg font-semibold">ПлюсМинус</div>
                  <div className="flex items-center gap-4 text-sm">
                    <span><span className="text-success font-medium">Прибыльные: 97</span></span>
                    <span><span className="text-destructive font-medium">Убыточные: 28</span></span>
                    <span>Без себестоимости: 2</span>
                    <span><span className="font-medium">127</span> товаров</span>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-xs text-muted-foreground">
                        <th className="text-left py-2 px-3 font-medium"></th>
                        <th className="text-left py-2 px-3 font-medium">Название</th>
                        <th className="text-center py-2 px-3 font-medium">ЦЕНА</th>
                        <th className="text-center py-2 px-3 font-medium">СЕБЕСТОИМОСТЬ</th>
                        <th className="text-center py-2 px-3 font-medium">МАРЖА ₽</th>
                        <th className="text-center py-2 px-3 font-medium">МАРЖА %</th>
                        <th className="text-center py-2 px-3 font-medium">Статус</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                        <td className="py-3 px-3">
                          <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                            👟
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-medium">Кроссовки Nike Air Max 270</div>
                          <div className="text-xs text-muted-foreground">WB</div>
                        </td>
                        <td className="py-3 px-3 text-center font-medium">₽5 990</td>
                        <td className="py-3 px-3 text-center">₽3 500</td>
                        <td className="py-3 px-3 text-center text-success font-medium">₽1 021</td>
                        <td className="py-3 px-3 text-center text-success font-medium">17.1%</td>
                        <td className="py-3 px-3 text-center">
                          <span className="bg-success/10 text-success px-2 py-1 rounded text-xs font-medium">ПРИБЫЛЬНЫЙ</span>
                        </td>
                      </tr>
                      <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                        <td className="py-3 px-3">
                          <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                            👕
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-medium">Футболка мужская</div>
                          <div className="text-xs text-muted-foreground">OZON</div>
                        </td>
                        <td className="py-3 px-3 text-center font-medium">₽890</td>
                        <td className="py-3 px-3 text-center">₽650</td>
                        <td className="py-3 px-3 text-center text-destructive font-medium">₽-94</td>
                        <td className="py-3 px-3 text-center text-destructive font-medium">-10.6%</td>
                        <td className="py-3 px-3 text-center">
                          <span className="bg-destructive/10 text-destructive px-2 py-1 rounded text-xs font-medium">УБЫТОЧНЫЙ</span>
                        </td>
                      </tr>
                      <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                        <td className="py-3 px-3">
                          <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                            📱
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-medium">Чехол iPhone 15</div>
                          <div className="text-xs text-muted-foreground">WB</div>
                        </td>
                        <td className="py-3 px-3 text-center font-medium">₽1 290</td>
                        <td className="py-3 px-3 text-center">₽800</td>
                        <td className="py-3 px-3 text-center text-destructive font-medium">₽-142</td>
                        <td className="py-3 px-3 text-center text-destructive font-medium">-11.0%</td>
                        <td className="py-3 px-3 text-center">
                          <span className="bg-destructive/10 text-destructive px-2 py-1 rounded text-xs font-medium">УБЫТОЧНЫЙ</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-muted/30 transition-colors">
                        <td className="py-3 px-3">
                          <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                            🎒
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-medium">Крем для лица</div>
                          <div className="text-xs text-muted-foreground">WB</div>
                        </td>
                        <td className="py-3 px-3 text-center font-medium">₽3 490</td>
                        <td className="py-3 px-3 text-center">₽900</td>
                        <td className="py-3 px-3 text-center text-success font-medium">₽1 401</td>
                        <td className="py-3 px-3 text-center text-success font-medium">40.1%</td>
                        <td className="py-3 px-3 text-center">
                          <span className="bg-success/10 text-success px-2 py-1 rounded text-xs font-medium">ПРИБЫЛЬНЫЙ</span>
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