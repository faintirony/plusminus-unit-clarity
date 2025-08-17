import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
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
      question: "Безопасно ли передавать API ключи?",
      answer: "Да, мы используем современные методы шифрования и храним все данные в соответствии с международными стандартами безопасности. Ваши API ключи не передаются третьим лицам."
    },
    {
      question: "Какая стоимость подписки?",
      answer: "У нас есть бесплатный тарифный план для начинающих селлеров. Для расширенного функционала доступны платные тарифы от 990 рублей в месяц."
    },
    {
      question: "Как быстро обновляются данные?",
      answer: "Данные обновляются автоматически каждые 6 часов. В премиум-тарифах доступно обновление каждый час."
    },
    {
      question: "Что если у меня больше 1000 товаров?",
      answer: "Наша система легко справляется с любым количеством товаров. Для больших каталогов рекомендуем премиум-тариф с расширенными возможностями анализа."
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Часто задаваемые{' '}
            <span className="text-primary">вопросы</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ответы на главные вопросы о ПлюсМинус, функционале и безопасности
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="border-border/50 hover:border-border transition-colors">
              <CardContent className="p-0">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                  data-testid={`faq-question-${index}`}
                >
                  <h3 className="text-lg font-semibold pr-4">
                    {faq.question}
                  </h3>
                  {openItems.includes(index) ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>
                {openItems.includes(index) && (
                  <div className="px-6 pb-6" data-testid={`faq-answer-${index}`}>
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;