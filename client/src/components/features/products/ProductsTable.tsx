import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ColumnsIcon, RefreshCwIcon, EyeIcon, EditIcon, ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { Product, ColumnVisibility, ProductStats } from "@/types/products";
import { formatPrice, getMarginColorClass } from "@/lib/mock-data";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";

interface ProductsTableProps {
  products: Product[];
  columnVisibility: ColumnVisibility;
  stats: ProductStats;
  onToggleColumnCustomizer: () => void;
  onEditProduct: (productId: string) => void;
}

type SortField = keyof Product;
type SortDirection = 'asc' | 'desc';

export default function ProductsTable({ 
  products, 
  columnVisibility, 
  stats, 
  onToggleColumnCustomizer, 
  onEditProduct 
}: ProductsTableProps) {
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [sortField, setSortField] = useState<SortField>('marginRub');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [pageSize, setPageSize] = useState<string>('50');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (aValue === null || aValue === undefined) return 1;
    if (bValue === null || bValue === undefined) return -1;
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue, 'ru')
        : bValue.localeCompare(aValue, 'ru');
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    return 0;
  });

  const toggleProductSelection = (productId: string) => {
    const newSelected = new Set(selectedProducts);
    if (newSelected.has(productId)) {
      newSelected.delete(productId);
    } else {
      newSelected.add(productId);
    }
    setSelectedProducts(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedProducts.size === products.length) {
      setSelectedProducts(new Set());
    } else {
      setSelectedProducts(new Set(products.map(p => p.id)));
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ArrowUpIcon className="w-3 h-3 text-gray-400 ml-1" />;
    }
    return sortDirection === 'asc' 
      ? <ArrowUpIcon className="w-3 h-3 text-blue-600 ml-1" />
      : <ArrowDownIcon className="w-3 h-3 text-blue-600 ml-1" />;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Table Toolbar */}
      <div className="px-6 py-3 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleColumnCustomizer}
            className="p-2 text-gray-400 hover:text-gray-600"
            title="Настроить колонки"
            data-testid="toggle-column-customizer"
          >
            <ColumnsIcon className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="p-2 text-gray-400 hover:text-gray-600"
            title="Обновить"
            data-testid="refresh-table"
          >
            <RefreshCwIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto custom-scrollbar">
        <Table>
          <TableHeader className="bg-gray-50 sticky top-0 z-10">
            <TableRow>
              <TableHead className="sticky left-0 bg-gray-50 w-12 border-r border-gray-200">
                <Checkbox
                  checked={selectedProducts.size === products.length && products.length > 0}
                  onCheckedChange={toggleSelectAll}
                  data-testid="select-all-checkbox"
                />
              </TableHead>
              
              {columnVisibility.name && (
                <TableHead className="sticky left-12 bg-gray-50 min-w-[250px] border-r border-gray-200">
                  <div className="flex items-center cursor-pointer" onClick={() => handleSort('name')}>
                    Товар
                    <SortIcon field="name" />
                  </div>
                </TableHead>
              )}
              
              {columnVisibility.marketplace && (
                <TableHead>
                  <div className="flex items-center cursor-pointer" onClick={() => handleSort('marketplace')}>
                    Площадка
                    <SortIcon field="marketplace" />
                  </div>
                </TableHead>
              )}
              
              {columnVisibility.category && (
                <TableHead>
                  <div className="flex items-center cursor-pointer" onClick={() => handleSort('category')}>
                    Категория
                    <SortIcon field="category" />
                  </div>
                </TableHead>
              )}
              
              {columnVisibility.brand && (
                <TableHead>
                  <div className="flex items-center cursor-pointer" onClick={() => handleSort('brand')}>
                    Бренд
                    <SortIcon field="brand" />
                  </div>
                </TableHead>
              )}
              
              {columnVisibility.subject && (
                <TableHead>
                  <div className="flex items-center cursor-pointer" onClick={() => handleSort('subject')}>
                    Предмет
                    <SortIcon field="subject" />
                  </div>
                </TableHead>
              )}
              
              {columnVisibility.sku && (
                <TableHead>
                  <div className="flex items-center cursor-pointer" onClick={() => handleSort('sku')}>
                    SKU
                    <SortIcon field="sku" />
                  </div>
                </TableHead>
              )}
              
              {columnVisibility.barcode && (
                <TableHead>
                  <div className="flex items-center cursor-pointer" onClick={() => handleSort('barcode')}>
                    Штрихкод
                    <SortIcon field="barcode" />
                  </div>
                </TableHead>
              )}
              
              {columnVisibility.currentPrice && (
                <TableHead>
                  <div className="flex items-center cursor-pointer" onClick={() => handleSort('currentPrice')}>
                    Цена продажи
                    <SortIcon field="currentPrice" />
                  </div>
                </TableHead>
              )}
              
              {columnVisibility.costPrice && (
                <TableHead>
                  <div className="flex items-center cursor-pointer" onClick={() => handleSort('costPrice')}>
                    Себестоимость
                    <SortIcon field="costPrice" />
                  </div>
                </TableHead>
              )}
              
              {columnVisibility.commission && (
                <TableHead>Комиссия</TableHead>
              )}
              
              {columnVisibility.logisticsCost && (
                <TableHead>Логистика</TableHead>
              )}
              
              {columnVisibility.advertisingCost && (
                <TableHead>Реклама</TableHead>
              )}
              
              {columnVisibility.acquiringCost && (
                <TableHead>Эквайринг/обработка платежей</TableHead>
              )}
              
              {columnVisibility.returnCost && (
                <TableHead>Стоимость возвратов</TableHead>
              )}
              
              {columnVisibility.disposalCost && (
                <TableHead>Утилизация товаров</TableHead>
              )}
              
              {columnVisibility.penaltyCost && (
                <TableHead>Штрафы от маркетплейса</TableHead>
              )}
              
              {columnVisibility.otherCosts && (
                <TableHead>Прочие расходы</TableHead>
              )}
              
              {columnVisibility.totalExpenses && (
                <TableHead>
                  <div className="flex items-center cursor-pointer" onClick={() => handleSort('totalExpenses')}>
                    Все расходы
                    <SortIcon field="totalExpenses" />
                  </div>
                </TableHead>
              )}
              
              {columnVisibility.marginRub && (
                <TableHead>
                  <div className="flex items-center cursor-pointer" onClick={() => handleSort('marginRub')}>
                    Маржа ₽
                    <SortIcon field="marginRub" />
                  </div>
                </TableHead>
              )}
              
              {columnVisibility.marginPercent && (
                <TableHead>
                  <div className="flex items-center cursor-pointer" onClick={() => handleSort('marginPercent')}>
                    Маржа %
                    <SortIcon field="marginPercent" />
                  </div>
                </TableHead>
              )}
              
              {columnVisibility.isProfitable && (
                <TableHead>
                  <div className="flex items-center cursor-pointer" onClick={() => handleSort('isProfitable')}>
                    Прибыльный
                    <SortIcon field="isProfitable" />
                  </div>
                </TableHead>
              )}
              
              {columnVisibility.lastSyncedAt && (
                <TableHead>Обновлено</TableHead>
              )}
              
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          
          <TableBody>
            {sortedProducts.map((product) => (
              <TableRow key={product.id} className="hover:bg-gray-50" data-testid={`product-row-${product.id}`}>
                <TableCell className="sticky left-0 bg-white border-r border-gray-200">
                  <Checkbox
                    checked={selectedProducts.has(product.id)}
                    onCheckedChange={() => toggleProductSelection(product.id)}
                    data-testid={`select-product-${product.id}`}
                  />
                </TableCell>
                
                {columnVisibility.name && (
                  <TableCell className="sticky left-12 bg-white border-r border-gray-200">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-lg object-cover"
                          src={product.imageUrl || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop"}
                          alt={product.name}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop";
                          }}
                        />
                      </div>
                      <div className="ml-3 min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 truncate" data-testid={`product-name-${product.id}`}>
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-500" data-testid={`product-sku-${product.id}`}>
                          {product.sku}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                )}
                
                {columnVisibility.marketplace && (
                  <TableCell>
                    <span className={`font-medium ${product.marketplace === 'wildberries' ? 'text-purple-600' : 'text-blue-600'}`}>
                      {product.marketplace === 'wildberries' ? 'WB' : 'OZON'}
                    </span>
                  </TableCell>
                )}
                
                {columnVisibility.category && (
                  <TableCell className="text-gray-600" data-testid={`product-category-${product.id}`}>
                    {product.category || '-'}
                  </TableCell>
                )}
                
                {columnVisibility.brand && (
                  <TableCell className="text-gray-600" data-testid={`product-brand-${product.id}`}>
                    {product.brand || '-'}
                  </TableCell>
                )}
                
                {columnVisibility.subject && (
                  <TableCell className="text-gray-600" data-testid={`product-subject-${product.id}`}>
                    {product.subject || '-'}
                  </TableCell>
                )}
                
                {columnVisibility.sku && (
                  <TableCell className="font-mono text-sm text-gray-600" data-testid={`product-sku-display-${product.id}`}>
                    {product.sku}
                  </TableCell>
                )}
                
                {columnVisibility.barcode && (
                  <TableCell className="font-mono text-sm text-gray-600" data-testid={`product-barcode-${product.id}`}>
                    {product.barcode || '-'}
                  </TableCell>
                )}
                
                {columnVisibility.currentPrice && (
                  <TableCell className="font-medium" data-testid={`product-price-${product.id}`}>
                    {formatPrice(product.currentPrice)}
                  </TableCell>
                )}
                
                {columnVisibility.costPrice && (
                  <TableCell 
                    className="table-cell-editable cursor-pointer hover:bg-gray-50"
                    onClick={() => onEditProduct(product.id)}
                    data-testid={`product-cost-${product.id}`}
                  >
                    {formatPrice(product.costPrice)}
                  </TableCell>
                )}
                
                {columnVisibility.commission && (
                  <TableCell className="text-gray-500">
                    {formatPrice(product.commission)}
                  </TableCell>
                )}
                
                {columnVisibility.logisticsCost && (
                  <TableCell className="text-gray-500">
                    {formatPrice(product.logisticsCost)}
                  </TableCell>
                )}
                
                {columnVisibility.advertisingCost && (
                  <TableCell className="text-gray-500">
                    {formatPrice(product.advertisingCost)}
                  </TableCell>
                )}
                
                {columnVisibility.acquiringCost && (
                  <TableCell className="text-gray-500" data-testid={`product-acquiring-cost-${product.id}`}>
                    {formatPrice(product.acquiringCost)}
                  </TableCell>
                )}
                
                {columnVisibility.returnCost && (
                  <TableCell className="text-gray-500" data-testid={`product-return-cost-${product.id}`}>
                    {formatPrice(product.returnCost)}
                  </TableCell>
                )}
                
                {columnVisibility.disposalCost && (
                  <TableCell className="text-gray-500" data-testid={`product-disposal-cost-${product.id}`}>
                    {formatPrice(product.disposalCost)}
                  </TableCell>
                )}
                
                {columnVisibility.penaltyCost && (
                  <TableCell className="text-gray-500" data-testid={`product-penalty-cost-${product.id}`}>
                    {formatPrice(product.penaltyCost)}
                  </TableCell>
                )}
                
                {columnVisibility.otherCosts && (
                  <TableCell className="text-gray-500" data-testid={`product-other-costs-${product.id}`}>
                    {formatPrice(product.otherCosts)}
                  </TableCell>
                )}
                
                {columnVisibility.totalExpenses && (
                  <TableCell className="font-medium text-red-600" data-testid={`product-total-expenses-${product.id}`}>
                    {formatPrice(product.totalExpenses)}
                  </TableCell>
                )}
                
                {columnVisibility.marginRub && (
                  <TableCell className={`font-medium ${
                    (product.marginRub || 0) > 0 ? 'text-green-600' : 'text-red-600'
                  }`} data-testid={`product-margin-rub-${product.id}`}>
                    {product.marginRub ? 
                      `${product.marginRub > 0 ? '+' : ''}${formatPrice(product.marginRub)}` : 
                      '—'
                    }
                  </TableCell>
                )}
                
                {columnVisibility.marginPercent && (
                  <TableCell data-testid={`product-margin-percent-${product.id}`}>
                    {product.marginPercent !== undefined ? (
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getMarginColorClass(product.marginPercent)}`}>
                        {product.marginPercent.toFixed(1)}%
                      </span>
                    ) : (
                      '—'
                    )}
                  </TableCell>
                )}
                
                {columnVisibility.isProfitable && (
                  <TableCell data-testid={`product-profitability-${product.id}`}>
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 ${product.isProfitable ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span className={`text-sm font-medium ${product.isProfitable ? 'text-green-700' : 'text-red-700'}`}>
                        {product.isProfitable ? 'Да' : 'Нет'}
                      </span>
                    </div>
                  </TableCell>
                )}
                
                {columnVisibility.lastSyncedAt && (
                  <TableCell className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(product.lastSyncedAt), { 
                      addSuffix: true, 
                      locale: ru 
                    })}
                  </TableCell>
                )}
                
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1 h-auto text-blue-600 hover:text-blue-900"
                      title="Подробнее"
                      data-testid={`view-details-${product.id}`}
                    >
                      <EyeIcon className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1 h-auto text-gray-400 hover:text-gray-600"
                      onClick={() => onEditProduct(product.id)}
                      title="Редактировать"
                      data-testid={`edit-product-${product.id}`}
                    >
                      <EditIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination */}
      <div className="bg-white px-6 py-3 border-t border-gray-200 flex items-center justify-between">
        <div className="flex-1 flex justify-between sm:hidden">
          <Button variant="outline">Предыдущая</Button>
          <Button variant="outline">Следующая</Button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Показано с <span className="font-medium">1</span> по <span className="font-medium">{Math.min(50, products.length)}</span> из
              <span className="font-medium"> {stats.displayedCount}</span> результатов
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-700">Показать:</label>
            <select 
              className="border border-gray-300 rounded px-2 py-1 text-sm"
              value={pageSize}
              onChange={(e) => setPageSize(e.target.value)}
              data-testid="page-size-select"
            >
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="250">250</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
