import Sidebar from '@components/sidebar/sidebar';
import Header from '@components/header/header';
import Footer from '@components/footer/footer';
import type { ReactNode } from 'react';
import { useWindow } from '@lib/context/window-context';
import MobilPage from '@components/page/mobil-page';

export type LayoutProps = {
  children: ReactNode;
};

export default function MainLayout({ children }: LayoutProps): JSX.Element {
  const { width } = useWindow();
  return (
    <>
      {width > 640 ? (
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
      ) : (
        <MobilPage />
      )}
    </>
  );
}
