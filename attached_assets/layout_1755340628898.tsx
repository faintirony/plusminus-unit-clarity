import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'ПлюсМинус - Мониторинг юнит-экономики',
  description: 'SaaS платформа для автоматического мониторинга юнит-экономики селлеров маркетплейсов',
  keywords: ['юнит-экономика', 'маркетплейс', 'wildberries', 'ozon', 'аналитика'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <div className="min-h-screen bg-background">
          {children}
        </div>
      </body>
    </html>
  )
}