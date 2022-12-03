import React, { FC } from 'react';
import Currency from '../../common/Currency';
import { ICartItem } from '../../../state/reducer';
import styles from './cart-item.module.scss';
import { classNames } from '../../../utils/common.utils';
import { useCart } from '../../../hooks/useCart';

interface Props {
  item: ICartItem;
}
const CartItem: FC<Props> = ({ item }) => {
  const { deleteItem: _remove } = useCart()

  const deleteItem = () => {
    _remove(item.sku);
  };

  return (
    <>
      <div
        className={classNames(
          'row  d-flex align-items-center justify-content-center',
          styles.cartItem,
        )}
      >
        <div className='col-sm-3'>
          <img className='w-100' src={item.image} alt={item.name} />
        </div>
        <div className='col-sm-5'>
          <p className='pl-1 mb-0'>{item.name}</p>
          <p id='cartItem1Price'>
            <Currency amount={item.price} />
          </p>
        </div>
        <div className='col-sm-2'>
          <p className={classNames(styles.cartItemQuantity, 'p-1 text-center')}>
            <i className='fa fa-times' aria-hidden='true'></i>
            {item.quantity}
          </p>
        </div>
        <div className='col-sm-2'>
          <button
            className='btn btn-outline-danger rounded-2 w-100'
            type='submit'
            onClick={deleteItem}
          >
            <i className='fa fa-trash' aria-hidden='true'></i>
          </button>
        </div>
      </div>
      <br />
    </>
  );
};

export default CartItem;
