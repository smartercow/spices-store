import Sidebar from '@components/sidebar/sidebar';
import Header from '@components/header/header';
import Footer from '@components/footer/footer';
import { type ReactNode, useEffect, useState } from 'react';
import { useWindow } from '@lib/context/window-context';
import MobilPage from '@components/page/mobil-page';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { CookiesState } from '@lib/state/cookies-state';

export type LayoutProps = {
  children: ReactNode;
};

export default function MainLayout({ children }: LayoutProps): JSX.Element {
  const router = useRouter();
  const { width } = useWindow();
  const [cookies, setCookies] = useRecoilState(CookiesState);
  const cookiesFilled = cookies.cookiesState.filled === true;

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (router) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [router]);

  const handleCookies = (consent: boolean) => {
    setCookies({ cookiesState: { filled: true, consent: consent } });
  };

  console.log(cookies);

  return (
    <>
      {!loading && (
        <>
          {width < 640 ? (
            <MobilPage />
          ) : (
            <div className='relative flex w-full'>
              <Sidebar />
              <Header />
              <div className='main-extent bg-light-green'>
                <main className='mx-auto mt-20 min-h-[75vh] w-full 3xl:max-w-7xl'>
                  {children}
                </main>
                <Footer />
              </div>
              {!cookiesFilled && (
                <div className='min-w-screen fixed bottom-0 left-0 grid w-full place-content-center bg-slate-200 py-4'>
                  <div className='flex max-w-7xl flex-col items-center justify-center gap-4 px-4 md:flex-row'>
                    <div className='w-full text-center md:text-start'>
                      <p className='text-sm'>
                        Denne side bruger cookies for at give dig en bedre
                        browsingoplevelse. <br />
                        <Link
                          href={``}
                          className='font-medium underline underline-offset-2'
                        >
                          Læs mere om, hvordan vi bruger cookies.
                        </Link>
                      </p>
                    </div>
                    <div className='flex w-full max-w-sm justify-end gap-4 xl:max-w-md'>
                      <button
                        className='btn-md btn'
                        onClick={() => handleCookies(false)}
                      >
                        Afvis cookies
                      </button>
                      <button
                        className='btn-error btn-md btn'
                        onClick={() => handleCookies(true)}
                      >
                        Jeg accepterer cookies
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
}
