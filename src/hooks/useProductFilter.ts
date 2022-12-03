import { useCallback } from 'react';
import { IProduct } from '../types/product';
import {
  productColorFilter,
  productGenderFilter,
  productPriceFilter,
  productTermFilter,
  productTypeFilter,
} from '../utils/product.utils';

interface IUseProductFilter {
  filter: (
    term: string,
    colorFIlters: string[],
    productTypeFilters: string[],
    genderFilters: Record<string, boolean>,
    priceRangeFilters: number[],
  ) => IProduct[];
}

const useProductFilter = (items: IProduct[]): IUseProductFilter => {
  const filter = useCallback(
    (
      searchTerm: string,
      colorFIlters: string[],
      productTypeFilters: string[],
      genderFilters: Record<string, boolean>,
      priceRangeFilters: number[],
    ) => {
      let result: IProduct[] = items;
      result = productTermFilter(result, searchTerm);

      result = productGenderFilter(result, genderFilters);

      const [min, max] = priceRangeFilters;
      result = productPriceFilter(result, min, max);

      result = productColorFilter(result, colorFIlters);

      result = productTypeFilter(result, productTypeFilters);

      return result;
    },
    [items],
  );

  return { filter };
};

export default useProductFilter;
