import React from 'react';
import Cart from './pages/cart/Cart';
import Error from './pages/Error';
import Layout from './layout';
import Products, { loader as catalogLoader } from './pages/product/Products';

const ROUTES = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Products />, loader: catalogLoader },
      {
        path: 'cart',
        element: <Cart />,
      },
    ],
  },
];
export default ROUTES;
