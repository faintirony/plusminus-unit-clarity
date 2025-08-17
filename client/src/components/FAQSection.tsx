import { useState } from 'react';

import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQSection = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      question: "Безопасно ли передавать API-ключи?",
      answer: "Да, абсолютно безопасно. Мы используем end-to-end шифрование для передачи и хранения ваших API-ключей. Ключи хранятся в зашифрованном виде и используются только для получения данных о ваших продажах. Мы не можем изменять ваш товары или настройки — только читать данные для расчета маржинальности."
    },
    {
      question: "Какие маркетплейсы поддерживаются?",
      answer: "В данный момент поддерживается Wildberries, а в ближайшее время будет добавлен и OZON. Это покрывает более 80% российского рынка маркетплейсов. В планах добавление Яндекс.Маркета и других популярных площадок."
    },
    {
      question: "Как быстро обновляются данные?",
      answer: "Данные обновляются ежедневно в 6:00 утра по московскому времени. Это позволяет анализировать результаты продаж предыдущего дня и принимать быстрые решения. При критических изменениях (товар уходит в глубокий минус) отправляем уведомления в Telegram моментально (скоро)."
    },
    {
      question: "Что если у меня больше 1000 товаров?",
      answer: "Нет проблем, мы поддерживаем загрузку любого количества товаров."
    }
  ];

  return (
    <section className="section-spacing bg-section-gray">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="heading-section mb-6">
            Часто задаваемые{' '}
            <span style={{color: '#0066FF'}}>вопросы</span>
          </h2>
          <p className="heading-sub max-w-3xl mx-auto">
            Ответы на главные вопросы о безопасности, функциональности и условиях использования
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="card-enhanced transition-all">
              <div>
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  data-testid={`faq-question-${index}`}
                >
                  <h3 className="text-lg font-semibold pr-4">
                    {faq.question}
                  </h3>
                  {openItems.includes(index) ? (
                    <ChevronUp className="w-5 h-5" style={{color: '#666666'}} />
                  ) : (
                    <ChevronDown className="w-5 h-5" style={{color: '#666666'}} />
                  )}
                </button>
                {openItems.includes(index) && (
                  <div className="px-6 pb-6" data-testid={`faq-answer-${index}`}>
                    <p className="text-body" style={{color: '#666666'}}>
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;