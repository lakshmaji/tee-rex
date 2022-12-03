import React, { FC, memo, useEffect, useState } from 'react';
import { ICheckItem } from '../../../types/common';
import { sanitize } from '../../../utils/common.utils';

function canReRender(prevProps: Props, nextProps: Props) {
  return prevProps.masterTypeFilters.length === nextProps.masterTypeFilters.length;
}

interface Props {
  masterTypeFilters: string[];
  onFilterDress: (i: string[]) => void;
}

const ProductTypeFilter: FC<Props> = memo(function DressTypeFilter({
  masterTypeFilters,
  onFilterDress,
}: Props) {
  const [productTypes, setChosenColors] = useState<ICheckItem[]>([]);

  useEffect(() => {
    setChosenColors(
      masterTypeFilters.map((color) => ({ value: sanitize(color), selected: false })),
    );
  }, [masterTypeFilters]);

  const applyColor = (currentColor: string) => {
    setChosenColors((p) =>
      p.map((c) => {
        if (c.value === currentColor) {
          return {
            ...c,
            selected: !c.selected,
          };
        }
        return c;
      }),
    );
  };

  useEffect(() => {
    onFilterDress(productTypes.filter((e) => e.selected).map((e) => e.value));
  }, [productTypes, onFilterDress]);

  return (
    <div className='box border-bottom'>
      <div className='box-label text-capitalize d-flex align-items-center'>type</div>
      <div id='type' className=' mt-2 mr-1'>
        {productTypes.map((d) => {
          return (
            <div className='my-1' key={d.value}>
              <label className='tick'>
                {d.value}{' '}
                <input
                  type='checkbox'
                  defaultChecked={d.selected}
                  onClick={() => applyColor(d.value)}
                />
                <span className='check' />
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
},
canReRender);

export default ProductTypeFilter;
