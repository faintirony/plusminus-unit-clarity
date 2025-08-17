
import { Table2, Calculator, MessageSquare } from 'lucide-react';

const SolutionSection = () => {
  return (
    <section className="section-spacing bg-section-gray">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="heading-section mb-6">
            ПлюсМинус дает{' '}
            <span style={{color: '#00AA5B'}}>простые ответы</span>
          </h2>
          <p className="heading-sub max-w-3xl mx-auto">
            Мы убрали все лишнее и оставили только то, что действительно нужно для принятия решений
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="card-enhanced text-center">
            <div className="card-icon-wrapper bg-green-50">
              <Table2 className="card-icon" style={{color: '#00AA5B'}} />
            </div>
            <h3 className="card-title">
              Один ответ вместо десятков отчётов
            </h3>
            <p className="card-description" style={{color: '#666666'}}>
              Привычный интерфейс таблицы с понятными данными. Никаких сложных дашбордов.
            </p>
          </div>

          <div className="card-enhanced text-center">
            <div className="card-icon-wrapper bg-green-50">
              <Calculator className="card-icon" style={{color: '#00AA5B'}} />
            </div>
            <h3 className="card-title">
              Автоматический расчет по каждому SKU
            </h3>
            <p className="card-description" style={{color: '#666666'}}>
              Мы считаем прибыль и убытки за вас. Вы только указываете себестоимость.
            </p>
          </div>

          <div className="card-enhanced text-center">
            <div className="card-icon-wrapper bg-green-50">
              <MessageSquare className="card-icon" style={{color: '#00AA5B'}} />
            </div>
            <h3 className="card-title">
              Telegram-уведомления об убытках (скоро)
            </h3>
            <p className="card-description" style={{color: '#666666'}}>
              Моментально узнавайте когда товар уходит в минус и принимайте быстрые решения.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;