import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQSection = () => {
  const faqs = [
    {
      question: "Безопасно ли подключение WB токенов?",
      answer: "Да, абсолютно безопасно. Мы используем только токены для чтения данных, которые не дают доступа к изменению вашего аккаунта или товаров."
    },
    {
      question: "Какие маркетплейсы поддерживаются?",
      answer: "Сейчас работаем с Wildberries. В планах добавить OZON, Яндекс.Маркет и другие популярные площадки."
    },
    {
      question: "Как быстро обновляются данные?",
      answer: "Данные обновляются автоматически каждые 24 часа. Вы всегда видите актуальную картину по вашим товарам."
    },
    {
      question: "Что если я торгую 500+ товаров?",
      answer: "ПлюсМинус отлично работает с любым количеством товаров. Чем больше товаров, тем более ценной становится автоматизация расчетов."
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
            Ответы на главные вопросы о ПлюсМинус, функциональности и процессе подключения
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-border rounded-lg px-6"
              >
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;