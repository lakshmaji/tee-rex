import React, { FC } from 'react';
import GenderFilter from './GenderFilter';
import PriceFilter from './price/PriceFilter';
import styles from './product-filter.module.scss';
import { classNames } from '../../../utils/common.utils';
import MultipleFilters from './multiple-selection/MultipleFilters';

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
    <div
      id='filterbar'
      className={classNames(` mt-5 ${collapse ? 'collapse' : ''}`, styles.container)}
    >
      <div className={classNames('border-bottom', styles.box)}>
        <div className={classNames(styles.box_label, ' text-capitalize d-flex align-items-center')}>
          color
        </div>
        <MultipleFilters items={masterColorFilters} onChange={onFilterColor} />
      </div>
      <div className={classNames('border-bottom', styles.box)}>
        <div className={classNames(styles.box_label, ' text-capitalize d-flex align-items-center')}>
          type
        </div>
        <MultipleFilters items={masterTypeFilters} onChange={onFilterDress} />
      </div>
      <div className={classNames('border-bottom', styles.box)}>
        <div className={classNames(styles.box_label, ' text-capitalize d-flex align-items-center')}>
          price
        </div>

        <PriceFilter maxPrice={maxPriceFilter} onChangePrice={onChangePrice} />
      </div>
      <div className={classNames(styles.box)}>
        <div className={classNames(styles.box_label, ' text-capitalize d-flex align-items-center')}>
          gender
        </div>
        <GenderFilter onFilterGender={onFilterGender} />
      </div>
    </div>
  );
};

export default ProductFilters;
