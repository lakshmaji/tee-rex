export type Currency = 'INR';
export type Gender = 'Men' | 'Women';
export interface IFooterLink {
  link: string;
  name: string;
  icon: string;
}

export interface ICheckItem {
  value: string;
  selected: boolean;
}

export interface IAlert {
  message: string;
  type: 'error' | 'success';
}