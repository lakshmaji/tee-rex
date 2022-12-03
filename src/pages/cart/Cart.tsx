import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { distinctUntilChanged } from 'rxjs';
import { classNames } from '../../utils/common.utils';
import styles from './cart.module.scss';
import CartItem from '../../components/cart/item/CartItem';
import { cartService } from '../../services/cart';
import Currency from '../../components/common/Currency';
import EmptyCart from '../../components/cart/empty/EmptyCart';
import { ICartItem } from '../../state/reducer';

const Cart = () => {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const subscription = cartService.items$.pipe(distinctUntilChanged()).subscribe((items) => {
      const total = items.reduce((total, item) => total + item.quantity * item.price, 0);
      setTotal(total);
      setCartItems(items);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <main className={classNames('px-5', styles.cart)}>
      <div className='d-flex align-items-center'>
        <div>
          <Link to='/' className='btn btn-dark rounded-circle'>
            <i className='fa fa-chevron-left' aria-hidden='true'></i>
          </Link>
        </div>
        <div>
          <span className='text-left pl-3'>Cart</span>
        </div>
      </div>
      <div className='container-fluid  w-50'>
        <div className='row align-items-start'>
          <div className='col-md-12 col-sm-12'>
            {cartItems.map((cartItem) => {
              return <CartItem key={cartItem.sku} item={cartItem} />;
            })}
            {cartItems.length === 0 && <EmptyCart />}
            {cartItems.length > 0 && (
              <>
                <hr />
                <div className='cartItem row '>
                  <div className='d-flex justify-content-center align-items-center '>
                    <div className='px-4'>
                      <h5 className='text-secondary'>Total</h5>
                    </div>
                    <div className='px-4 '>
                      <Currency amount={total} />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
