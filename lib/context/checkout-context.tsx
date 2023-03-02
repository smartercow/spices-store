import { useEffect, useContext, createContext } from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import { useRecoilValue } from 'recoil';
import { type CheckoutStep, CheckoutStepState } from '@lib/state/stepper-state';
import { useUserContext } from '@lib/context/user-context';
import { CheckoutState } from '@lib/state/checkout-state';
import { CookiesState } from '@lib/state/cookies-state';
import type { ReactNode } from 'react';
import type { User } from '@supabase/supabase-js';

export const LOCAL_STORAGE_STEPPER = 'stepper';
export const LOCAL_STORAGE_CHECKOUTSTATE = 'checkoutState';
export const LOCAL_STORAGE_COOKIES = 'cookies';

type CheckoutContext = {
  user: User | null;
  stepper: CheckoutStep;
};

export const CheckoutContext = createContext<CheckoutContext | null>(null);

type CheckoutContextProviderProps = {
  children: ReactNode;
};

export function CheckoutContextProvider({
  children
}: CheckoutContextProviderProps): JSX.Element {
  const user = useUser();
  const { getStorageLoading } = useUserContext();

  const stepper = useRecoilValue(CheckoutStepState);
  const checkoutState = useRecoilValue(CheckoutState);
  const cookies = useRecoilValue(CookiesState);

  useEffect(() => {
    if (getStorageLoading) return;
    localStorage.setItem(LOCAL_STORAGE_STEPPER, JSON.stringify(stepper));
  }, [stepper]);

  useEffect(() => {
    if (getStorageLoading) return;
    localStorage.setItem(
      LOCAL_STORAGE_CHECKOUTSTATE,
      JSON.stringify(checkoutState)
    );
  }, [checkoutState]);

  useEffect(() => {
    if (getStorageLoading) return;
    localStorage.setItem(LOCAL_STORAGE_COOKIES, JSON.stringify(cookies));
  }, [cookies]);

  const value: CheckoutContext = {
    user,
    stepper
  };

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout(): CheckoutContext {
  const context = useContext(CheckoutContext);

  if (!context)
    throw new Error(
      'useCheckout must be used within an CheckoutContextProvider'
    );

  return context;
}
