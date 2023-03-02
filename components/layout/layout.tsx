import Sidebar from '@components/sidebar/sidebar';
import Header from '@components/header/header';
import Footer from '@components/footer/footer';
import { ReactNode, useEffect, useState } from 'react';
import { useWindow } from '@lib/context/window-context';
import MobilPage from '@components/page/mobil-page';
import { useRouter } from 'next/router';

export type LayoutProps = {
  children: ReactNode;
};

export default function MainLayout({ children }: LayoutProps): JSX.Element {
  const router = useRouter();
  const { width } = useWindow();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (router) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [router]);

  return (
    <>
      {!loading && (
        <>
          {width < 640 ? (
            <MobilPage />
          ) : (
            <div className='flex'>
              <Sidebar />
              <Header />
              <div className='main-extent bg-light-green'>
                <main className='mx-auto mt-20 min-h-[75vh] w-full 3xl:max-w-7xl'>
                  {children}
                </main>
                <Footer />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
