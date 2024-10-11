import { reducer, CartAction, ICartItem } from './reducer';

describe('Cart Reducer', () => {
  let initialState: { items: ICartItem[] };

  beforeEach(() => {
    initialState = { items: [] };
  });

  it('should add a new item to the cart', () => {
    const action = {
      type: CartAction.ADD_ITEM,
      payload: {
        sku: 'sku1',
        name: 'Test Product',
        price: 100,
        quantity: 1,
        image: 'image-url',
        currency: 'INR',
      },
    };

    const newState = reducer(initialState, action);

    expect(newState.items.length).toBe(1);
    expect(newState.items[0]).toEqual(action.payload);
  });

  it('should increase the quantity of an existing item', () => {
    initialState.items = [
      {
        sku: 'sku1',
        name: 'Test Product',
        price: 100,
        quantity: 1,
        image: 'image-url',
        currency: 'INR',
      },
    ];

    const action = {
      type: CartAction.ADD_ITEM,
      payload: {
        sku: 'sku1',
        name: 'Test Product',
        price: 100,
        quantity: 2,
        image: 'image-url',
        currency: 'INR',
      },
    };

    const newState = reducer(initialState, action);

    expect(newState.items.length).toBe(1);
    expect(newState.items[0].quantity).toBe(3);
  });

  it('should remove the specified quantity of an item', () => {
    initialState.items = [
      {
        sku: 'sku1',
        name: 'Test Product',
        price: 100,
        quantity: 5,
        image: 'image-url',
        currency: 'INR',
      },
    ];

    const action = {
      type: CartAction.REMOVE_ITEM,
      payload: {
        sku: 'sku1',
        quantity: 2,
      },
    };

    const newState = reducer(initialState, action);

    expect(newState.items.length).toBe(1);
    expect(newState.items[0].quantity).toBe(3);
  });

  it('should remove the item if quantity drops to 0', () => {
    initialState.items = [
      {
        sku: 'sku1',
        name: 'Test Product',
        price: 100,
        quantity: 2,
        image: 'image-url',
        currency: 'INR',
      },
    ];

    const action = {
      type: CartAction.REMOVE_ITEM,
      payload: {
        sku: 'sku1',
        quantity: 2,
      },
    };

    const newState = reducer(initialState, action);

    expect(newState.items.length).toBe(0);
  });

  it('should remove a line item from the cart', () => {
    initialState.items = [
      {
        sku: 'sku1',
        name: 'Test Product',
        price: 100,
        quantity: 1,
        image: 'image-url',
        currency: 'INR',
      },
      {
        sku: 'sku2',
        name: 'Another Product',
        price: 200,
        quantity: 1,
        image: 'image-url',
        currency: 'INR',
      },
    ];

    const action = {
      type: CartAction.REMOVE_LINE_ITEM,
      payload: {
        sku: 'sku1',
      },
    };

    const newState = reducer(initialState, action);

    expect(newState.items.length).toBe(1);
    expect(newState.items[0].sku).toBe('sku2');
  });

  it('should clear the cart', () => {
    initialState.items = [
      {
        sku: 'sku1',
        name: 'Test Product',
        price: 100,
        quantity: 1,
        image: 'image-url',
        currency: 'INR',
      },
    ];

    const action = {
      type: CartAction.CLEAR_CART,
      payload: { sku: 'sku1', quantity: 1 },
    };

    const newState = reducer(initialState, action);

    expect(newState.items.length).toBe(0);
  });
  it('should not remove a line item from the cart for invalid sku', () => {
    initialState.items = [
      {
        sku: 'sku1',
        name: 'Test Product',
        price: 100,
        quantity: 3,
        image: 'image-url',
        currency: 'INR',
      },
    ];

    const action = {
      type: CartAction.REMOVE_ITEM,
      payload: { sku: 'sku2', quantity: 1 },
    };

    const newState = reducer(initialState, action);
    expect(newState.items[0]).toHaveProperty('quantity', 3);
  });
});
