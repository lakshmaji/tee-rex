import React, { FC, useState } from 'react';
import { MIN_TERM_LENGTH } from '../../../constants';
import './search-products.scss';

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
    <div className='input-group search_products_container'>
      <input
        type='search'
        placeholder="What're you searching for?"
        aria-describedby='button-addon5'
        className='form-control '
        onChange={_onChange}
        value={val}
        maxLength={20}
      />
      <div className='input-group-append'>
        <button id='button-addon5' type='submit' className='btn btn-dark' onClick={reset}>
          {!showReset && <i className='fa fa-search' />}
          {showReset && <i className='fa fa-times' aria-hidden='true'></i>}
        </button>
      </div>
    </div>
  );
};

export default SearchProducts;
