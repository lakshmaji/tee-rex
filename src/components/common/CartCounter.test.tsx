import React from 'react';
import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import CartCounter from './CartCounter';
import { cartService } from '../../services/cart';
import { ICartItem } from '../../state/reducer';
import { Currency } from '../../types/common';

jest.mock('../../services/cart', () => ({
  cartService: {
    items$: {
      subscribe: jest.fn(),
    },
  },
}));

describe('CartCounter Component', () => {
  let itemsSubscriber: (items: ICartItem[]) => void;
  beforeEach(() => {
    (cartService.items$.subscribe as jest.Mock).mockImplementation((callback) => {
      itemsSubscriber = callback;
      return { unsubscribe: jest.fn() };
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('count', () => {
    beforeEach(() => {
      render(
        <MemoryRouter initialEntries={['/cart']}>
          <CartCounter />
        </MemoryRouter>,
      );
    });
    it('should render the cart counter with initial count of 0', () => {
      const cartCounterButton = screen.getByRole('link');
      const badge = screen.getByText('0');

      expect(cartCounterButton).toBeInTheDocument();
      expect(badge).toBeInTheDocument();
    });

    it('should update the cart item count when items change', async () => {
      const items = [
        {
          quantity: 2,
          sku: '11223',
          image: '',
          name: 'Piper',
          price: 150,
          currency: 'INR' as Currency,
        },
        {
          quantity: 3,
          sku: '11221',
          image: '',
          name: 'Bilby',
          price: 100,
          currency: 'INR' as Currency,
        },
      ];
      act(() => {
        itemsSubscriber(items);
      });
      const badge = screen.getByText('5');
      expect(badge).toBeInTheDocument();
    });
  });
  describe('styles', () => {
    it('should handle the active link class correctly', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <CartCounter />
        </MemoryRouter>,
      );

      const cartCounterButton = screen.getByRole('link');

      expect(cartCounterButton).toHaveClass('btn-light btn-outline-dark');
    });

    it('should handle the active link class correctly', () => {
      render(
        <MemoryRouter initialEntries={['/cart']}>
          <CartCounter />
        </MemoryRouter>,
      );

      const cartCounterButton = screen.getByRole('link');

      expect(cartCounterButton).toHaveClass('btn position-relative btn-dark');
    });
  });
});
