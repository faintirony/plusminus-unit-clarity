import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Key, DollarSign, FileText } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      icon: <Key className="w-8 h-8 text-blue-600" />,
      title: "Регистрируетесь и создаёте API-ключи WB",
      description: "Генерируете API-ключи в личном кабинете маркетплейса. Это займет 2 минуты."
    },
    {
      number: "02",
      icon: <DollarSign className="w-8 h-8 text-blue-600" />,
      title: "Заполняете себестоимость и видите прибыль",
      description: "Указываете себестоимость товаров и сразу видите какие в плюсе, а какие в минусе."
    },
    {
      number: "03",
      icon: <FileText className="w-8 h-8 text-blue-600" />,
      title: "Получаете структуру расходов по каждому товару",
      description: "В течение 5 минут видите, какие товары убыточные и почему и можете оперативно внести изменения."
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-600">
            Подключение за 7 минут
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Простой процесс настройки без сложных интеграций и долгих ожиданий
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <Card key={index} className="h-full border-blue-200">
              <CardContent className="p-8 text-center">
                <div className="bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  {step.icon}
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
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