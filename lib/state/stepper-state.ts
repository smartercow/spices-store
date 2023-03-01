import { atom } from 'recoil';

interface Step {
  step: 'adresse' | 'betaling' | 'bekraeft' | 'faerdig';
  active: boolean;
  completed: boolean;
}

export type CheckoutStep = {
  steps: Step[];
  stepperId?: string | null;
  deliveryType?: 'standard' | 'express' | null;
};

export const defaultCheckoutStepState: CheckoutStep = {
  steps: [],
  stepperId: null,
  deliveryType: null
};

export const CheckoutStepState = atom<CheckoutStep>({
  key: 'checkoutStepState',
  default: defaultCheckoutStepState
});
