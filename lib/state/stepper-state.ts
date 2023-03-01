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

export type StepperId = Pick<CheckoutStep, 'stepperId'>;

export const defaultStepperState: CheckoutStep = {
  steps: [],
  stepperId: null,
  deliveryType: null
};

export const CheckoutStepState = atom<CheckoutStep>({
  key: 'checkoutStepState',
  default: defaultStepperState
});
