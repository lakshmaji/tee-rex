import React from 'react';
import { Link } from 'react-router-dom';

const EmptyCart = () => {
  return (
    <div className='d-flex flex-column  align-items-center justify-content-center p-5'>
      <div className='jumbotron jumbotron-fluid w-100 text-center rounded-1'>
        <div className='container'>
          <h1 className='display-4'>
            <i className='fa fa-frown-o text-info' aria-hidden='true'></i>
          </h1>
        </div>
      </div>

      <h2>Your cart is empty</h2>
      <div className='d-flex align-items-center justify-content-center'>
        <span className='pr-2'>go to </span>
        <Link to='/' className='text-success'>
          shopping
        </Link>
      </div>
    </div>
  );
};
export default EmptyCart;
