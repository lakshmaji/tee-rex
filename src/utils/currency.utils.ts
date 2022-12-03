export const amountWithCurrency = (amount: number, currency: string) => {
  return Intl.NumberFormat('en-IN', { style: 'currency', currency }).format(amount);
};
