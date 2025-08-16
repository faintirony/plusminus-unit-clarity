import { Product } from "@/types/products";
import ProductCard from "./ProductCard";

interface ProductsListProps {
  products: Product[];
  onEdit: (productId: string) => void;
  onUpdateProduct?: (productId: string, updates: Partial<Product>) => void;
  columnVisibility?: Record<string, boolean>;
}

export default function ProductsList({ products, onEdit, onUpdateProduct, columnVisibility = {} }: ProductsListProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <div className="text-6xl mb-4">📦</div>
        <h3 className="text-lg font-semibold mb-2">Товары не найдены</h3>
        <p className="text-sm">Попробуйте изменить фильтры или поисковый запрос</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-200 rounded-lg overflow-hidden" data-testid="products-list">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onUpdateProduct={onUpdateProduct}
          columnVisibility={columnVisibility}
        />
      ))}
    </div>
  );
}