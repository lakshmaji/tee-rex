import React, { FC, memo } from 'react';
import { IProduct } from '../../../types/product';
import NoProducts from '../empty/NoProducts';
import Product from '../tile/Product';
import useProductFilter from '../../../hooks/useProductFilter';
import { deepEqual } from '../../../utils/common.utils';

function areEqual(prevProps: any, nextProps: any) {
  const productsChanged = deepEqual(prevProps.products, nextProps.products);
  const searchChanged = deepEqual(prevProps.searchTerm, nextProps.searchTerm);
  const dressFIltersChanged = deepEqual(prevProps.productTypeFilters, nextProps.productTypeFilters);
  const colorFIltersChanged = deepEqual(prevProps.colorFIlters, nextProps.colorFIlters);
  const genderFIltersChanged = deepEqual(prevProps.genderFilters, nextProps.genderFilters);
  const priceFIltersChanged = deepEqual(prevProps.priceRangeFilters, nextProps.priceRangeFilters);
  
  return (
    productsChanged &&
    searchChanged &&
    dressFIltersChanged &&
    colorFIltersChanged &&
    genderFIltersChanged &&
    priceFIltersChanged
  );
}

interface Props {
  products: IProduct[];
  searchTerm: string;
  colorFIlters?: string[];
  productTypeFilters?: string[];
  genderFilters: Record<string, boolean>;
  priceRangeFilters: number[];
}
const ProductList: FC<Props> = memo(function ProductList({
  products,
  searchTerm,
  genderFilters,
  colorFIlters = [],
  productTypeFilters = [],
  priceRangeFilters,
}: Props) {

  const { filter } = useProductFilter(products);
  const filteredProducts = filter(
    searchTerm,
    colorFIlters,
    productTypeFilters,
    genderFilters,
    priceRangeFilters,
  );

  return (
    <div id='products'>
      <div className='row mx-0'>
        {filteredProducts.length != products.length && (
          <div className='d-flex justify-content-center'>
            <span className='badge rounded-0 bg-light text-dark'>
              {filteredProducts.length} of {products.length}
            </span>
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div className='d-flex justify-content-center mt-1'>
            <span className='badge rounded-0 bg-light text-dark'>
              {filteredProducts.length > 0 ? `${filteredProducts.length}` : 'No'} matches for
            </span>
            <span className='badge rounded-0 bg-warning text-white'>
              {searchTerm} {priceRangeFilters.length && searchTerm.length === 0 && <div>price</div>}{' '}
              {colorFIlters.concat([], productTypeFilters).length > 0 && 'Filters'}
            </span>
          </div>
        )}
        {filteredProducts.map((product) => {
          return <Product key={product.id} product={product} />;
        })}
        {filteredProducts.length === 0 && <NoProducts />}
      </div>
    </div>
  );
},
areEqual);

export default ProductList;
