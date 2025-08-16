import Header from "./Header";
import Toolbar1 from "@/components/features/products/Toolbar1";
import MetricsSummary from "@/components/features/products/MetricsSummary";
import Toolbar2 from "@/components/features/products/Toolbar2";
import ProductsTable from "@/components/features/products/ProductsTable";
import InlineEditor from "@/components/features/products/InlineEditor";
import ColumnCustomizer from "@/components/features/products/ColumnCustomizer";
import { useProducts } from "@/hooks/use-products";
import { useFilters } from "@/hooks/use-filters";
import { useState } from "react";

export default function AppLayout() {
  const { products, filters, setFilters, stats, updateProduct, resetFilters } = useProducts();
  const { columnVisibility, toggleColumnVisibility, isColumnCustomizerOpen, toggleColumnCustomizer, closeColumnCustomizer } = useFilters();
  const [editingProduct, setEditingProduct] = useState<string | null>(null);

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 1. Header Bar */}
        <Header 
          filters={filters}
          setFilters={setFilters}
          onExport={() => console.log("Export triggered")}
        />
        
        {/* 2. Toolbar 1 (Period & Indicators) */}
        <div className="mb-4">
          <Toolbar1 
            filters={filters}
            setFilters={setFilters}
            stats={stats}
          />
        </div>
        
        {/* 3. Metrics Summary Panel */}
        <MetricsSummary 
          stats={stats}
        />
        
        {/* 4. Toolbar 2 (Filters) */}
        <Toolbar2
          filters={filters}
          setFilters={setFilters}
          onResetFilters={resetFilters}
          stats={stats}
        />
        
        {/* 5. Products Table */}
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
