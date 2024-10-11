import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useCart } from '../../../hooks/useCart';
import CartItem from './CartItem';
import { ICartItem } from '../../../state/reducer';

jest.mock('../../../hooks/useCart');

describe('CartItem Component', () => {
  const mockDeleteItem = jest.fn();

  beforeEach(() => {
    (useCart as jest.Mock).mockReturnValue({
      deleteItem: mockDeleteItem,
    });
  });

  const item: ICartItem = {
    sku: '12345',
    image: 'test-image-url',
    name: 'Test Item',
    price: 100,
    quantity: 2,
    currency: 'INR',
  };

  it('renders the cart item details correctly', () => {
    render(<CartItem item={item} />);
    const imageElement = screen.getByAltText(item.name);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', item.image);

    expect(screen.getByText(item.name)).toBeInTheDocument();
    expect(screen.getByText(/100/)).toBeInTheDocument();
    expect(screen.getByText(2)).toBeInTheDocument();
  });

  it('calls deleteItem when the delete button is clicked', () => {
    render(<CartItem item={item} />);

    const deleteButton = screen.getByRole('button');
    fireEvent.click(deleteButton);

    expect(mockDeleteItem).toHaveBeenCalledWith(item.sku);
  });
});
