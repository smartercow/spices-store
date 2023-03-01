import { atom } from 'recoil';

export interface cartItem {
  product: any;
  quantity: number;
  cartItemId: number;
}

export type CartState = {
  cartList: cartItem[];
};

export const defaultCartState: CartState = {
  cartList: []
};

export const CartState = atom<CartState>({
  key: 'cartState',
  default: defaultCartState
});
