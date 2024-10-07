import React, { NavLink } from 'react-router-dom';
import CartCounter from '../../components/common/CartCounter';
import Logo from '../../components/common/Logo';
import { classNames } from '../../utils/common.utils';
import styles from './header.module.scss';

const Header = () => {
  return (
    <nav className='navbar fixed-top navbar-expand-lg navbar-light bg-light px-4 py-2 '>
      <div
        className='d-lg-none d-xl-none

        border-0 d-flex p-0 m-0 w-100 justify-content-between align-items-center pt-1'
        data-toggle='collapse'
        data-target='#navbarToggler'
        aria-controls='navbarToggler'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <Logo />
        <CartCounter />
      </div>
      <div className='collapse navbar-collapse justify-content-between' id='navbarToggler'>
        <Logo />
        <ul className={'my-2 my-lg-0'}>
          <NavLink
            to='/'
            className={({ isActive }) =>
              classNames(
                `btn ${isActive ? 'btn-dark ' : 'btn-light btn-outline-dark'}`,
                styles.product_link,
              )
            }
          >
            Products
          </NavLink>
          <CartCounter />
        </ul>
      </div>
    </nav>
  );
};

export default Header;
