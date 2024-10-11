import React from 'react';
import { render, screen } from '@testing-library/react';
import Product from './Product';
import { Currency, Gender } from '../../../types/common';

const mockProduct = {
  id: 3,
  name: 'Product 3',
  price: 300,
  imageURL: 'http://example.com/image1.jpg',
  quantity: 10,
  currency: 'INR' as Currency,
  type: 'clothing',
  gender: 'Men' as Gender,
  color: 'red',
};

describe('Product', () => {
  beforeEach(() => {
    render(<Product product={mockProduct} />);
  });

  it('should display name', () => {
    expect(screen.getByText(/Product 3/)).toBeDefined();
  });

  it('should display color', () => {
    expect(screen.getByText(/red/)).toBeDefined();
  });

  it('should display price', () => {
    expect(screen.getByText('₹300.00')).toBeDefined();
  });

  it('should display quantity', () => {
    expect(screen.getByText('10 left')).toBeDefined();
  });
});
