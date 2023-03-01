import { atom } from 'recoil';

interface CheckoutState {
  orderNumber?: number;
  checkoutDone?: boolean;
  deliveryType?: 'standard' | 'express';
  currentCheckoutId?: string | null;
}

export const defaultCheckoutState: CheckoutState = {
  orderNumber: 0,
  checkoutDone: false,
  deliveryType: 'standard',
  currentCheckoutId: null
};

export const CheckoutState = atom<CheckoutState>({
  key: 'checkoutState',
  default: defaultCheckoutState
});
