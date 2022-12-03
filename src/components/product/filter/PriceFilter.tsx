import React, { FC, memo, useCallback, useEffect, useRef, useState } from 'react';
import { deepEqual } from '../../../utils/common.utils';

const proportional = (value: number, maxPrice: number) => (value / 100) * (maxPrice || 500);

function areEqual(prevProps: any, nextProps: any) {
  // return prevProps.masterTypeFilters.length === nextProps.masterTypeFilters.length;
  const priceChanged = deepEqual(prevProps.maxPrice, nextProps.maxPrice);
  return priceChanged;
}
interface Props {
  maxPrice: number;
  onChangePrice: (min: number, max: number) => void;
}
const PriceFilter: FC<Props> = memo(function PriceFilter({
  maxPrice: initPrice,
  onChangePrice,
}: Props) {
  const [maxPrice, setMaxPrice] = useState(0);
  useEffect(() => {
    setMaxPrice(initPrice);
  }, [initPrice]);

  const inputLeft = useRef<HTMLInputElement>(null);
  const inputRight = useRef<HTMLInputElement>(null);
  const thumbLeft = useRef<HTMLDivElement>(null);
  const thumbRight = useRef<HTMLDivElement>(null);
  const range = useRef<HTMLDivElement>(null);
  const amountLeft = useRef<HTMLSpanElement>(null);
  const amountRight = useRef<HTMLSpanElement>(null);
  const minValue = useRef<number>(0);
  const maxValue = useRef<number>(0);

  const onchange = useCallback(() => {
    onChangePrice(minValue.current, maxValue.current);
  }, [onChangePrice]);

  const setLeftValue = useCallback(() => {
    const min = parseInt(inputLeft.current?.min || '0');
    const max = parseInt(inputLeft.current?.max || '0');
    const minCap = Math.min(
      parseInt(inputLeft.current?.value || '0'),
      parseInt(inputRight.current?.value || '0') - 1,
    );

    const percent = ((minCap - min) / (max - min)) * 100;

    if (thumbLeft.current) {
      thumbLeft.current.style.left = percent + '%';
    }
    if (range.current) {
      range.current.style.left = percent + '%';
    }
    if (amountLeft.current) {
      amountLeft.current.innerText = parseInt(`${proportional(percent, maxPrice)}`).toString();
    }

    // setMinValue(proportional(percent, maxPrice));
    minValue.current = proportional(percent, maxPrice);
    onchange();
  }, [maxPrice, onchange]);

  const setRightValue = useCallback(() => {
    const min = parseInt(inputRight.current?.min || '0'); // 0
    const max = parseInt(inputRight.current?.max || '0'); // 100

    const maxCap = Math.max(
      parseInt(inputRight.current?.value || '0'), // 100
      parseInt(inputLeft.current?.value || '0') + 1, // 0
    );

    const percent = ((maxCap - min) / (max - min)) * 100;
    // ((100 - 0) / (100 - 0)) * 100 = 100

    if (thumbRight.current) {
      thumbRight.current.style.right = 100 - percent + '%';
    }
    if (range.current) {
      range.current.style.right = 100 - percent + '%';
    }
    if (amountRight.current) {
      amountRight.current.innerText = parseInt(`${proportional(percent, maxPrice)}`).toString();
    }
    // setMaxValue(proportional(percent, maxPrice));
    maxValue.current = proportional(percent, maxPrice);
    onchange();
  }, [maxPrice, onchange]);

  useEffect(() => {
    if (inputLeft?.current && inputRight?.current) {
      const leftCurrent = inputLeft.current;
      leftCurrent.addEventListener('input', setLeftValue);
      leftCurrent.addEventListener('input', setRightValue);

      return () => {
        leftCurrent.removeEventListener('input', setLeftValue);
        leftCurrent.removeEventListener('input', setRightValue);
      };
    }
  }, [setLeftValue, setRightValue]);

  const onLeftMouseover = () => {
    thumbLeft.current?.classList.add('hover');
  };
  const onLeftMouseout = () => {
    thumbLeft.current?.classList.remove('hover');
  };
  const onLeftMousedown = () => {
    thumbLeft.current?.classList.add('active');
  };
  const onLeftMouseup = () => {
    thumbLeft.current?.classList.remove('active');
  };

  useEffect(() => {
    if (inputLeft?.current && inputRight?.current) {
      const leftCurrent = inputLeft.current;
      leftCurrent.addEventListener('input', setLeftValue);

      leftCurrent.addEventListener('mouseover', onLeftMouseover);
      leftCurrent.addEventListener('mouseout', onLeftMouseout);
      leftCurrent.addEventListener('mousedown', onLeftMousedown);
      leftCurrent.addEventListener('mouseup', onLeftMouseup);

      return () => {
        leftCurrent.removeEventListener('mouseover', onLeftMouseover);
        leftCurrent.removeEventListener('mouseout', onLeftMouseout);
        leftCurrent.removeEventListener('mousedown', onLeftMousedown);
        leftCurrent.removeEventListener('mouseup', onLeftMouseup);
      };
    }
  }, [setLeftValue]);

  const onRightMouseover = () => {
    thumbRight.current?.classList.add('hover');
  };
  const onRightMouseout = () => {
    thumbRight.current?.classList.remove('hover');
  };
  const onRightMousedown = () => {
    thumbRight.current?.classList.add('active');
  };
  const onRightMouseup = () => {
    thumbRight.current?.classList.remove('active');
  };

  useEffect(() => {
    if (inputRight?.current && inputRight?.current) {
      const rightCurrent = inputRight.current;
      rightCurrent.addEventListener('input', setRightValue);

      rightCurrent.addEventListener('mouseover', onRightMouseover);
      rightCurrent.addEventListener('mouseout', onRightMouseout);
      rightCurrent.addEventListener('mousedown', onRightMousedown);
      rightCurrent.addEventListener('mouseup', onRightMouseup);

      return () => {
        rightCurrent.removeEventListener('mouseover', onRightMouseover);
        rightCurrent.removeEventListener('mouseout', onRightMouseout);
        rightCurrent.removeEventListener('mousedown', onRightMousedown);
        rightCurrent.removeEventListener('mouseup', onRightMouseup);
      };
    }
  }, [setRightValue]);

  useEffect(() => {
    setLeftValue();
    setRightValue();
  }, [setLeftValue, setRightValue]);

  return (
    <div className='box border-bottom'>
      <div className='box-label text-capitalize d-flex align-items-center'>price</div>
      <div className='' id='price'>
        <div className='middle'>
          <div className='multi-range-slider'>
            <input
              ref={inputLeft}
              type='range'
              id='input-left'
              min={0}
              max={100}
              defaultValue={0}
            />
            <input
              ref={inputRight}
              type='range'
              id='input-right'
              min={0}
              max={100}
              defaultValue={100}
            />
            <div className='slider'>
              <div className='track' /> <div ref={range} className='range' />
              <div ref={thumbLeft} className='thumb left' />{' '}
              <div ref={thumbRight} className='thumb right' />
            </div>
          </div>
        </div>
        <div className='d-flex align-items-center justify-content-between mt-2 price-range-values'>
          <div>
            <i className='fa fa-inr' aria-hidden='true'></i>
            <span id='amount-left' ref={amountLeft} className='font-weight-bold' />
            {/* TODO: this has to be from global currency config */}
          </div>
          <div>
            <i className='fa fa-inr' aria-hidden='true'></i>
            <span id='amount-right' ref={amountRight} className='font-weight-bold' />
          </div>
        </div>
      </div>
    </div>
  );
},
areEqual);

export default PriceFilter;
