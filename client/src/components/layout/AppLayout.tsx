import { Switch, Route } from "wouter";
import AppHeader from "./AppHeader";
import CompactHeader from "./CompactHeader";
import ProductsList from "@/components/features/products/ProductsList";
import InlineEditor from "@/components/features/products/InlineEditor";
import StoresPage from "@/pages/StoresPage";
import { Toaster } from "@/components/ui/toaster";
import { useProducts } from "@/hooks/use-products";
import { useExport } from "@/hooks/use-export";
import { useState } from "react";

function ProductsLayout() {
  const { products, filters, setFilters, stats, updateProduct } = useProducts();
  const { exportProducts, isExporting } = useExport();
  const [editingProduct, setEditingProduct] = useState<string | null>(null);

  const handleExport = () => {
    exportProducts(products);
  };

  return (
    <div className="flex h-screen bg-gray-50 flex-col">
      {/* App Navigation Header */}
      <AppHeader />
      
      <div className="flex flex-1 overflow-hidden">
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
      </div>

      <Toaster />
    </div>
  );
}

function StoresLayout() {
  return (
    <div className="flex h-screen bg-gray-50 flex-col">
      {/* App Navigation Header */}
      <AppHeader />
      
      {/* Stores Page Content */}
      <div className="flex-1 overflow-auto">
        <StoresPage />
      </div>
      
      <Toaster />
    </div>
  );
}

export default function AppLayout() {
  return (
    <Switch>
      <Route path="/app/stores" component={StoresLayout} />
      <Route path="/app/products" component={ProductsLayout} />
      <Route path="/app" component={ProductsLayout} />
    </Switch>
  );
}
