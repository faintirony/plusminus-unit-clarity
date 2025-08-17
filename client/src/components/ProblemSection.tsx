
import { BarChart3, TrendingDown, Clock } from 'lucide-react';

const ProblemSection = () => {
  return (
    <section className="section-spacing bg-section-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="heading-section mb-6">
            Существующие сервисы{' '}
            <span style={{color: '#FF4444'}}>перегружают данными</span>
          </h2>
          <p className="heading-sub max-w-3xl mx-auto">
            Большинство аналитических сервисов дают много данных, но не дают простых ответов на главные вопросы бизнеса
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="card-enhanced text-center">
            <div className="card-icon-wrapper bg-red-50">
              <BarChart3 className="card-icon" style={{color: '#FF4444'}} />
            </div>
            <h3 className="card-title">
              45+ отчетов в сервисе аналитики, а простого ответа нет
            </h3>
            <p className="card-description" style={{color: '#666666'}}>
              Теряетесь в море данных и не можете быстро понять какие товары приносят прибыль
            </p>
          </div>

          <div className="card-enhanced text-center">
            <div className="card-icon-wrapper bg-red-50">
              <TrendingDown className="card-icon" style={{color: '#FF4444'}} />
            </div>
            <h3 className="card-title">
              Теряете деньги на убыточных товарах
            </h3>
            <p className="card-description" style={{color: '#666666'}}>
              Продолжаете продвигать товары в минусе, не зная об этом до конца месяца
            </p>
          </div>

          <div className="card-enhanced text-center">
            <div className="card-icon-wrapper bg-red-50">
              <Clock className="card-icon" style={{color: '#FF4444'}} />
            </div>
            <h3 className="card-title">
              Тратите часы на анализ вместо продаж
            </h3>
            <p className="card-description" style={{color: '#666666'}}>
              Вместо развития бизнеса сидите в Excel'е и пытаетесь разобраться в цифрах
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;