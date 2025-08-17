
import { Key, DollarSign, FileText } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      icon: <Key className="w-8 h-8" style={{color: '#0066FF'}} />,
      title: "Регистрируетесь и создаёте API-ключи WB",
      description: "Генерируете API-ключи в личном кабинете маркетплейса. Это займет 2 минуты."
    },
    {
      number: "02",
      icon: <DollarSign className="w-8 h-8" style={{color: '#0066FF'}} />,
      title: "Заполняете себестоимость и видите прибыль",
      description: "Указываете себестоимость товаров и сразу видите какие в плюсе, а какие в минусе."
    },
    {
      number: "03",
      icon: <FileText className="w-8 h-8" style={{color: '#0066FF'}} />,
      title: "Получаете структуру расходов по каждому товару",
      description: "В течение 5 минут видите, какие товары убыточные и почему и можете оперативно внести изменения."
    }
  ];

  return (
    <section className="section-spacing bg-section-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="heading-section mb-6" style={{color: '#0066FF'}}>
            Подключение за 7 минут
          </h2>
          <p className="heading-sub max-w-3xl mx-auto">
            Простой процесс настройки без сложных интеграций и долгих ожиданий
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="card-enhanced text-center h-full">
              <div className="text-3xl font-bold mb-3" style={{color: '#0066FF'}}>
                {step.number}
              </div>
              <div className="card-icon-wrapper bg-blue-50">
                {step.icon}
              </div>
              <h3 className="card-title">
                {step.title}
              </h3>
              <p className="card-description" style={{color: '#666666'}}>
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-block bg-green-100 text-green-800 px-6 py-3 rounded-lg">
            • Среднее время подключения: 7 минут
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;