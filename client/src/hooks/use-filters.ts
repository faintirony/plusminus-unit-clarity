import { useState } from "react";
import { ColumnVisibility } from "@/types/products";

export function useFilters() {
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>({
    name: true,
    marketplace: true,
    category: false,
    brand: false,
    subject: false,
    sku: true,
    barcode: false,
    currentPrice: true,
    costPrice: true,
    commission: true,
    logisticsCost: true,
    advertisingCost: false,
    acquiringCost: false,
    returnCost: false,
    disposalCost: false,
    penaltyCost: false,
    otherCosts: false,
    totalExpenses: true,
    marginRub: true,
    marginPercent: true,
    isProfitable: true,
    lastSyncedAt: true,
  });

  const [isColumnCustomizerOpen, setIsColumnCustomizerOpen] = useState(false);

  const toggleColumnVisibility = (column: keyof ColumnVisibility) => {
    setColumnVisibility(prev => ({
      ...prev,
      [column]: !prev[column]
    }));
  };

  const toggleColumnCustomizer = () => {
    setIsColumnCustomizerOpen(!isColumnCustomizerOpen);
  };

  const closeColumnCustomizer = () => {
    setIsColumnCustomizerOpen(false);
  };

  return {
    columnVisibility,
    setColumnVisibility,
    toggleColumnVisibility,
    isColumnCustomizerOpen,
    toggleColumnCustomizer,
    closeColumnCustomizer,
  };
}
