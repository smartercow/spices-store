import '@styles/globals.scss';
import '@styles/fontawesome/css/all.css';
import '@styles/typography/circularstd-font/stylesheet.css';
import '@styles/typography/sofiapro-font/stylesheet.css';
import MainLayout from '@components/layout/layout';
import { UserContextProvider } from '@lib/context/user-context';
import { WindowContextProvider } from '@lib/context/window-context';
import { Database } from '@lib/supabase/database';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { RecoilRoot } from 'recoil';
import type { AppProps } from 'next/app';
import AuthModal from '@components/modal/auth-modal';
import {
  CheckoutContext,
  CheckoutContextProvider
} from '@lib/context/checkout-context';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient<Database>()
  );

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <WindowContextProvider>
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>
            <UserContextProvider>
              <CheckoutContextProvider>
                <MainLayout>
                  <Component {...pageProps} />
                </MainLayout>
                <AuthModal />
              </CheckoutContextProvider>
            </UserContextProvider>
          </RecoilRoot>
          <ReactQueryDevtools position='bottom-right' />
        </QueryClientProvider>
      </WindowContextProvider>
    </SessionContextProvider>
  );
}

export default MyApp;
