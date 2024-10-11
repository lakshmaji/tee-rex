import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { BehaviorSubject } from 'rxjs';
import { MemoryRouter } from 'react-router-dom';
import Cart from './Cart';
import { cartService } from '../../services/cart';
import { ICartItem } from '../../state/reducer';

jest.mock('../../services/cart');
jest.mock('../../components/cart/item/CartItem', () => {
  const MockCartItem = () => <div>Mocked CartItem</div>;
  MockCartItem.displayName = 'CartItem';
  return MockCartItem;
});
jest.mock('../../components/cart/empty/EmptyCart', () => {
  const MockEmptyCart = () => <div>Mocked EmptyCart</div>;
  MockEmptyCart.displayName = 'EmptyCart';
  return MockEmptyCart;
});
jest.mock('../../components/common/Currency', () => {
  const MockCurrency = ({ amount }: { amount: number }) => <div>{amount}</div>;
  MockCurrency.displayName = 'Currency';
  return MockCurrency;
});
describe('Cart Component', () => {
  const mockCartItems: ICartItem[] = [
    {
      sku: '123',
      quantity: 2,
      name: 'Test Product',
      image: 'test-image-url',
      price: 100,
      currency: 'INR',
    },
    {
      sku: '456',
      quantity: 1,
      name: 'Another Product',
      image: 'another-image-url',
      price: 200,
      currency: 'INR',
    },
  ];

  const mockCartSubject = new BehaviorSubject<ICartItem[]>([]);

  beforeEach(() => {
    (cartService as any).items$ = mockCartSubject.asObservable();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should display empty cart message when no items are in the cart', () => {
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>,
    );

    expect(screen.getByText('Mocked EmptyCart')).toBeInTheDocument();
    expect(screen.queryByText('Total')).not.toBeInTheDocument();
  });

  it('should display cart items and calculate total', () => {
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>,
    );

    act(() => {
      mockCartSubject.next(mockCartItems);
    });

    expect(screen.getAllByText('Mocked CartItem')).toHaveLength(mockCartItems.length);

    const expectedTotal = mockCartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0,
    );
    expect(screen.getByText(expectedTotal)).toBeInTheDocument();
  });

  it('should display correct total after cart updates', () => {
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>,
    );

    act(() => {
      mockCartSubject.next(mockCartItems);
    });

    const initialTotal = mockCartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0,
    );
    expect(screen.getByText(initialTotal)).toBeInTheDocument();

    const updatedItems: ICartItem[] = [
      {
        sku: '123',
        quantity: 3,
        name: 'Test Product',
        image: 'test-image-url',
        price: 100,
        currency: 'INR',
      },
    ];

    act(() => {
      mockCartSubject.next(updatedItems);
    });

    const updatedTotal = updatedItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0,
    );
    expect(screen.getByText(updatedTotal)).toBeInTheDocument();
  });

  it('should unsubscribe from cartService when unmounting', () => {
    const unsubscribeMock = jest.fn();

    const mockSubscription = { unsubscribe: unsubscribeMock };

    const subscribeSpy = jest
      .spyOn(mockCartSubject, 'subscribe')
      .mockReturnValue(mockSubscription as any);

    const { unmount } = render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>,
    );

    unmount();

    expect(unsubscribeMock).toHaveBeenCalled();

    subscribeSpy.mockRestore();
  });
});
