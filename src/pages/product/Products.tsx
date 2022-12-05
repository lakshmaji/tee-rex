import React, { useState } from 'react';
import ProductContainer from '../../components/product/ProductContainer';
import SearchProducts from '../../components/product/search/SearchProducts';
import { getCatalog } from '../../services/catalog';
import { IProduct } from '../../types/product';
import { useLoaderData } from 'react-router-dom';
import styles from './product.module.scss';
import { classNames } from '../../utils/common.utils';

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
    <div className={classNames('container mb-0', styles.page)}>
      <div
        className={classNames(
          'bg-white rounded d-flex align-items-center justify-content-between px-2',
          styles.filter_swap,
        )}
      >
        <button
          className={classNames('btn btn-dark btn-hide text-uppercase ', styles.filter_btn)}
          type='button'
          data-toggle='collapse'
          data-target='#filterbar'
          aria-expanded='false'
          aria-controls='filterbar'
          id=''
          onClick={changeBtnTxt}
        >
          <span className={styles.filter_text}>Filters </span>
          {collapse && <i className='fa fa-filter' aria-hidden='true'></i>}
          {!collapse && <i className='fa fa-times' aria-hidden='true'></i>}
        </button>
        <SearchProducts onChange={onChangeSearchTerm} />
      </div>
      <div className='content mt-5 pb-5'>
        <ProductContainer collapse={collapse} products={products} searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default Products;
