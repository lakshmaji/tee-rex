import { Currency } from '../types/common';

export interface ICartItem {
  sku: string;
  quantity: number;
  image: string;
  name: string;
  price: number;
  currency: Currency;
}
export interface State {
  items: ICartItem[];
}

export enum CartAction {
  ADD_ITEM = 'ADD_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
  REMOVE_LINE_ITEM = 'REMOVE_LINE_ITEM',
  CLEAR_CART = 'CLEAR_CART',
}
export interface Action {
  type: CartAction;
  payload?: any;
}

const addItemReducer = (state: State, action: Action) => {
  const existingItemIndex = state.items.findIndex((item) => item.sku === action.payload.sku);

  if (existingItemIndex > -1) {
    return state.items.map((item) => {
      if (item.sku === action.payload.sku) {
        return { ...item, quantity: item.quantity + action.payload.quantity };
      }
      return item;
    });
  }
  return [...state.items, action.payload];
};

const removeItemReducer = (state: State, action: Action) => {
  return state.items.reduce<ICartItem[]>((acc, item) => {
    if (item.sku === action.payload.sku) {
      const newQuantity = item.quantity - action.payload.quantity;

      return newQuantity > 0 ? [...acc, { ...item, quantity: newQuantity }] : [...acc];
    }
    return [...acc, item];
  }, []);
};

const removeLineItemReducer = (state: State, action: Action) => {
  return state.items.filter((item) => item.sku !== action.payload.sku);
};

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case CartAction.ADD_ITEM:
      return { ...state, items: addItemReducer(state, action) };
    case CartAction.REMOVE_ITEM:
      return { ...state, items: removeItemReducer(state, action) };
    case CartAction.REMOVE_LINE_ITEM:
      return { ...state, items: removeLineItemReducer(state, action) };
    case CartAction.CLEAR_CART:
      return { ...state, items: [] };
  }
};
