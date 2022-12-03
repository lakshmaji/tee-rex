import React, { FC } from 'react';
import ColorFilter from './ColorFilter';
import GenderFilter from './GenderFilter';
import PriceFilter from './PriceFilter';
import ProductTypeFilter from './ProductTypeFilter';

interface Props {
  collapse: boolean;
  masterColorFilters: string[];
  masterTypeFilters: string[];
  maxPriceFilter: number;
  onFilterColor: (i: string[]) => void;
  onFilterDress: (i: string[]) => void;
  onFilterGender: (gender: Record<string, boolean>) => void;
  onChangePrice: (min: number, max: number) => void;
}
const ProductFilters: FC<Props> = ({
  collapse,

  masterColorFilters,
  masterTypeFilters,
  maxPriceFilter,
  onFilterColor,
  onFilterDress,
  onFilterGender,
  onChangePrice,
}) => {
  return (
    <div id='filterbar' className={` mt-5 ${collapse ? 'collapse' : ''}`}>
      <ColorFilter masterColorFilters={masterColorFilters} onFilterColor={onFilterColor} />
      <ProductTypeFilter masterTypeFilters={masterTypeFilters} onFilterDress={onFilterDress} />
      <PriceFilter maxPrice={maxPriceFilter} onChangePrice={onChangePrice} />
      <GenderFilter onFilterGender={onFilterGender} />
    </div>
  );
};

export default ProductFilters;
