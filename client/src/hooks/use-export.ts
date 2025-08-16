import { useState } from 'react';
import { Product } from '@/types/products';
import { exportToExcel, validateExportData } from '@/lib/excel-export';
import { useToast } from '@/hooks/use-toast';

export function useExport() {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const exportProducts = async (products: Product[]) => {
    setIsExporting(true);
    
    try {
      // Validate data before export
      validateExportData(products);
      
      // Show loading toast
      toast({
        title: "Экспорт данных",
        description: "Генерация Excel файла...",
      });

      // Small delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Export to Excel
      exportToExcel(products);
      
      // Show success message
      toast({
        title: "Экспорт завершён",
        description: `Успешно экспортировано ${products.length} товаров`,
      });
      
    } catch (error) {
      // Show error message
      toast({
        title: "Ошибка экспорта",
        description: error instanceof Error ? error.message : "Произошла неизвестная ошибка",
        variant: "destructive",
      });
      
      console.error('Export error:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return {
    exportProducts,
    isExporting,
  };
}