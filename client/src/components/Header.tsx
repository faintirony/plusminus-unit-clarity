import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

const Header = () => {
  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              ПлюсМинус
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link href="/login" data-testid="button-header-login">
              <Button 
                variant="ghost" 
                className="text-foreground hover:text-primary"
              >
                Войти
              </Button>
            </Link>
            <Link href="/register" data-testid="button-header-register">
              <Button 
                className="bg-gradient-primary hover:shadow-primary transition-all duration-300"
              >
                Попробовать
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;