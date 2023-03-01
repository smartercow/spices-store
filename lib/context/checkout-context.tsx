import { useState, useEffect, useContext, createContext, useMemo } from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { type CheckoutStep, CheckoutStepState } from '@lib/state/stepper-state';
import type { ReactNode } from 'react';
import type { User } from '@supabase/supabase-js';
import { useUserContext } from '@lib/context/user-context';

export const LOCAL_STORAGE_STEPPER = 'stepper';

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
  const router = useRouter();
  const { getStorageLoading } = useUserContext();

  const [stepper, setStepper] = useRecoilState(CheckoutStepState);

  useEffect(() => {
    if (getStorageLoading) return;
    localStorage.setItem(LOCAL_STORAGE_STEPPER, JSON.stringify(stepper));
  }, [stepper]);

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
