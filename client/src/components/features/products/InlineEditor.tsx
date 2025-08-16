import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { allMockProducts, formatPrice } from "@/lib/mock-data";
import { Product } from "@/types/products";

interface InlineEditorProps {
  productId: string;
  onClose: () => void;
  onSave: (productId: string, updates: Partial<Product>) => void;
}

export default function InlineEditor({ productId, onClose, onSave }: InlineEditorProps) {
  const [costPrice, setCostPrice] = useState<string>("");
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const foundProduct = allMockProducts.find(p => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
      setCostPrice(foundProduct.costPrice ? (foundProduct.costPrice / 100).toString() : "");
    }
  }, [productId]);

  if (!product) return null;

  const calculateNewMargin = () => {
    const newCostPriceKopecks = parseFloat(costPrice) * 100 || 0;
    const salePrice = product.currentPrice || 0;
    const fees = (product.commission || 0) + (product.logisticsCost || 0) + (product.advertisingCost || 0);
    
    const marginRub = salePrice - newCostPriceKopecks - fees;
    const marginPercent = salePrice > 0 ? (marginRub / salePrice) * 100 : 0;
    
    return { marginRub, marginPercent };
  };

  const handleSave = () => {
    const newCostPriceKopecks = parseFloat(costPrice) * 100 || 0;
    const { marginRub, marginPercent } = calculateNewMargin();
    
    onSave(productId, {
      costPrice: newCostPriceKopecks,
      marginRub,
      marginPercent,
      isProfitable: marginRub > 0,
    });
    onClose();
  };

  const { marginRub, marginPercent } = calculateNewMargin();

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-md" data-testid="inline-editor-modal">
        <DialogHeader>
          <DialogTitle>Редактировать себестоимость</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="costPrice" className="text-sm font-medium text-gray-700">
              Новая себестоимость (₽)
            </Label>
            <Input
              id="costPrice"
              type="number"
              value={costPrice}
              onChange={(e) => setCostPrice(e.target.value)}
              placeholder="3500"
              className="mt-1"
              data-testid="cost-price-input"
            />
          </div>
          
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-sm text-gray-600 space-y-1">
              <div className="flex justify-between">
                <span>Цена продажи:</span>
                <span className="font-medium">{formatPrice(product.currentPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span>Новая себестоимость:</span>
                <span className="font-medium text-blue-600">
                  ₽{parseFloat(costPrice || "0").toLocaleString("ru-RU")}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Комиссия + логистика:</span>
                <span className="font-medium">
                  {formatPrice((product.commission || 0) + (product.logisticsCost || 0) + (product.advertisingCost || 0))}
                </span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-medium">
                <span>Новая маржа:</span>
                <span className={marginRub > 0 ? "text-green-600" : "text-red-600"} data-testid="calculated-margin">
                  {marginRub > 0 ? '+' : ''}{formatPrice(marginRub)} ({marginPercent.toFixed(1)}%)
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-end space-x-3">
            <Button 
              variant="outline" 
              onClick={onClose}
              data-testid="cancel-edit-button"
            >
              Отмена
            </Button>
            <Button 
              onClick={handleSave}
              data-testid="save-edit-button"
            >
              Сохранить
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
