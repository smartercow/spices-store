import { atom } from 'recoil';

interface CheckoutState {
  deliveryType: 'standard' | 'express';
}

const defaultCheckoutState: CheckoutState = {
  deliveryType: 'standard'
};

export const CheckoutState = atom<CheckoutState>({
  key: 'checkoutState',
  default: defaultCheckoutState
});
