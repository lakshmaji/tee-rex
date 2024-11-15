import {
  Action,
  AddItemAction,
  CartAction,
  ICartItem,
  reducer,
  RemoveItemAction,
  RemoveLineItemAction,
} from '../state/reducer';
import { BehaviorSubject, Observable } from 'rxjs';

import { alertService } from './alert';

export class CartService {
  private _search = new BehaviorSubject<ICartItem[]>([]);

  private static instance: CartService;

  public static getInstance(): CartService {
    if (!CartService.instance) {
      CartService.instance = new CartService();
    }

    return CartService.instance;
  }

  get items$(): Observable<ICartItem[]> {
    return this._search.asObservable();
  }

  set items(value: ICartItem[]) {
    this._search.next(value);
  }

  get items() {
    return this._search.value;
  }

  reset() {
    this._search.next([]);
  }

  addItem(value: ICartItem) {
    const cartItem = this.getItem(value.sku);
    if (cartItem) {
      if (cartItem.quantity >= value.quantity) {
        alertService.sendMessage(`You can have ${value.quantity} items of this product`, 'error');
        return;
      }
    }
    const action = {
      type: CartAction.ADD_ITEM,
      payload: {
        sku: value.sku,
        quantity: 1,
        name: value.name,
        image: value.image,
        price: value.price,
        currency: value.currency,
      },
    } as Action<AddItemAction>;
    const newState = reducer({ items: this.items }, action);
    this._search.next(newState.items);
    alertService.sendMessage(`Item ${value.name} added to cart`, 'success');
  }

  getItem(sku: string) {
    return this.items.find((item) => item.sku === sku);
  }

  decrQty(sku: string) {
    const action = {
      type: CartAction.REMOVE_ITEM,
      payload: { sku, quantity: 1 },
    } as Action<RemoveItemAction>;

    const newState = reducer({ items: this.items }, action);

    this._search.next(newState.items);
  }

  removeItem(sku: string) {
    const cartItem = this.getItem(sku);
    if (cartItem) {
      if (cartItem.quantity === 1) {
        // Remove from cart
        this.removeLineItem(sku);
      } else {
        // Decrease Quantity
        this.decrQty(sku);
      }
    }
  }

  removeLineItem(sku: string) {
    const action = {
      type: CartAction.REMOVE_LINE_ITEM,
      payload: { sku },
    } as Action<RemoveLineItemAction>;

    const newState = reducer({ items: this.items }, action);

    this._search.next(newState.items);
    alertService.sendMessage(`Item removed from cart`, 'success');
  }
}
export const cartService = CartService.getInstance();
