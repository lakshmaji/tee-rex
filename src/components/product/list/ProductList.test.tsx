import React, { FC } from 'react';
import { render, screen } from '@testing-library/react';
import ProductList from './ProductList';
import { IProduct } from '../../../types/product';
import { Currency, Gender } from '../../../types/common';

jest.mock('../tile/Product', () => {
  const Mock: FC<{ product: IProduct }> = ({ product }) => (
    <div data-testid='product'>{product.name}</div>
  );
  Mock.displayName = 'Product';
  return Mock;
});
jest.mock('../empty/NoProducts', () => {
  const Mock = () => <div>No products available</div>;
  Mock.displayName = 'NoProducts';
  return Mock;
});

describe('ProductList', () => {
  const mockProducts: IProduct[] = [
    {
      id: 1,
      name: 'Product 1',
      price: 100,
      imageURL: 'http://example.com/image1.jpg',
      quantity: 10,
      currency: 'INR',
      type: 'clothing',
      gender: 'Men',
      color: 'red',
    },

    {
      id: 2,
      name: 'Product 2',
      price: 200,
      imageURL: 'http://example.com/image1.jpg',
      quantity: 10,
      currency: 'INR',
      type: 'clothing',
      gender: 'Men',
      color: 'green',
    },
  ];

  it('renders NoProducts when product list is empty', () => {
    render(
      <ProductList products={[]} searchTerm='' genderFilters={{}} priceRangeFilters={[0, 500]} />,
    );
    expect(screen.getByText('No products available')).toBeInTheDocument();
  });

  it('renders correct number of Product components', () => {
    render(
      <ProductList
        products={mockProducts}
        searchTerm=''
        genderFilters={{}}
        priceRangeFilters={[0, 500]}
      />,
    );
    expect(screen.getAllByTestId('product')).toHaveLength(mockProducts.length);
  });

  it('displays filter text when no products match', () => {
    render(
      <ProductList
        products={mockProducts}
        searchTerm='non-existent'
        genderFilters={{}}
        priceRangeFilters={[0, 500]}
      />,
    );
    expect(screen.getByText('No matches for')).toBeInTheDocument();
  });

  it('shows total count of products', () => {
    render(
      <ProductList
        products={mockProducts}
        searchTerm='green'
        genderFilters={{}}
        priceRangeFilters={[0, 500]}
      />,
    );
    expect(screen.getByTestId('products-count-text')).toHaveTextContent('1 of 2');
  });

  it('updates correctly on props change', () => {
    const { rerender } = render(
      <ProductList
        products={mockProducts}
        searchTerm=''
        genderFilters={{}}
        priceRangeFilters={[0, 500]}
      />,
    );
    expect(screen.getAllByTestId('product')).toHaveLength(mockProducts.length);

    const newProducts = [
      {
        id: 3,
        name: 'Product 3',
        price: 300,
        imageURL: 'http://example.com/image1.jpg',
        quantity: 10,
        currency: 'INR' as Currency,
        type: 'clothing',
        gender: 'Men' as Gender,
        color: 'red',
      },
    ];
    rerender(
      <ProductList
        products={newProducts}
        searchTerm=''
        genderFilters={{}}
        priceRangeFilters={[0, 500]}
      />,
    );
    expect(screen.getAllByTestId('product')).toHaveLength(newProducts.length);
  });

  it('applies filters correctly', () => {
    render(
      <ProductList
        products={mockProducts}
        searchTerm='Product 1'
        genderFilters={{}}
        priceRangeFilters={[0, 500]}
      />,
    );
    expect(screen.getAllByTestId('product')).toHaveLength(1);
    expect(screen.getByText('Product 1')).toBeInTheDocument();
  });
});
