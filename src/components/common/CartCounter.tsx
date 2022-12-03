import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { cartService } from '../../services/cart';

const CartCounter = () => {
  const [totalItemsCount, setTotalItemsCount] = useState(0);

  useEffect(() => {
    const subscription = cartService.items$.subscribe((items) => {
      const total = items.reduce((total, item) => total + item.quantity, 0);
      setTotalItemsCount(total);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <NavLink
      className={({ isActive }) =>
        `btn  position-relative ${isActive ? 'btn-dark ' : 'btn-light btn-outline-dark'}`
      }
      to='cart'
    >
      <i className='fa fa-shopping-cart' aria-hidden='true'></i>
      <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark'>
        {totalItemsCount}
        <span className='visually-hidden'>unread messages</span>
      </span>
    </NavLink>
  );
};

export default CartCounter;
