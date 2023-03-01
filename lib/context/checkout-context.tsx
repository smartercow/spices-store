import { useState, useEffect, useContext, createContext, useMemo } from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { type CheckoutStep, CheckoutStepState } from '@lib/state/stepper-state';
import type { ReactNode } from 'react';
import type { User } from '@supabase/supabase-js';
import { useUserContext } from '@lib/context/user-context';
import { CheckoutState } from '@lib/state/checkout-state';
import { CartState } from '@lib/state/cart';

export const LOCAL_STORAGE_STEPPER = 'stepper';
export const LOCAL_STORAGE_CHECKOUTSTATE = 'checkoutState';
export const LOCAL_PRODUCTS_BACKEND = 'productsBackend';

type CheckoutContext = {
  user: User | null;
  stepper: CheckoutStep;
  //   error: Error | null;
  //   loading: boolean;
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

  const [stepper, setStepper] = useRecoilState(CheckoutStepState);
  const [checkoutState, setCheckoutState] = useRecoilState(CheckoutState);
  const [cart, setCart] = useRecoilState(CartState);

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

  const value: CheckoutContext = {
    user,
    stepper
    // error,
    // loading,
  };

  // console.log('stepState', stepper);

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
