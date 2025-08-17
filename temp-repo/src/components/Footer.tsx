import { MessageSquare, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contacts" className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo */}
          <div>
            <div className="text-2xl font-bold mb-4">
              ПлюсМинус
            </div>
            <p className="text-background/70">
              Простая юнит-экономика для селлеров маркетплейсов
            </p>
          </div>

          {/* Contacts */}
          <div className="text-center">
            <h4 className="font-semibold mb-4">Связаться с нами</h4>
            <div className="space-y-3">
              <a 
                href="https://t.me/ferz_kubanskii"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 text-background/80 hover:text-background transition-colors"
              >
                <MessageSquare size={20} />
                <span>@ferz_kubanskii</span>
              </a>
              <a 
                href="https://t.me/faintirony"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 text-background/80 hover:text-background transition-colors"
              >
                <MessageSquare size={20} />
                <span>@faintirony</span>
              </a>
            </div>
          </div>

          {/* Additional Info */}
          <div className="text-center md:text-right">
            <p className="text-background/70 text-sm">
              Работаем с 9:00 до 21:00 МСК
            </p>
            <p className="text-background/70 text-sm mt-2">
              Ответ в Telegram в течение 15 минут
            </p>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8 text-center">
          <p className="text-background/60 text-sm">
            © 2025 ПлюсМинус. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;