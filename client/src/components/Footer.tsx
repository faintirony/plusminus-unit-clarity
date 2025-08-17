import { MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Левая колонка */}
          <div>
            <h3 className="text-2xl font-bold mb-4">ПлюсМинус</h3>
            <p className="text-gray-300">
              Простая юнит-экономика для селлеров маркетплейсов
            </p>
          </div>
          
          {/* Центральная колонка */}
          <div>
            <h3 className="font-semibold mb-4">Связаться с нами</h3>
            <div className="space-y-3">
              <a 
                href="https://t.me/ferz_kubanskii" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-gray-300 hover:text-blue-400 transition-colors duration-200 cursor-pointer"
              >
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <span>@ferz_kubanskii</span>
              </a>
              <a 
                href="https://t.me/faintirony" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-gray-300 hover:text-blue-400 transition-colors duration-200 cursor-pointer"
              >
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <span>@faintirony</span>
              </a>
            </div>
          </div>
          
          {/* Правая колонка */}
          <div>
            <p className="text-gray-300 mb-2">Работаем с 9:00 до 21:00 МСК</p>
            <p className="text-gray-300">Ответ в Telegram в течение 15 минут</p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 ПлюсМинус. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;