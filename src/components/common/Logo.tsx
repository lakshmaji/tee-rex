import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link className='navbar-brand' to='/'>
      🦖 T-Rex
    </Link>
  );
};

export default Logo;
