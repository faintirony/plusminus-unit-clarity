export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          ПлюсМинус
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Мониторинг юнит-экономики для селлеров маркетплейсов
        </p>
        <div className="bg-card border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">
            🚧 Проект в разработке
          </h2>
          <p className="text-muted-foreground">
            Архитектура создана. Следующие шаги:
          </p>
          <ul className="list-disc list-inside mt-4 text-left max-w-md mx-auto space-y-2">
            <li>Настройка базы данных</li>
            <li>Создание API endpoints</li>
            <li>Интеграция с маркетплейсами</li>
            <li>Разработка UI компонентов</li>
          </ul>
        </div>
      </div>
    </main>
  )
}