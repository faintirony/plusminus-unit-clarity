import telegramIcon from "@assets/1200x600wa_1755446517691.png";

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
              <div className="flex items-center space-x-3">
                <img 
                  src={telegramIcon} 
                  alt="Telegram" 
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-gray-300">@ferz_kubanskii</span>
              </div>
              <div className="flex items-center space-x-3">
                <img 
                  src={telegramIcon} 
                  alt="Telegram" 
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-gray-300">@faintirony</span>
              </div>
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