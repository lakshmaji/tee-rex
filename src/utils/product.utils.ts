import { MIN_TERM_LENGTH } from '../constants';
import { IProduct } from '../types/product';
import { sanitize } from './common.utils';

function getValue(item: IProduct, key: keyof IProduct): string {
  return item[key] as string;
}

export const productTermFilter = (items: IProduct[], term: string): IProduct[] => {
  if (sanitize(term).length > MIN_TERM_LENGTH) {
    const value = sanitize(term);
    return items.filter((item: IProduct) => {
      return ['color', 'name', 'type'].some((attribute) => {
        if (typeof attribute == 'string') {
          const attributeValue = getValue(item, attribute as keyof IProduct);
          return sanitize(attributeValue).includes(value);
        }
        return false;
      });
    });
  }
  return items;
};

export const productGenderFilter = (
  items: IProduct[],
  genderMap: Record<string, boolean>,
): IProduct[] => {
  if (!Object.values(genderMap).every((e) => e)) {
    if (Object.values(genderMap).some((e) => e)) {
      return items.filter((e) => {
        if (genderMap.male) {
          return e.gender === 'Men';
        }
        return e.gender === 'Women';
      });
    }
  }
  return items;
};

export const productPriceFilter = (
  items: IProduct[],
  minPrice: number,
  maxPrice: number,
): IProduct[] => {
  if (minPrice >= 0 && maxPrice >= 0) {
    return items.filter((r) => {
      return minPrice <= r.price && r.price <= maxPrice;
    });
  }
  return items;
};

export const productColorFilter = (items: IProduct[], colors: string[]): IProduct[] => {
  if (colors.length) {
    const colorSet = new Set(colors);
    return items.filter((e) => colorSet.has(sanitize(e.color)));
  }
  return items;
};

export const productTypeFilter = (items: IProduct[], types: string[]): IProduct[] => {
  if (types.length) {
    const typeSet = new Set(types);
    return items.filter((e) => typeSet.has(sanitize(e.type)));
  }
  return items;
};
