import { useMemo, useCallback } from 'react';
import { cartService } from '../services/cart';
import { IProduct } from '../types/product';

export const useCart = () => {
  const deleteItem = useCallback((sku: string) => {
    cartService.removeItem(sku);
  }, []);

  const addItem = useCallback((product: IProduct) => {
    cartService.addItem({
      sku: product.id.toString(),
      quantity: product.quantity,
      image: product.imageURL,
      name: product.name,
      price: product.price,
      currency: product.currency,
    });
  }, []);

  const value = useMemo(
    () => ({
      deleteItem,
      addItem,
    }),
    [addItem, deleteItem],
  );
  return useMemo(() => value, [value]);
};
