import React, { NavLink } from 'react-router-dom';
import CartCounter from '../../components/common/CartCounter';
import Logo from '../../components/common/Logo';

const Header = () => {
  return (
    <nav className='navbar fixed-top navbar-expand-lg navbar-light bg-light px-4 py-2'>
      <div
        className='d-lg-none d-xl-none

        border-0 d-flex p-0 m-0 w-100 justify-content-between align-items-center pt-1'
        data-toggle='collapse'
        data-target='#navbarTogglerDemo01'
        aria-controls='navbarTogglerDemo01'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <Logo />
        <CartCounter />
      </div>
      <div className='collapse navbar-collapse' id='navbarTogglerDemo01'>
        <Logo />
        <ul className='navbar-nav mr-auto mt-2 mt-lg-0'></ul>
        <ul className='my-2 my-lg-0'>
          <NavLink
            to='/'
            className={({ isActive }) =>
              `btn mr-3 ${isActive ? 'btn-dark ' : 'btn-light btn-outline-dark'}`
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
