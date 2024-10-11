import React from 'react';
import { render, screen } from '@testing-library/react';
import Currency, { formatCurrency } from './Currency';

describe('formatCurrency', () => {
  it('should format a number as Indian Rupees', () => {
    const result = formatCurrency(1000, 'INR');
    expect(result).toBe('₹1,000.00');
  });

  it('should format a decimal number as Indian Rupees', () => {
    const result = formatCurrency(1234.56, 'INR');
    expect(result).toBe('₹1,234.56');
  });

  it('should format zero as Indian Rupees', () => {
    const result = formatCurrency(0, 'INR');
    expect(result).toBe('₹0.00');
  });

  it('should handle negative numbers', () => {
    const result = formatCurrency(-500, 'INR');
    expect(result).toBe('-₹500.00');
  });
});

describe('Currency Component', () => {
  it('should render correctly for positive amount', () => {
    render(<Currency amount={1000} />);
    expect(screen.getByText('₹1,000.00')).toBeInTheDocument();
  });

  it('should render correctly for decimal amount', () => {
    render(<Currency amount={1234.56} />);
    expect(screen.getByText('₹1,234.56')).toBeInTheDocument();
  });

  it('should render correctly for zero amount', () => {
    render(<Currency amount={0} />);
    expect(screen.getByText('₹0.00')).toBeInTheDocument();
  });

  it('should render correctly for negative amount', () => {
    render(<Currency amount={-500} />);
    expect(screen.getByText('-₹500.00')).toBeInTheDocument();
  });
});
