import React, { useState } from 'react';
import ProductContainer from '../components/product/ProductContainer';
import SearchProducts from '../components/product/search/SearchProducts';
import { getCatalog } from '../services/catalog';
import { IProduct } from '../types/product';
import { useLoaderData } from 'react-router-dom';

export async function loader() {
  const products = await getCatalog();
  return { products };
}
interface Props {
  products: IProduct[];
}

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { products } = useLoaderData() as Props;

  const [collapse, setCollapse] = useState(true);

  const changeBtnTxt = () => {
    setCollapse((prev) => !prev);
  };

  const onChangeSearchTerm = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <div className='container'>
      <div
        className='bg-white rounded d-flex align-items-center justify-content-between filter-swap px-2'
        id='header'
      >
        <button
          className='btn btn-dark btn-hide text-uppercase'
          type='button'
          data-toggle='collapse'
          data-target='#filterbar'
          aria-expanded='false'
          aria-controls='filterbar'
          id='filter-btn'
          onClick={changeBtnTxt}
        >
          <span className='filter-text'>Filters </span>
          {collapse && <i className='fa fa-filter' aria-hidden='true'></i>}
          {!collapse && <i className='fa fa-times' aria-hidden='true'></i>}
        </button>
        <SearchProducts onChange={onChangeSearchTerm} />
      </div>
      <div id='content' className='my-5'>
        <ProductContainer collapse={collapse} products={products} searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default Products;
