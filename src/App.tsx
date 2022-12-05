import React from 'react';
import 'bootstrap/scss/bootstrap.scss';
import 'font-awesome/scss/font-awesome.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ROUTES from './routes';
import './App.css';

const router = createBrowserRouter(ROUTES);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
