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
                          <div className="font-bold text-lg text-gray-900">₽3 500</div>
                          <div className="text-xs text-gray-400 uppercase">СЕБЕСТОИМОСТЬ</div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="font-bold text-lg text-green-600">₽1 021</div>
                          <div className="text-xs text-gray-400 uppercase">МАРЖА ₽</div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="font-bold text-lg text-green-600">17.1%</div>
                          <div className="text-xs text-gray-400 uppercase">МАРЖА %</div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            ПРИБЫЛЬНЫЙ
                          </span>
                        </td>
                      </tr>
                      
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            👕
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="font-medium text-gray-900">Футболка мужская</div>
                          <div className="text-sm text-gray-500">OZON</div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="font-bold text-lg text-gray-900">₽890</div>
                          <div className="text-xs text-gray-400 uppercase">ЦЕНА</div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="font-bold text-lg text-gray-900">₽650</div>
                          <div className="text-xs text-gray-400 uppercase">СЕБЕСТОИМОСТЬ</div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="font-bold text-lg text-red-600">₽-94</div>
                          <div className="text-xs text-gray-400 uppercase">МАРЖА ₽</div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="font-bold text-lg text-red-600">-10.6%</div>
                          <div className="text-xs text-gray-400 uppercase">МАРЖА %</div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            УБЫТОЧНЫЙ
                          </span>
                        </td>
                      </tr>
                      
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            📱
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="font-medium text-gray-900">Чехол iPhone 15</div>
                          <div className="text-sm text-gray-500">WB</div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="font-bold text-lg text-gray-900">₽1 290</div>
                          <div className="text-xs text-gray-400 uppercase">ЦЕНА</div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="font-bold text-lg text-gray-900">₽800</div>
                          <div className="text-xs text-gray-400 uppercase">СЕБЕСТОИМОСТЬ</div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="font-bold text-lg text-red-600">₽-142</div>
                          <div className="text-xs text-gray-400 uppercase">МАРЖА ₽</div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="font-bold text-lg text-red-600">-11.0%</div>
                          <div className="text-xs text-gray-400 uppercase">МАРЖА %</div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            УБЫТОЧНЫЙ
                          </span>
                        </td>
                      </tr>
                      
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            🎒
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="font-medium text-gray-900">Рюкзак городской</div>
                          <div className="text-sm text-gray-500">OZON</div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="font-bold text-lg text-gray-900">₽2 890</div>
                          <div className="text-xs text-gray-400 uppercase">ЦЕНА</div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="font-bold text-lg text-gray-900">₽1 800</div>
                          <div className="text-xs text-gray-400 uppercase">СЕБЕСТОИМОСТЬ</div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="font-bold text-lg text-green-600">₽8</div>
                          <div className="text-xs text-gray-400 uppercase">МАРЖА ₽</div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="font-bold text-lg text-green-600">0.3%</div>
                          <div className="text-xs text-gray-400 uppercase">МАРЖА %</div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            ПРИБЫЛЬНЫЙ
                          </span>
                        </td>
                      </tr>
                      
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            🧴
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="font-medium text-gray-900">Крем для лица</div>
                          <div className="text-sm text-gray-500">WB</div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="font-bold text-lg text-gray-900">₽3 490</div>
                          <div className="text-xs text-gray-400 uppercase">ЦЕНА</div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="font-bold text-lg text-gray-900">₽900</div>
                          <div className="text-xs text-gray-400 uppercase">СЕБЕСТОИМОСТЬ</div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="font-bold text-lg text-green-600">₽1 401</div>
                          <div className="text-xs text-gray-400 uppercase">МАРЖА ₽</div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="font-bold text-lg text-green-600">40.1%</div>
                          <div className="text-xs text-gray-400 uppercase">МАРЖА %</div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            ПРИБЫЛЬНЫЙ
                          </span>
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