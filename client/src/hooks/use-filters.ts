import { useState } from "react";
import { ColumnVisibility } from "@/types/products";

export function useFilters() {
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>({
    name: true,
    marketplace: true,
    currentPrice: true,
    costPrice: true,
    commission: true,
    logisticsCost: true,
    advertisingCost: false, // По умолчанию скрыта
    marginRub: true,
    marginPercent: true,
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
