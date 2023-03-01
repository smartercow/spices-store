import { useState, useEffect, useContext, createContext, useMemo } from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import type { ReactNode } from 'react';
import type { User } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { LOCAL_STORAGE_STEPPER } from './checkout-context';
import { useSetRecoilState } from 'recoil';
import {
  CheckoutStepState,
  defaultCheckoutStepState
} from '@lib/state/stepper-state';

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
      const storage = localStorage.getItem(LOCAL_STORAGE_STEPPER);

      if (storage?.length === 0 || storage === null || storage === undefined) {
        setStepper(defaultCheckoutStepState);
        console.log('No storage in storage');

        setGetStorageLoading(false);
        return;
      }
      // console.log('StorageContext', storage);

      setStepper({ ...JSON.parse(storage) });
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
