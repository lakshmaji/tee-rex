import React, { FC, memo, useCallback, useEffect, useRef, useState } from 'react';
import { classNames, deepEqual } from '../../../../utils/common.utils';
import styles from './price.module.scss';

const proportional = (value: number, maxPrice: number) => (value / 100) * (maxPrice || 500);

function canReRender(prevProps: Props, nextProps: Props) {
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

    if (thumbRight.current) {
      thumbRight.current.style.right = 100 - percent + '%';
    }
    if (range.current) {
      range.current.style.right = 100 - percent + '%';
    }
    if (amountRight.current) {
      amountRight.current.innerText = parseInt(`${proportional(percent, maxPrice)}`).toString();
    }
    maxValue.current = proportional(percent, maxPrice);
    onchange();
  }, [maxPrice, onchange]);

  const onLeftMouseover = () => {
    thumbLeft.current?.classList.add(styles.hover);
  };
  const onLeftMouseout = () => {
    thumbLeft.current?.classList.remove(styles.hover);
  };
  const onLeftMousedown = () => {
    thumbLeft.current?.classList.add(styles.active);
  };
  const onLeftMouseup = () => {
    thumbLeft.current?.classList.remove(styles.active);
  };

  const onRightMouseover = () => {
    thumbRight.current?.classList.add(styles.hover);
  };
  const onRightMouseout = () => {
    thumbRight.current?.classList.remove(styles.hover);
  };
  const onRightMousedown = () => {
    thumbRight.current?.classList.add(styles.active);
  };
  const onRightMouseup = () => {
    thumbRight.current?.classList.remove(styles.active);
  };

  useEffect(() => {
    if (inputLeft?.current && inputRight?.current) {
      setLeftValue();
      setRightValue();
    }
  }, [setLeftValue, setRightValue]);

  return (
    <div className={styles.price}>
      <div className={styles.middle}>
        <div className='multi-range-slider'>
          <input
            ref={inputLeft}
            type='range'
            id='input-left'
            min={0}
            max={100}
            defaultValue={0}
            onInput={setLeftValue}
            onMouseOver={onLeftMouseover}
            onMouseOut={onLeftMouseout}
            onMouseDown={onLeftMousedown}
            onMouseUp={onLeftMouseup}
            onFocus={() => void 0}
            onBlur={() => void 0}
            className={styles.thumb_input}
          />
          <input
            ref={inputRight}
            type='range'
            id='input-right'
            min={0}
            max={100}
            defaultValue={100}
            onInput={setRightValue}
            onMouseOver={onRightMouseover}
            onMouseOut={onRightMouseout}
            onMouseDown={onRightMousedown}
            onMouseUp={onRightMouseup}
            onFocus={() => void 0}
            onBlur={() => void 0}
            className={styles.thumb_input}
          />
          <div className={styles.slider}>
            <div className={styles.track} /> <div ref={range} className={styles.range} />
            <div ref={thumbLeft} className={classNames(styles.thumb, styles.left)} />{' '}
            <div ref={thumbRight} className={classNames(styles.thumb, styles.right)} />
          </div>
        </div>
      </div>
      <div
        className={classNames(
          'd-flex align-items-center justify-content-between mt-2 ',
          styles.price_range_values,
        )}
      >
        <div>
          <i className='fa fa-inr' aria-hidden='true'></i>
          <span ref={amountLeft} className='font-weight-bold' />
        </div>
        <div>
          <i className='fa fa-inr' aria-hidden='true'></i>
          <span ref={amountRight} className='font-weight-bold' />
        </div>
      </div>
    </div>
  );
},
canReRender);

export default PriceFilter;
