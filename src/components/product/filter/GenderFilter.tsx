import React, { FC, useEffect, useState } from 'react';

interface Props {
  onFilterGender: (gender: Record<string, boolean>) => void;
}

const GenderFilter: FC<Props> = ({ onFilterGender }) => {
  const [gender, setGender] = useState({
    male: false,
    female: false,
  });

  const applyMale = () => {
    setGender((p) => ({ ...p, male: !p.male }));
  };

  const applyFemale = () => {
    setGender((p) => ({ ...p, female: !p.female }));
  };

  useEffect(() => {
    onFilterGender(gender);
  }, [gender, onFilterGender]);

  return (
    <div className='box'>
      <div className='box-label text-capitalize d-flex align-items-center'>gender</div>
      <div id='gender' className=''>
        <div
          className='btn-group d-flex align-items-center flex-wrap pt-2'
          role='group'
          aria-label='Basic checkbox toggle button group'
        >
          <input
            type='checkbox'
            className='btn-check'
            id='btncheck1'
            autoComplete='off'
            onClick={applyFemale}
            defaultChecked={gender.female === true}
          />
          <label className='btn btn-outline-dark shadow-none' htmlFor='btncheck1'>
            <i className='fa fa-female' aria-hidden='true'></i>
          </label>
          <input
            type='checkbox'
            className='btn-check'
            id='btncheck2'
            autoComplete='off'
            onClick={applyMale}
            defaultChecked={gender.male === true}
          />
          <label className='btn btn-outline-dark rounded-0 shadow-none' htmlFor='btncheck2'>
            <i className='fa fa-male' aria-hidden='true'></i>
          </label>
        </div>
      </div>
    </div>
  );
};

export default GenderFilter;
