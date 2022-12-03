import { Currency, Gender } from './common';

export interface IProduct {
  id: number;
  imageURL: string;
  name: string;
  type: string;
  price: number;
  currency: Currency;
  color: string;
  gender: Gender;
  quantity: number;
}

export type Attribute = keyof IProduct;
