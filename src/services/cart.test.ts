import { alertService } from './alert';
import { ICartItem } from '../state/reducer';
import { cartService, CartService } from './cart';

jest.mock('./alert');

describe('CartService', () => {
  const mockItem: ICartItem = {
    sku: '123',
    quantity: 1,
    name: 'Test Product',
    image: 'test-image-url',
    price: 100,
    currency: 'INR',
  };

  beforeEach(() => {
    cartService.reset();
    jest.clearAllMocks();
  });

  describe('getInstance', () => {
    it('should return the same instance of CartService', () => {
      const instance1 = CartService.getInstance();
      const instance2 = CartService.getInstance();

      expect(instance1).toBe(instance2);
    });
  });

  describe('addItem', () => {
    it('should add an item to the cart and send a success message', () => {
      cartService.addItem(mockItem);
      
      const items = cartService.items;
      expect(items).toEqual([mockItem]);
      expect(alertService.sendMessage).toHaveBeenCalledWith('Item Test Product added to cart', 'success');
    });

    it('should not add more items than available and send an error message', () => {
      const cartItem = { ...mockItem, quantity: 2 };
      cartService.items = [cartItem];
      
      cartService.addItem({ ...mockItem, quantity: 2 });

      expect(cartService.items).toEqual([cartItem]);
      expect(alertService.sendMessage).toHaveBeenCalledWith('You can have 2 items of this product', 'error');
    });
  });

  describe('getItem', () => {
    it('should return the correct item from the cart', () => {
      cartService.addItem(mockItem);

      const item = cartService.getItem('123');
      expect(item).toEqual(mockItem);
    });

    it('should return undefined if the item does not exist', () => {
      const item = cartService.getItem('non-existing-sku');
      expect(item).toBeUndefined();
    });
  });

  describe('decrQty', () => {
    it('should decrease the quantity of an item', () => {
      const cartItem = { ...mockItem, quantity: 2 };
      cartService.items = [cartItem];

      cartService.decrQty(cartItem.sku);

      const updatedItem = cartService.getItem(cartItem.sku);
      expect(updatedItem?.quantity).toBe(1);
    });

    it('should remove the item if quantity is 1', () => {
      cartService.addItem(mockItem);

      cartService.decrQty(mockItem.sku);

      const items = cartService.items;
      expect(items).toEqual([]);
    });
  });

  describe('removeItem', () => {
    it('should decrease quantity if the item has more than 1 quantity', () => {
      const cartItem = { ...mockItem, quantity: 2 };
      cartService.items = [cartItem];

      cartService.removeItem(cartItem.sku);

      const updatedItem = cartService.getItem(cartItem.sku);
      expect(updatedItem?.quantity).toBe(1);
    });

    it('should remove the item from the cart if the quantity is 1', () => {
      cartService.addItem(mockItem);

      cartService.removeItem(mockItem.sku);

      expect(cartService.items).toEqual([]);
      expect(alertService.sendMessage).toHaveBeenCalledWith('Item removed from cart', 'success');
    });
  });

  describe('removeLineItem', () => {
    it('should remove an item completely from the cart', () => {
      cartService.addItem(mockItem);

      cartService.removeLineItem(mockItem.sku);

      expect(cartService.items).toEqual([]);
      expect(alertService.sendMessage).toHaveBeenCalledWith('Item removed from cart', 'success');
    });
  });

  describe('items$', () => {
    it('should return an observable of the current cart items', (done) => {
      cartService.addItem(mockItem);

      cartService.items$.subscribe((items) => {
        expect(items).toEqual([mockItem]);
        done();
      });
    });
  });

  describe('reset', () => {
    it('should reset the cart to an empty array', () => {
      cartService.addItem(mockItem);
      expect(cartService.items.length).toBe(1);

      cartService.reset();
      expect(cartService.items).toEqual([]);
    });
  });
});
