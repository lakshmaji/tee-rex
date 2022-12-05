import React, { FC, memo, useEffect, useState } from 'react';
import { ICheckItem } from '../../../../types/common';
import { sanitize } from '../../../../utils/common.utils';
import styles from './multiple-filters.module.scss';

function canReRender(prevProps: Props, nextProps: Props) {
  return prevProps.items.length === nextProps.items.length;
}

interface Props {
  items: string[];
  onChange: (selectedItems: string[]) => void;
}
const MultipleFilters: FC<Props> = memo(function MultipleFilters({ items, onChange }: Props) {
  const [chosenItems, setChosenItems] = useState<ICheckItem[]>([]);

  useEffect(() => {
    setChosenItems(items.map((color) => ({ value: sanitize(color), selected: false })));
  }, [items]);

  const applyColor = (currentColor: string) => {
    setChosenItems((prevItems) =>
      prevItems.map((item) => {
        if (item.value === currentColor) {
          return {
            ...item,
            selected: !item.selected,
          };
        }
        return item;
      }),
    );
  };

  useEffect(() => {
    onChange(chosenItems.filter((item) => item.selected).map((item) => item.value));
  }, [chosenItems, onChange]);

  return (
    <div className=' mt-2 mr-1'>
      {chosenItems.map((item) => {
        return (
          <div className='my-1' key={item.value}>
            <label className={styles.tick}>
              {item.value}{' '}
              <input
                type='checkbox'
                defaultChecked={item.selected}
                onClick={() => applyColor(item.value)}
              />
              <span className={styles.check} />
            </label>
          </div>
        );
      })}
    </div>
  );
}, canReRender);

export default MultipleFilters;
