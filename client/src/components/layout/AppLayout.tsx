import Header from "./Header";
import DatePicker from "@/components/features/products/DatePicker";
import MetricsSummary from "@/components/features/products/MetricsSummary";
import ProductFiltersComponent from "@/components/features/products/ProductFilters";
import ProductsTable from "@/components/features/products/ProductsTable";
import InlineEditor from "@/components/features/products/InlineEditor";
import ColumnCustomizer from "@/components/features/products/ColumnCustomizer";
import { useProducts } from "@/hooks/use-products";
import { useFilters } from "@/hooks/use-filters";
import { useState } from "react";

export default function AppLayout() {
  const { products, filters, setFilters, stats, updateProduct, applyPreset, resetFilters } = useProducts();
  const { columnVisibility, toggleColumnVisibility, isColumnCustomizerOpen, toggleColumnCustomizer, closeColumnCustomizer } = useFilters();
  const [editingProduct, setEditingProduct] = useState<string | null>(null);

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          filters={filters}
          setFilters={setFilters}
          onSync={() => console.log("Sync triggered")}
          onExport={() => console.log("Export triggered")}
        />
        
        <DatePicker 
          filters={filters}
          setFilters={setFilters}
        />
        
        <MetricsSummary 
          stats={stats}
          profitableCount={stats.profitableProducts}
          unprofitableCount={stats.unprofitableProducts}
        />
        
        <ProductFiltersComponent
          filters={filters}
          setFilters={setFilters}
          onApplyPreset={applyPreset}
          onResetFilters={resetFilters}
          stats={stats}
        />
        
        <div className="flex-1 overflow-hidden bg-white">
          <ProductsTable
            products={products}
            columnVisibility={columnVisibility}
            stats={stats}
            onToggleColumnCustomizer={toggleColumnCustomizer}
            onEditProduct={setEditingProduct}
          />
        </div>
      </div>

      {editingProduct && (
        <InlineEditor
          productId={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={updateProduct}
        />
      )}

      <ColumnCustomizer
        isOpen={isColumnCustomizerOpen}
        columnVisibility={columnVisibility}
        onToggleColumn={toggleColumnVisibility}
        onClose={closeColumnCustomizer}
      />
    </div>
  );
}
