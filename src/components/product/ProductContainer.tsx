import React, { FC, useState } from 'react';
import { IProduct } from '../../types/product';
import ProductFilters from './filter/ProductFilters';
import ProductList from './list/ProductList';

interface Props {
  products: IProduct[];
  searchTerm: string;
  collapse: boolean;
}
const ProductContainer: FC<Props> = ({ collapse, products, searchTerm }) => {
  const masterColorFilters = Array.from(new Set(products.map((item) => item.color)));
  const masterTypeFilters = Array.from(new Set(products.map((item) => item.type)));
  const maxPriceFilter = Math.ceil(
    Math.max.apply(
      [],
      products.map((item) => item.price),
    ),
  );

  const [colorFIlters, setColorFilters] = useState<string[]>([]);
  const onFilterColor = (values: string[]) => {
    setColorFilters(values);
  };

  const [productTypeFilters, setDressFilters] = useState<string[]>([]);
  const onFilterDress = (values: string[]) => {
    setDressFilters(values);
  };

  const [genderFilters, setGenderFilters] = useState<Record<string, boolean>>({});
  const onFilterGender = (values: Record<string, boolean>) => {
    setGenderFilters(values);
  };

  const [priceRangeFilters, setPriceFilters] = useState<number[]>([]);
  const onFilterPrice = (min: number, max: number) => {
    setPriceFilters([min, max]);
  };
  return (
    <>
      <ProductFilters
        collapse={collapse}
        masterColorFilters={masterColorFilters}
        masterTypeFilters={masterTypeFilters}
        maxPriceFilter={maxPriceFilter}
        onFilterColor={onFilterColor}
        onFilterDress={onFilterDress}
        onFilterGender={onFilterGender}
        onChangePrice={onFilterPrice}
      />
      <ProductList
        products={products}
        searchTerm={searchTerm}
        colorFIlters={colorFIlters}
        productTypeFilters={productTypeFilters}
        genderFilters={genderFilters}
        priceRangeFilters={priceRangeFilters}
      />
    </>
  );
};

export default ProductContainer;
