import React, { FC, memo, useEffect, useState } from 'react';
import { ICheckItem } from '../../../types/common';
import { sanitize } from '../../../utils/common.utils';

function areEqualColor(prevProps: any, nextProps: any) {
  return prevProps.masterColorFilters.length === nextProps.masterColorFilters.length;
}

interface Props {
  masterColorFilters: string[];
  onFilterColor: (i: string[]) => void;
}
const ColorFilter: FC<Props> = memo(function ColorFIlter({
  masterColorFilters,
  onFilterColor,
}: Props) {
  const [chosenColors, setChosenColors] = useState<ICheckItem[]>([]);

  useEffect(() => {
    setChosenColors(
      masterColorFilters.map((color) => ({ value: sanitize(color), selected: false })),
    );
  }, [masterColorFilters]);

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
    const finallist = chosenColors.filter((e) => e.selected);
    onFilterColor(finallist.map((e) => e.value));
  }, [chosenColors, onFilterColor]);

  return (
    <div className='box border-bottom'>
      <div className='box-label text-capitalize d-flex align-items-center'>color</div>
      <div id='inner-box' className=' mt-2 mr-1'>
        {chosenColors.map((color) => {
          return (
            <div className='my-1' key={color.value}>
              <label className='tick'>
                {color.value}{' '}
                <input
                  type='checkbox'
                  defaultChecked={color.selected}
                  onClick={() => applyColor(color.value)}
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
areEqualColor);

export default ColorFilter;
