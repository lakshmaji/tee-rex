import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useCart } from '../../hooks/useCart';
import { cartService } from '../../services/cart';
import ProductCartButton from './ProductCartButton';
import { IProduct } from '../../types/product';
import { ICartItem } from '../../state/reducer';
import { BehaviorSubject } from 'rxjs';

jest.mock('../../hooks/useCart');

const mockAddItem = jest.fn();

const mockRemoveItem = jest.fn();

const mockProduct: IProduct = {
  id: 1,
  name: 'Test Product',
  price: 100,
  imageURL: 'http://im.g/image1.png',
  quantity: 10,
  currency: 'INR',
  type: 'clothing',
  gender: 'Men',
  color: 'red',
};

const cartItemsSubject = new BehaviorSubject<ICartItem[]>([]);

describe('ProductCartButton', () => {
  beforeEach(() => {
    jest.spyOn(cartService, 'items$', 'get').mockReturnValue(cartItemsSubject.asObservable());

    (useCart as jest.Mock).mockReturnValue({
      addItem: mockAddItem,
      deleteItem: mockRemoveItem,
    });
  });

  afterEach(() => {
    jest.spyOn(cartService, 'items$', 'get').mockRestore();
  });

  it('renders "Add to Cart" button when product is not in cart', async () => {
    cartItemsSubject.next([]);

    render(<ProductCartButton product={mockProduct} />);

    expect(screen.getByText('Add to Cart')).toBeInTheDocument();
  });

  it('renders quantity when product is in cart', async () => {
    const cartItem: ICartItem = {
      sku: '1',
      quantity: 2,
      image: 'https://im.g/1.png',
      name: 'T-Shirt',
      price: 30,
      currency: 'INR',
    };

    cartItemsSubject.next([cartItem]);

    render(<ProductCartButton product={mockProduct} />);

    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('renders both plus and minus buttons when product is in cart', async () => {
    const cartItem: ICartItem = {
      sku: '1',
      quantity: 2,
      image: 'https://im.g/1.png',
      name: 'T-Shirt',
      price: 30,
      currency: 'INR',
    };

    cartItemsSubject.next([cartItem]);

    render(<ProductCartButton product={mockProduct} />);

    const btnElements = screen.getAllByRole('button');
    expect(btnElements).toHaveLength(2);
    const [minusBtn, plusBtn] = btnElements;
    expect(minusBtn).toBeVisible();
    expect(plusBtn).toBeVisible();
  });

  it('calls addItem when "Add to Cart" button is clicked', async () => {
    cartItemsSubject.next([]);

    render(<ProductCartButton product={mockProduct} />);

    fireEvent.click(screen.getByText('Add to Cart'));
    expect(mockAddItem).toHaveBeenCalledWith(mockProduct);
  });

  it('calls removeItem when minus button is clicked', async () => {
    const cartItem: ICartItem = {
      sku: '1',
      quantity: 6,
      image: 'https://im.g/1.png',
      name: 'T-Shirt',
      price: 30,
      currency: 'INR',
    };
    cartItemsSubject.next([cartItem]);

    render(<ProductCartButton product={mockProduct} />);
    const [minusBtn] = screen.getAllByRole('button');
    fireEvent.click(minusBtn);

    expect(mockRemoveItem).toHaveBeenCalledWith(mockProduct.id.toString());
  });

  it('calls addItem when plus button is clicked', async () => {
    const cartItem: ICartItem = {
      sku: '1',
      quantity: 6,
      image: 'https://im.g/1.png',
      name: 'T-Shirt',
      price: 30,
      currency: 'INR',
    };
    cartItemsSubject.next([cartItem]);

    render(<ProductCartButton product={mockProduct} />);
    const [, plusBtn] = screen.getAllByRole('button');

    fireEvent.click(plusBtn);
    expect(mockAddItem).toHaveBeenCalledWith(mockProduct);
  });
});
