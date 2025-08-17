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
            Готов узнать, торгуете вы в{' '}
            <span className="text-success">плюс</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Подключитесь за 7 минут и получите четкую картину по всем товарам
          </p>
        </div>

        <div className="text-center">
          <Link href="/register" data-testid="button-pricing-register">
            <Button 
              size="lg"
              className="w-full md:w-auto bg-gradient-primary hover:shadow-primary transition-all duration-300"
            >
              Попробовать бесплатно
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;