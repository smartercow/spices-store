import { atom } from 'recoil';

export interface cartItem {
  product: any;
  quantity: number;
  cartItemId: number;
}

export type CartState = {
  products?: number[];
  cartList: cartItem[];
};

export const defaultCartState: CartState = {
  products: [],
  cartList: []
};

export const CartState = atom<CartState>({
  key: 'cartState',
  default: defaultCartState
});
