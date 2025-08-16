import { Product } from "@/types/products";
import ProductCard from "./ProductCard";

interface ProductsListProps {
  products: Product[];
  onEdit: (productId: string) => void;
  columnVisibility?: Record<string, boolean>;
}

export default function ProductsList({ products, onEdit, columnVisibility = {} }: ProductsListProps) {
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
    <div className="space-y-3" data-testid="products-list">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          columnVisibility={columnVisibility}
        />
      ))}
    </div>
  );
}