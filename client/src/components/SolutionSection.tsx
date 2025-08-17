
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
            <div className="p-8">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Table2 className="w-8 h-8" style={{color: '#00AA5B'}} />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Один ответ вместо десятков отчётов
              </h3>
              <p className="text-body" style={{color: '#666666'}}>
                Привычный интерфейс таблицы с понятными данными. Никаких сложных дашбордов.
              </p>
            </div>
          </div>

          <div className="card-enhanced text-center">
            <div className="p-8">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calculator className="w-8 h-8" style={{color: '#00AA5B'}} />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Автоматический расчет по каждому SKU
              </h3>
              <p className="text-body" style={{color: '#666666'}}>
                Мы считаем прибыль и убытки за вас. Вы только указываете себестоимость.
              </p>
            </div>
          </div>

          <div className="card-enhanced text-center">
            <div className="p-8">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="w-8 h-8" style={{color: '#00AA5B'}} />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Telegram-уведомления об убытках (скоро)
              </h3>
              <p className="text-body" style={{color: '#666666'}}>
                Моментально узнавайте когда товар уходит в минус и принимайте быстрые решения.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;