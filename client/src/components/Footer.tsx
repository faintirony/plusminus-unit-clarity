const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                ПлюсМинус
              </div>
            </div>
            <p className="text-muted-foreground">
              Увеличиваем выживаемость продавцов на маркетплейсах через понимание юнит-экономики
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Продукт</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Возможности</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Тарифы</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">API</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Поддержка</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Помощь</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Документация</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Контакты</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Компания</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">О нас</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Блог</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Вакансии</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
          <p>&copy; 2025 ПлюсМинус. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;