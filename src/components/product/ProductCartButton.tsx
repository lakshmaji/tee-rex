import React, { FC, useCallback, useEffect, useState } from 'react';
import { distinctUntilChanged, map } from 'rxjs';
import { useCart } from '../../hooks/useCart';
import { cartService } from '../../services/cart';
import { ICartItem } from '../../state/reducer';
import { IProduct } from '../../types/product';

interface Props {
  product: IProduct;
}

const ProductCartButton: FC<Props> = ({ product }) => {
  const sku = product.id.toString();
  const { addItem: _add, deleteItem: _remove } = useCart();

  const [cartItem, setCartItem] = useState<ICartItem | undefined>();
  useEffect(() => {
    const subscription = cartService.items$
      .pipe(
        map<ICartItem[], ICartItem | undefined>((x) => x.find((item) => item.sku === sku)),
        distinctUntilChanged(),
      )
      .subscribe((item) => {
        setCartItem(item);
      });
    return () => {
      subscription.unsubscribe();
    };
  }, [sku]);

  const _addItem = useCallback(() => {
    _add(product);
  }, [_add, product]);

  const _removeItem = useCallback(() => {
    _remove(sku);
  }, [_remove, sku]);

  if (cartItem) {
    return (
      <>
        <button className='btn btn-dark rounded-0 mobile-width' type='submit' onClick={_removeItem}>
          <i className='fa fa-minus' aria-hidden='true'></i>
        </button>
        {cartItem.quantity}
        <button className='btn btn-dark rounded-0 mobile-width' type='submit' onClick={_addItem}>
          <i className='fa fa-plus' aria-hidden='true'></i>
        </button>
      </>
    );
  }

  return (
    <button className='btn btn-dark rounded-0' type='submit' onClick={_addItem}>
      Add to Cart
    </button>
  );
};
export default ProductCartButton;
