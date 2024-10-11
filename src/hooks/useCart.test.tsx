import { useCart } from './useCart';
import { cartService } from '../services/cart';
import { act, renderHook } from '@testing-library/react';
import { Currency, Gender } from '../types/common';

jest.mock('../services/cart');

describe('useCart Hook', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should add item to the cart when addItem is called', () => {
    const mockProduct = {
      id: 1,
      name: 'Shirt',
      quantity: 2,
      price: 100,
      currency: 'INR' as Currency,
      imageURL: 'sample-image-url',
      type: 'cotton',
      color: 'green',
      gender: 'Men' as Gender,
    };

    const addItemMock = jest.fn();
    cartService.addItem = addItemMock;

    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addItem(mockProduct);
    });

    expect(addItemMock).toHaveBeenCalledWith({
      sku: mockProduct.id.toString(),
      quantity: mockProduct.quantity,
      image: mockProduct.imageURL,
      name: mockProduct.name,
      price: mockProduct.price,
      currency: mockProduct.currency,
    });
  });

  it('should delete item from the cart when deleteItem is called', () => {
    const mockSku = '12345';

    const removeItemMock = jest.fn();
    cartService.removeItem = removeItemMock;

    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.deleteItem(mockSku);
    });

    expect(removeItemMock).toHaveBeenCalledWith(mockSku);
  });

  it('should memoize the addItem and deleteItem callbacks', () => {
    const { result, rerender } = renderHook(() => useCart());

    const initialAddItem = result.current.addItem;
    const initialDeleteItem = result.current.deleteItem;

    rerender();

    expect(result.current.addItem).toBe(initialAddItem);
    expect(result.current.deleteItem).toBe(initialDeleteItem);
  });
});
