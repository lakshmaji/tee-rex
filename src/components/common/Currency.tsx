import React, { FC } from 'react';

export const formatCurrency = (price: number, currency: string) => {
  return Intl.NumberFormat('en-IN', { style: 'currency', currency }).format(price);
};

interface Props {
  amount: number;
}
const Currency: FC<Props> = ({ amount }) => {
  return <>{formatCurrency(amount, 'INR')}</>;
};

export default Currency;
