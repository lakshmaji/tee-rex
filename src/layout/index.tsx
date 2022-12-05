import React from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import Alert from '../components/common/alert/Alert';
import Footer from './footer/Footer';
import Header from './header/Header';

const Layout = () => {
  return (
    <>
      <ScrollRestoration />

      <Header />
      <div className='bg-white' style={{ paddingTop: 60 }}>
        <Alert />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
