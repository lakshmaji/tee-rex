import React, { FC, useState } from 'react';
import { MIN_TERM_LENGTH } from '../../../constants';
import { classNames } from '../../../utils/common.utils';
import styles from './search-products.module.scss';

interface Props {
  onChange: (value: string) => void;
}

const SearchProducts: FC<Props> = ({ onChange }) => {
  const [val, setVal] = useState('');
  const [showReset, setShowReset] = useState(false);
  const _onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVal(event.target.value);
    onChange(event.target.value);
    setShowReset(event.target.value.length > MIN_TERM_LENGTH);
  };

  const reset = () => {
    if (showReset) {
      onChange('');
      setVal('');
      setShowReset((prev) => !prev);
    }
  };
  return (
    <div className={classNames('input-group', styles.search_products_container)}>
      <input
        type='search'
        placeholder="What're you searching for?"
        aria-describedby='button-search'
        className={classNames('form-control', styles.search_input)}
        onChange={_onChange}
        value={val}
        maxLength={20}
      />
      <div className='input-group-append'>
        <button
          id='button-search'
          type='submit'
          className={classNames('btn btn-dark ', styles.rounded_right)}
          onClick={reset}
        >
          {!showReset && <i className='fa fa-search' aria-hidden='true' />}
          {showReset && <i className='fa fa-times' aria-hidden='true' />}
        </button>
      </div>
    </div>
  );
};

export default SearchProducts;
