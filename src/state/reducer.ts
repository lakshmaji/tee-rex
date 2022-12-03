import { Currency } from '../types/common';
import { IProduct } from '../types/product';

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

export interface AddItemAction extends Omit<IProduct, 'id' | 'gender' | 'imageURL'> {
  sku: string;
  image: string;
}

export interface RemoveItemAction {
  sku: string;
  quantity: number;
}
export interface RemoveLineItemAction {
  sku: string;
}

type ActionType = RemoveLineItemAction | RemoveItemAction | AddItemAction;
export interface Action<T extends ActionType> {
  type: CartAction;
  payload: T;
}

const addItemReducer = (state: State, action: Action<AddItemAction>) => {
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

const removeItemReducer = (state: State, action: Action<RemoveItemAction>) => {
  return state.items.reduce<ICartItem[]>((acc, item) => {
    if (item.sku === action.payload.sku) {
      const newQuantity = item.quantity - action.payload.quantity;

      return newQuantity > 0 ? [...acc, { ...item, quantity: newQuantity }] : [...acc];
    }
    return [...acc, item];
  }, []);
};

const removeLineItemReducer = (state: State, action: Action<RemoveLineItemAction>) => {
  return state.items.filter((item) => item.sku !== action.payload.sku);
};

export const reducer = (state: State, action: Action<ActionType>) => {
  switch (action.type) {
    case CartAction.ADD_ITEM:
      return { ...state, items: addItemReducer(state, action as Action<AddItemAction>) };
    case CartAction.REMOVE_ITEM:
      return { ...state, items: removeItemReducer(state, action as Action<RemoveItemAction>) };
    case CartAction.REMOVE_LINE_ITEM:
      return {
        ...state,
        items: removeLineItemReducer(state, action as Action<RemoveLineItemAction>),
      };
    case CartAction.CLEAR_CART:
      return { ...state, items: [] };
  }
};
