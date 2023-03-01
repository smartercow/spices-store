import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { CartState } from '@lib/state/cart';
import CartSidebar from '@components/cart/sidebar-cart';
import { useSession } from '@supabase/auth-helpers-react';
import CartEmpty from '@components/cart/empty-cart';
import cn from 'clsx';

const LOCAL_STORAGE_CARTLIST = 'cartList';

export default function Header(): JSX.Element {
  const session = useSession();
  const router = useRouter();
  const [cart, setCart] = useRecoilState(CartState);
  const cartCount = cart.cartList?.length ?? 0;

  const [loading, setLoading] = useState<boolean>(true);

  const inCheckout = router.pathname.startsWith('/kassen');

  const drawerToggleRef = useRef<HTMLInputElement>(null);

  const handleRef = () => {
    if (cartCount === 0) return;
    if (drawerToggleRef.current) {
      drawerToggleRef.current.checked = false;
    }
    router.push('/kassen');
  };

  useEffect(() => {
    try {
      const storage = localStorage.getItem(LOCAL_STORAGE_CARTLIST);

      if (storage?.length === 0 || storage === null || storage === undefined) {
        setCart({ cartList: [] });
        console.log('no storage');

        setLoading(false);
        return;
      }
      // console.log('storage', storage);

      setCart({ cartList: JSON.parse(storage) });
      setLoading(false);
    } catch (e) {
      setCart({ cartList: [] });

      setLoading(false);
    }
  }, []);

  return (
    <header className='fixed top-0 z-10 flex w-full items-center justify-between bg-white py-2 shadow-lg'>
      <div className='sidebar-width'>
        <Link
          href='/'
          className='relative flex w-fit select-none items-center pl-3 lg:pl-0'
        >
          <i className='text circularstd sec-transition hidden text-3xl font-[900] not-italic lg:inline-flex'>
            spi
          </i>
          <i className='fa-duotone fa-spa px-0.5 text-2xl text-error'></i>
          <i className='text circularstd sec-transition hidden text-3xl font-extrabold not-italic lg:inline-flex'>
            es
          </i>
        </Link>
      </div>
      <div className='flex w-full items-center justify-between px-4 lg:px-6 xl:px-8'>
        <ul className='flex w-full max-w-lg justify-between gap-2 whitespace-nowrap text-xs text-gray-900 md:text-sm'>
          <li className='spacex-1'>
            <i className='fa-regular fa-badge-check'></i>&#10240;Gratis fragt
          </li>
          <li className='hidden xl:inline-flex'>
            <i className='fa-regular fa-badge-check'></i>&#10240;Kvalitet I top
          </li>
          <li className='hidden xl:inline-flex'>
            <i className='fa-regular fa-badge-check'></i>&#10240;Stort online
            udvalg
          </li>
        </ul>
        <div className='ml-10 w-full'>
          <div className='relative hidden md:inline-block'>
            <input className='input w-full pl-9' placeholder='Søg her' />
            <i className='fa-sharp fa-regular fa-magnifying-glass absolute left-3 top-2 text-xl text-gray-700'></i>
          </div>
        </div>
        <div>
          <div className='flex items-center gap-5 pr-8'>
            {!inCheckout && (
              <span
                className='tooltip-bottom tooltip-error tooltip'
                data-tooltip='Indkøbskurv'
              >
                <label
                  htmlFor='drawer-right'
                  className='btn-ghost btn relative'
                >
                  <i className='fa-regular fa-cart-shopping text-xl lg:text-2xl'></i>
                  {!loading && (
                    <small
                      className='absolute -top-1 right-0 grid h-5 w-5 place-content-center rounded-full bg-error 
                                       text-xs font-medium text-white lg:text-sm'
                    >
                      {cartCount}
                    </small>
                  )}
                </label>
              </span>
            )}
            {session ? (
              <div>
                <Link
                  href='/konto'
                  className='main-transition whitespace-nowrap text-lg font-bold hover:opacity-80'
                >
                  Min konto
                </Link>
              </div>
            ) : (
              <span
                className='tooltip-bottom tooltip-error tooltip'
                data-tooltip='Konto'
              >
                <i className='fa-regular fa-user text-xl lg:text-2xl'></i>
              </span>
            )}
          </div>
          <input
            type='checkbox'
            id='drawer-right'
            className='drawer-toggle z-40'
            ref={drawerToggleRef}
          />
          <label className='overlay z-40' htmlFor='drawer-right'></label>
          <div className='drawer-right drawer z-40 w-full max-w-md px-4'>
            <div className='drawer-content flex h-full flex-col pt-10'>
              <label
                htmlFor='drawer-right'
                className='btn-sm btn-circle btn-ghost btn absolute right-2 top-2 mr-4'
              >
                <i className='fa-solid fa-x text-xl'></i>
              </label>
              <div>
                {cartCount > 0 ? (
                  <CartSidebar
                    cartList={cart.cartList}
                    drawerToggleRef={drawerToggleRef}
                  />
                ) : (
                  <CartEmpty element='main' drawerToggleRef={drawerToggleRef} />
                )}
              </div>
              <div className='flex h-full flex-row items-end justify-end gap-4'>
                <label
                  htmlFor='drawer-right'
                  className={cn(
                    'btn-lg btn-ghost btn',
                    cartCount === 0 ? 'hidden' : 'inline-flex'
                  )}
                >
                  Køb mere
                </label>
                <button
                  className={cn(
                    'btn-lg btn',
                    cartCount === 0
                      ? 'btn-no-animation cursor-not-allowed'
                      : 'btn-error'
                  )}
                  onClick={handleRef}
                >
                  Fortsæt til kassen
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
