import { useState, useEffect, useContext, createContext, useMemo } from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import {
  LOCAL_STORAGE_CHECKOUTSTATE,
  LOCAL_STORAGE_STEPPER
} from './checkout-context';
import { useSetRecoilState } from 'recoil';
import {
  CheckoutStepState,
  defaultStepperState
} from '@lib/state/stepper-state';
import { CheckoutState, defaultCheckoutState } from '@lib/state/checkout-state';
import type { ReactNode } from 'react';
import type { User } from '@supabase/supabase-js';

type UserContext = {
  user: User | null;
  //   error: Error | null;
  //   loading: boolean;
  isAdmin: boolean;
  isDashboard: boolean;
  getStorageLoading: boolean;
};

export const UserContext = createContext<UserContext | null>(null);

type UserContextProviderProps = {
  children: ReactNode;
};

export function UserContextProvider({
  children
}: UserContextProviderProps): JSX.Element {
  const user = useUser();
  const router = useRouter();
  const setStepper = useSetRecoilState(CheckoutStepState);
  const setCheckoutState = useSetRecoilState(CheckoutState);

  const [getStorageLoading, setGetStorageLoading] = useState<boolean>(true);

  const isAdmin = user ? user.email === 'jamey@gmail.com' : false;
  const isDashboard = router.pathname === '/account';

  const value: UserContext = {
    user,
    // error,
    // loading,
    isAdmin,
    isDashboard,
    getStorageLoading
  };

  useEffect(() => {
    try {
      const storageStepper = localStorage.getItem(LOCAL_STORAGE_STEPPER);
      const storageCheckoutState = localStorage.getItem(
        LOCAL_STORAGE_CHECKOUTSTATE
      );

      if (
        storageStepper?.length === 0 ||
        storageStepper === null ||
        storageStepper === undefined
      ) {
        setStepper(defaultStepperState);

        setGetStorageLoading(false);
        return;
      }

      if (
        storageCheckoutState?.length === 0 ||
        storageCheckoutState === null ||
        storageCheckoutState === undefined
      ) {
        setCheckoutState(defaultCheckoutState);

        setGetStorageLoading(false);
        return;
      }

      // console.log('StorageContext', storageStepper);
      // console.log('StorageContext', storageCheckoutState);

      setStepper({ ...JSON.parse(storageStepper) });
      setGetStorageLoading(false);
    } catch (e) {
      setStepper({ stepperId: '', steps: [] });
      console.log('Error in storage!!!', e);
      setGetStorageLoading(false);
    }
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUserContext(): UserContext {
  const context = useContext(UserContext);

  if (!context)
    throw new Error(
      'useUserContext must be used within an UserContextProvider'
    );

  return context;
}
