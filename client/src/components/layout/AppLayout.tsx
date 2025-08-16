import CompactHeader from "./CompactHeader";
import ProductsList from "@/components/features/products/ProductsList";
import InlineEditor from "@/components/features/products/InlineEditor";
import { Toaster } from "@/components/ui/toaster";
import { useProducts } from "@/hooks/use-products";
import { useExport } from "@/hooks/use-export";
import { useState } from "react";

export default function AppLayout() {
  const { products, filters, setFilters, stats, updateProduct } = useProducts();
  const { exportProducts, isExporting } = useExport();
  const [editingProduct, setEditingProduct] = useState<string | null>(null);

  const handleExport = () => {
    exportProducts(products);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Compact Header with all filters */}
        <CompactHeader 
          filters={filters}
          setFilters={setFilters}
          products={products}
          onExport={handleExport}
          isExporting={isExporting}
          stats={stats}
        />
        
        {/* Products List */}
        <div className="flex-1 overflow-auto bg-gray-50 p-6">
          <ProductsList
            products={products}
            onEdit={setEditingProduct}
            onUpdateProduct={updateProduct}
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

      <Toaster />
    </div>
  );
}
