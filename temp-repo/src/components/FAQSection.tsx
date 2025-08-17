import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQSection = () => {
  const faqs = [
    {
      question: "Безопасно ли передавать API-ключи?",
      answer: "Да, абсолютно безопасно. Мы используем end-to-end шифрование для передачи и хранения ваших API-ключей. Ключи хранятся в зашифрованном виде и используются только для получения данных о ваших продажах. Мы не можем изменять ваши товары или настройки — только читать статистику."
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
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Часто задаваемые{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              вопросы
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ответы на главные вопросы о безопасности, функциональности и условиях использования
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-border rounded-lg px-6 bg-card"
              >
                <AccordionTrigger className="text-left text-lg font-semibold py-6 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
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