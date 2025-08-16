import { useState, useMemo } from "react";
import { Product, ProductFilters } from "@/types/products";
import { allMockProducts } from "@/lib/mock-data";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(allMockProducts);
  const [filters, setFilters] = useState<ProductFilters>({
    search: "",
    marketplace: "all",
    profitability: "all",
    marginFrom: undefined,
    marginTo: undefined,
    dateFrom: undefined,
    dateTo: undefined,
    selectedPeriod: "month",
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
    const profitableProducts = filteredProducts.filter(p => p.isProfitable === true).length;
    const unprofitableProducts = filteredProducts.filter(p => p.isProfitable === false).length;
    const needsCostPrice = filteredProducts.filter(p => p.isProfitable === null).length;
    
    const totalOrders = filteredProducts.reduce((sum, p) => sum + (p.ordersCount || 0), 0);
    const totalPurchases = filteredProducts.reduce((sum, p) => sum + (p.purchasesCount || 0), 0);
    const totalRevenue = filteredProducts.reduce((sum, p) => sum + (p.revenue || 0), 0);
    const totalExpenses = filteredProducts.reduce((sum, p) => sum + (p.totalExpenses || 0), 0);
    const totalMargin = filteredProducts.reduce((sum, p) => sum + (p.marginRub || 0), 0);
    
    return {
      totalProducts: products.length,
      profitableProducts,
      unprofitableProducts,
      needsCostPrice,
      displayedCount: filteredProducts.length,
      totalOrders,
      totalPurchases,
      totalRevenue,
      totalExpenses,
      totalMargin,
    };
  }, [products, filteredProducts]);

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prevProducts => 
      prevProducts.map(product => {
        if (product.id === id) {
          const updatedProduct = { ...product, ...updates };
          
          // Recalculate margins when cost price changes
          if ('costPrice' in updates) {
            if (updatedProduct.costPrice === null || updatedProduct.costPrice === undefined) {
              updatedProduct.marginRub = null;
              updatedProduct.marginPercent = null;
              updatedProduct.isProfitable = null;
            } else {
              const totalCosts = (updatedProduct.costPrice || 0) + (updatedProduct.commission || 0) + 
                               (updatedProduct.logisticsCost || 0) + (updatedProduct.advertisingCost || 0) + 
                               (updatedProduct.acquiringCost || 0) + (updatedProduct.returnCost || 0) + 
                               (updatedProduct.disposalCost || 0) + (updatedProduct.penaltyCost || 0) + 
                               (updatedProduct.otherCosts || 0);
              updatedProduct.marginRub = (updatedProduct.currentPrice || 0) - totalCosts;
              updatedProduct.marginPercent = (updatedProduct.currentPrice || 0) > 0 
                ? (updatedProduct.marginRub / (updatedProduct.currentPrice || 0)) * 100 
                : 0;
              updatedProduct.isProfitable = updatedProduct.marginRub > 0;
            }
          }
          
          return updatedProduct;
        }
        return product;
      })
    );
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
      marketplace: "all",
      profitability: "all",
      marginFrom: undefined,
      marginTo: undefined,
      dateFrom: undefined,
      dateTo: undefined,
      selectedPeriod: "month",
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
