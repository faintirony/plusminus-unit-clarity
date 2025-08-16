import * as XLSX from 'xlsx';
import { Product } from '@/types/products';
import { formatPrice } from './mock-data';

export interface ExportColumn {
  key: keyof Product | string;
  label: string;
  formatter?: (value: any) => any;
}

// Define column mapping for Excel export
export const exportColumns: ExportColumn[] = [
  { key: 'id', label: 'ID товара' },
  { key: 'name', label: 'Название товара' },
  { key: 'sku', label: 'Артикул продавца' },
  { key: 'marketplace', label: 'Маркетплейс' },
  { key: 'category', label: 'Категория' },
  { key: 'brand', label: 'Бренд' },
  { key: 'subject', label: 'Предмет' },
  { key: 'barcode', label: 'Штрихкод' },
  { 
    key: 'currentPrice', 
    label: 'Цена продажи (₽)', 
    formatter: (value: number | undefined) => value ? (value / 100).toFixed(2) : '0.00'
  },
  { 
    key: 'costPrice', 
    label: 'Себестоимость (₽)', 
    formatter: (value: number | undefined) => value ? (value / 100).toFixed(2) : '0.00'
  },
  { 
    key: 'commission', 
    label: 'Комиссия (₽)', 
    formatter: (value: number | undefined) => value ? (value / 100).toFixed(2) : '0.00'
  },
  { 
    key: 'logisticsCost', 
    label: 'Логистика (₽)', 
    formatter: (value: number | undefined) => value ? (value / 100).toFixed(2) : '0.00'
  },
  { 
    key: 'advertisingCost', 
    label: 'Реклама (₽)', 
    formatter: (value: number | undefined) => value ? (value / 100).toFixed(2) : '0.00'
  },
  { 
    key: 'acquiringCost', 
    label: 'Эквайринг/обработка платежей (₽)', 
    formatter: (value: number | undefined) => value ? (value / 100).toFixed(2) : '0.00'
  },
  { 
    key: 'returnCost', 
    label: 'Стоимость возвратов (₽)', 
    formatter: (value: number | undefined) => value ? (value / 100).toFixed(2) : '0.00'
  },
  { 
    key: 'disposalCost', 
    label: 'Утилизация товаров (₽)', 
    formatter: (value: number | undefined) => value ? (value / 100).toFixed(2) : '0.00'
  },
  { 
    key: 'penaltyCost', 
    label: 'Штрафы от маркетплейса (₽)', 
    formatter: (value: number | undefined) => value ? (value / 100).toFixed(2) : '0.00'
  },
  { 
    key: 'otherCosts', 
    label: 'Прочие расходы (₽)', 
    formatter: (value: number | undefined) => value ? (value / 100).toFixed(2) : '0.00'
  },
  { 
    key: 'totalExpenses', 
    label: 'Все расходы (₽)', 
    formatter: (value: number | undefined) => value ? (value / 100).toFixed(2) : '0.00'
  },
  { 
    key: 'marginRub', 
    label: 'Маржа (₽)', 
    formatter: (value: number | undefined) => value ? (value / 100).toFixed(2) : '0.00'
  },
  { 
    key: 'marginPercent', 
    label: 'Маржа (%)', 
    formatter: (value: number | undefined) => value ? value.toFixed(2) + '%' : '0.00%'
  },
  { 
    key: 'isProfitable', 
    label: 'Прибыльность', 
    formatter: (value: boolean | undefined) => value ? 'Прибыльный' : 'Убыточный'
  },
  { key: 'ordersCount', label: 'Заказы' },
  { key: 'purchasesCount', label: 'Выкупы' },
  { 
    key: 'revenue', 
    label: 'Доходы (₽)', 
    formatter: (value: number | undefined) => value ? (value / 100).toFixed(2) : '0.00'
  },
  { key: 'lastSyncedAt', label: 'Последняя синхронизация' },
];

export function exportToExcel(products: Product[], filename?: string): void {
  try {
    // Generate filename if not provided
    const now = new Date();
    const defaultFilename = `Товары_${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}_${now.getHours().toString().padStart(2, '0')}-${now.getMinutes().toString().padStart(2, '0')}.xlsx`;
    const finalFilename = filename || defaultFilename;

    // Prepare data for export
    const exportData = products.map((product, index) => {
      const row: any = {};
      
      exportColumns.forEach(column => {
        const value = product[column.key as keyof Product];
        row[column.label] = column.formatter ? column.formatter(value) : value || '';
      });
      
      return row;
    });

    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(exportData);

    // Set column widths for better readability
    const columnWidths = exportColumns.map(col => {
      switch (col.key) {
        case 'name':
          return { wch: 30 };
        case 'sku':
        case 'barcode':
          return { wch: 15 };
        case 'marketplace':
        case 'category':
        case 'brand':
        case 'subject':
          return { wch: 12 };
        default:
          return { wch: 10 };
      }
    });
    worksheet['!cols'] = columnWidths;

    // Style the header row
    const headerRange = XLSX.utils.decode_range(worksheet['!ref'] || 'A1:A1');
    for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
      if (!worksheet[cellAddress]) continue;
      
      worksheet[cellAddress].s = {
        font: { bold: true },
        fill: { fgColor: { rgb: "F0F0F0" } },
        alignment: { horizontal: "center" }
      };
    }

    // Color code rows based on profitability
    for (let row = 1; row <= products.length; row++) {
      const product = products[row - 1];
      const isProfit = product.isProfitable;
      
      for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
        const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
        if (!worksheet[cellAddress]) continue;
        
        worksheet[cellAddress].s = {
          fill: { 
            fgColor: { 
              rgb: isProfit ? "E8F5E8" : "FDF2F2" // Light green for profitable, light red for unprofitable
            } 
          }
        };
      }
    }

    // Freeze header row
    worksheet['!freeze'] = { xSplit: 0, ySplit: 1 };

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Товары');

    // Write and download file
    XLSX.writeFile(workbook, finalFilename);
    
    return;
  } catch (error) {
    console.error('Export failed:', error);
    throw new Error('Не удалось экспортировать данные. Попробуйте ещё раз.');
  }
}

export function validateExportData(products: Product[]): boolean {
  if (!products || products.length === 0) {
    throw new Error('Нет данных для экспорта. Проверьте фильтры.');
  }
  
  if (products.length > 50000) {
    throw new Error('Слишком много данных для экспорта (более 50,000 строк). Уточните фильтры.');
  }
  
  return true;
}