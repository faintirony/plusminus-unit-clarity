import { Product } from "@/types/products";

// Функция для конвертации рублей в копейки
const toKopecks = (rubles: number) => Math.round(rubles * 100);

// Функция для расчета маржи
const calculateMargin = (product: Partial<Product>) => {
  const price = product.currentPrice || 0;
  const cost = product.costPrice || 0;
  const commission = product.commission || 0;
  const logistics = product.logisticsCost || 0;
  const advertising = product.advertisingCost || 0;
  
  const marginRub = price - cost - commission - logistics - advertising;
  const marginPercent = price > 0 ? (marginRub / price) * 100 : 0;
  
  return {
    marginRub,
    marginPercent: Math.round(marginPercent * 100) / 100, // округляем до 2 знаков
    isProfitable: marginRub > 0
  };
};

export const mockProducts: Product[] = [
  {
    id: "1",
    userId: "user1",
    marketplace: "wildberries",
    sku: "WB123456789",
    name: "Кроссовки Nike Air Max 270",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80&h=80&fit=crop",
    currentPrice: toKopecks(5990),
    costPrice: toKopecks(3500),
    commission: toKopecks(899),
    logisticsCost: toKopecks(200),
    advertisingCost: toKopecks(150),
    ...calculateMargin({
      currentPrice: toKopecks(5990),
      costPrice: toKopecks(3500),
      commission: toKopecks(899),
      logisticsCost: toKopecks(200),
      advertisingCost: toKopecks(150),
    }),
    isActive: true,
    lastSyncedAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    userId: "user1",
    marketplace: "ozon",
    sku: "OZ987654321",
    name: "Футболка базовая хлопок",
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=80&h=80&fit=crop",
    currentPrice: toKopecks(890),
    costPrice: toKopecks(650),
    commission: toKopecks(133),
    logisticsCost: toKopecks(80),
    advertisingCost: toKopecks(25),
    ...calculateMargin({
      currentPrice: toKopecks(890),
      costPrice: toKopecks(650),
      commission: toKopecks(133),
      logisticsCost: toKopecks(80),
      advertisingCost: toKopecks(25),
    }),
    isActive: true,
    lastSyncedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    userId: "user1",
    marketplace: "wildberries",
    sku: "WB456789123",
    name: "Чехол iPhone 14 силиконовый",
    imageUrl: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=80&h=80&fit=crop",
    currentPrice: toKopecks(1290),
    costPrice: toKopecks(800),
    commission: toKopecks(194),
    logisticsCost: toKopecks(120),
    advertisingCost: toKopecks(200),
    ...calculateMargin({
      currentPrice: toKopecks(1290),
      costPrice: toKopecks(800),
      commission: toKopecks(194),
      logisticsCost: toKopecks(120),
      advertisingCost: toKopecks(200),
    }),
    isActive: true,
    lastSyncedAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    userId: "user1",
    marketplace: "ozon",
    sku: "OZ555444333",
    name: "Рюкзак городской 30L",
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=80&h=80&fit=crop",
    currentPrice: toKopecks(2890),
    costPrice: toKopecks(1800),
    commission: toKopecks(434),
    logisticsCost: toKopecks(300),
    advertisingCost: toKopecks(100),
    ...calculateMargin({
      currentPrice: toKopecks(2890),
      costPrice: toKopecks(1800),
      commission: toKopecks(434),
      logisticsCost: toKopecks(300),
      advertisingCost: toKopecks(100),
    }),
    isActive: true,
    lastSyncedAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "5",
    userId: "user1",
    marketplace: "wildberries",
    sku: "WB789456123",
    name: "Крем для лица антивозрастной",
    imageUrl: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=80&h=80&fit=crop",
    currentPrice: toKopecks(3490),
    costPrice: toKopecks(900),
    commission: toKopecks(524),
    logisticsCost: toKopecks(150),
    advertisingCost: toKopecks(180),
    ...calculateMargin({
      currentPrice: toKopecks(3490),
      costPrice: toKopecks(900),
      commission: toKopecks(524),
      logisticsCost: toKopecks(150),
      advertisingCost: toKopecks(180),
    }),
    isActive: true,
    lastSyncedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

// Функция для получения дополнительных продуктов
export const generateMoreProducts = (count: number = 50): Product[] => {
  const productNames = [
    "Джинсы мужские слим",
    "Платье летнее женское",
    "Кроссовки Adidas Originals",
    "Худи оверсайз унисекс",
    "Сумка женская кожаная",
    "Часы наручные спортивные",
    "Наушники беспроводные TWS",
    "Рубашка мужская классика",
    "Юбка миди плиссе",
    "Ботинки зимние утепленные",
    "Куртка демисезонная",
    "Брюки спортивные",
    "Свитер крупной вязки",
    "Туфли на каблуке",
    "Шорты джинсовые",
    "Кардиган длинный",
    "Кеды белые классические",
    "Блузка шифоновая",
    "Джемпер с воротником",
    "Сапоги высокие"
  ];

  const marketplaces: Array<"wildberries" | "ozon"> = ["wildberries", "ozon"];
  
  return Array.from({ length: count }, (_, index) => {
    const marketplace = marketplaces[Math.floor(Math.random() * marketplaces.length)];
    const name = productNames[Math.floor(Math.random() * productNames.length)];
    const skuPrefix = marketplace === "wildberries" ? "WB" : "OZ";
    const sku = `${skuPrefix}${Math.floor(Math.random() * 1000000000)}`;
    
    // Генерируем реалистичные цены
    const basePrice = Math.floor(Math.random() * 8000) + 500; // от 500 до 8500 рублей
    const currentPrice = toKopecks(basePrice);
    const costPrice = toKopecks(Math.floor(basePrice * (0.3 + Math.random() * 0.4))); // 30-70% от цены
    const commission = toKopecks(Math.floor(basePrice * (0.12 + Math.random() * 0.08))); // 12-20% комиссия
    const logisticsCost = toKopecks(Math.floor(50 + Math.random() * 300)); // 50-350 рублей
    const advertisingCost = toKopecks(Math.floor(Math.random() * 500)); // 0-500 рублей
    
    const margins = calculateMargin({
      currentPrice,
      costPrice,
      commission,
      logisticsCost,
      advertisingCost,
    });
    
    return {
      id: `gen-${index + 6}`,
      userId: "user1",
      marketplace,
      sku,
      name: `${name} ${Math.floor(Math.random() * 100)}`,
      imageUrl: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000000)}?w=80&h=80&fit=crop`,
      currentPrice,
      costPrice,
      commission,
      logisticsCost,
      advertisingCost,
      ...margins,
      isActive: Math.random() > 0.1, // 90% активных товаров
      lastSyncedAt: new Date(Date.now() - Math.floor(Math.random() * 24 * 60 * 60 * 1000)).toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  });
};

export const allMockProducts = [...mockProducts, ...generateMoreProducts(120)];

// Функция для форматирования цены
export const formatPrice = (kopecks: number | undefined): string => {
  if (kopecks === undefined || kopecks === null) return "—";
  return `₽${(kopecks / 100).toLocaleString("ru-RU")}`;
};

// Функция для получения класса цвета маржи
export const getMarginColorClass = (marginPercent: number | undefined): string => {
  if (marginPercent === undefined || marginPercent === null) return "profit-neutral";
  
  if (marginPercent < 0) return "profit-negative";
  if (marginPercent < 5) return "profit-low";
  if (marginPercent < 15) return "profit-medium";
  return "profit-high";
};
