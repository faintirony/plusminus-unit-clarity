import { useState, useMemo } from "react";
import { Product, ProductFilters } from "@/types/products";
import { allMockProducts } from "@/lib/mock-data";

export function useProducts() {
  const [products] = useState<Product[]>(allMockProducts);
  const [filters, setFilters] = useState<ProductFilters>({
    search: "",
    marketplace: "all",
    profitability: "all",
    marginFrom: undefined,
    marginTo: undefined,
  });

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Поиск по названию или SKU
      if (filters.search && !product.name.toLowerCase().includes(filters.search.toLowerCase()) && 
          !product.sku.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }

      // Фильтр по маркетплейсу
      if (filters.marketplace && filters.marketplace !== "all" && product.marketplace !== filters.marketplace) {
        return false;
      }

      // Фильтр по прибыльности
      if (filters.profitability === "profitable" && !product.isProfitable) {
        return false;
      }
      if (filters.profitability === "unprofitable" && product.isProfitable) {
        return false;
      }

      // Фильтр по марже
      if (filters.marginFrom !== undefined && (product.marginPercent || 0) < filters.marginFrom) {
        return false;
      }
      if (filters.marginTo !== undefined && (product.marginPercent || 0) > filters.marginTo) {
        return false;
      }

      return true;
    });
  }, [products, filters]);

  const stats = useMemo(() => {
    const profitableProducts = filteredProducts.filter(p => p.isProfitable).length;
    const unprofitableProducts = filteredProducts.filter(p => !p.isProfitable).length;
    
    return {
      totalProducts: products.length,
      profitableProducts,
      unprofitableProducts,
      displayedCount: filteredProducts.length,
    };
  }, [products, filteredProducts]);

  const updateProduct = (id: string, updates: Partial<Product>) => {
    // В реальном приложении здесь был бы API вызов
    console.log("Updating product:", id, updates);
  };

  const applyPreset = (preset: string) => {
    switch (preset) {
      case "unprofitable":
        setFilters(prev => ({ ...prev, profitability: "unprofitable" }));
        break;
      case "high-margin":
        setFilters(prev => ({ ...prev, marginFrom: 15 }));
        break;
      case "new-products":
        // Фильтр по недавно добавленным товарам
        break;
      default:
        break;
    }
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      marketplace: "",
      profitability: "all",
      marginFrom: undefined,
      marginTo: undefined,
    });
  };

  return {
    products: filteredProducts,
    filters,
    setFilters,
    stats,
    updateProduct,
    applyPreset,
    resetFilters,
  };
}
