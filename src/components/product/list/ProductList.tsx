import React, { FC, memo } from 'react';
import { IProduct } from '../../../types/product';
import NoProducts from '../empty/NoProducts';
import Product from '../tile/Product';
import useProductFilter from '../../../hooks/useProductFilter';
import { classNames, deepEqual } from '../../../utils/common.utils';
import styles from './list.module.scss';
import { MIN_TERM_LENGTH } from '../../../constants';

function canReRender(prevProps: Props, nextProps: Props) {
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

  const renderFilterText = () => {
    if (filteredProducts.length != 0) {
      return null;
    }

    const [minPrice, maxPrice] = priceRangeFilters;

    const filterText = [];

    if (searchTerm.length > MIN_TERM_LENGTH) {
      filterText.push(`search term: ${searchTerm}`);
    }
    if (minPrice != 0 || maxPrice != 500) {
      filterText.push('price');
    }

    if (colorFIlters.length) {
      filterText.push('color');
    }

    if (productTypeFilters.length) {
      filterText.push('product type');
    }

    return (
      <div className={classNames('d-flex justify-content-center mt-1', styles.note_wrapper)}>
        <span className={classNames('badge rounded-0 bg-light text-dark', styles.note)}>
          {filteredProducts.length > 0 ? `${filteredProducts.length}` : 'No'} matches for
        </span>
        <span className={classNames('badge rounded-0 bg-warning text-white', styles.note)}>
          {<span>{filterText.join(', ')}</span>} {filterText.length > 1 && 'Filters'}
        </span>
      </div>
    );
  };

  return (
    <>
      {filteredProducts.length != products.length && (
        <div className={classNames('d-flex justify-content-center', styles.note_wrapper)}>
          <span className={classNames('badge rounded-0 bg-light text-dark', styles.note)}>
            {filteredProducts.length} of {products.length}
          </span>
        </div>
      )}

      {renderFilterText()}
      <div className={classNames('row mx-0', styles.container)}>
        {filteredProducts.map((product) => {
          return <Product key={product.id} product={product} />;
        })}
        {filteredProducts.length === 0 && <NoProducts />}
      </div>
    </>
  );
},
canReRender);

export default ProductList;
