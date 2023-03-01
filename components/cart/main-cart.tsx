import { useState } from 'react';
import { CartState } from '@lib/state/cart';
import { PRODUCTS_CDN_URL } from '@lib/supabase/utils-supabase';
import Image from 'next/image';
import Link from 'next/link';
import { useRecoilState, useSetRecoilState } from 'recoil';
import CartEmpty from './empty-cart';
import cn from 'clsx';
import {
  CheckoutStepState,
  defaultStepperState
} from '@lib/state/stepper-state';
import { getRandomId } from '@lib/utils/random-id';
import { useRouter } from 'next/router';
import { CheckoutState, defaultCheckoutState } from '@lib/state/checkout-state';

const LOCAL_STORAGE_CARTLIST = 'cartList';

const randomStepperId = getRandomId();

export default function CartMain(): JSX.Element {
  const router = useRouter();

  const [stepper, setStepper] = useRecoilState(CheckoutStepState);
  const [checkoutState, setCheckoutState] = useRecoilState(CheckoutState);
  const [cart, setCart] = useRecoilState(CartState);
  const cartList = cart.cartList ?? [];
  const cartCount = cart.cartList?.length ?? 0;

  const [imgLoading, setImgLoading] = useState<boolean>(true);

  const totalPrice = cartList.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const handleRef = (path: string) => {
    setStepper(defaultStepperState);
    setCheckoutState(defaultCheckoutState);
    setStepper({
      ...stepper,
      stepperId: randomStepperId,
      steps: [
        {
          step: 'adresse',
          active: true,
          completed: false
        }
      ]
    });

    router.push(path);
  };

  const removeItem = (cartItemId: number) => {
    setCart({
      cartList: cartList.filter((item) => item.cartItemId !== cartItemId)
    });

    localStorage.setItem(
      LOCAL_STORAGE_CARTLIST,
      JSON.stringify(cartList.filter((item) => item.cartItemId !== cartItemId))
    );
  };

  return (
    <div>
      {cartCount > 0 && (
        <div className='flex w-full justify-between gap-14'>
          <div className='w-full space-y-6 rounded-xl bg-white py-8 px-4'>
            <h3 className='px-4 text-2xl font-semibold'>
              Din indkøbskurv ({cartCount}{' '}
              {cartCount === 0 || cartCount === 1 ? 'vare' : 'varer'})
            </h3>
            <div className='space-y-2'>
              {cartList.map((item) => (
                <div
                  key={item.cartItemId}
                  className='main-transition flex items-center justify-between gap-1 rounded-md p-4 px-4 hover:bg-slate-300'
                >
                  <Link
                    href={`produkter/${item.product.category.path}/${String(
                      item.product.id
                    )}/${String(item.product.name).replace(/ /g, '-')}}`}
                  >
                    <div className='h-24 w-24 overflow-hidden rounded-md'>
                      <Image
                        priority
                        alt={item.product.name}
                        src={
                          `${PRODUCTS_CDN_URL}/${item.product.preview}` ||
                          '/assets/images/placeholder.svg'
                        }
                        width={500}
                        height={600}
                        className={cn(
                          'main-transition w-full select-none duration-700 ease-in-out hover:scale-105',
                          imgLoading
                            ? 'blur-2xl grayscale'
                            : 'blur-0 grayscale-0'
                        )}
                        onLoadingComplete={() => setImgLoading(false)}
                      />
                    </div>
                  </Link>
                  <div className='w-full text-center'>
                    <Link
                      className='main-transition font-semibold underline-offset-4 hover:underline'
                      href={`produkter/${item.product.category.path}/${String(
                        item.product.id
                      )}/${String(item.product.name).replace(/ /g, '-')}}`}
                    >
                      {item.product.name}
                    </Link>
                  </div>
                  <div className='flex items-center gap-4'>
                    <input
                      type='number'
                      max={item.product.stock}
                      value={item.quantity}
                      min={1}
                      onChange={(e) =>
                        setCart({
                          cartList: cartList.map((cartItem) => {
                            if (cartItem.cartItemId === item.cartItemId) {
                              return {
                                ...cartItem,
                                quantity: parseInt(e.target.value)
                              };
                            } else {
                              return cartItem;
                            }
                          })
                        })
                      }
                      className='input-lg input w-24 py-2 text-center'
                    />
                    <span
                      className='tooltip-bottom tooltip-error tooltip'
                      data-tooltip='Fjerne vare'
                    >
                      <button
                        className='main-transition btn-sm btn-ghost btn hover:btn-error'
                        onClick={() => removeItem(item.cartItemId)}
                      >
                        <i className='fa-solid fa-x'></i>
                      </button>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='h-80 w-full max-w-sm space-y-10 rounded-xl bg-white p-8'>
            <div className='space-y-4'>
              <h3 className='text-2xl font-semibold'>Pris i alt</h3>
              <div className='space-y-2 text-sm'>
                <div className='flex items-center justify-between gap-2'>
                  <p>Subtotal (inkl. moms)</p>
                  <p>{totalPrice} kr</p>
                </div>
                <div className='flex items-center justify-between gap-2'>
                  <p>Levering</p>
                  <p>{totalPrice > 299 ? '0 kr' : '30 kr'}</p>
                </div>
              </div>
              <div
                className='main-transition flex cursor-not-allowed items-center justify-between gap-2 rounded-md bg-slate-200 
                               p-4 hover:bg-slate-400'
              >
                <p className='text-sm font-medium'>
                  Tilføj rabatkode (valgfrit)
                </p>
                <i className='fa-sharp fa-solid fa-chevron-down'></i>
              </div>
            </div>
            <div className='text-right'>
              <button
                className='btn-error btn'
                onClick={() => handleRef('/kassen/adresse')}
              >
                Fortsæt
              </button>
            </div>
          </div>
        </div>
      )}
      {cartCount === 0 && <CartEmpty element='main' />}
    </div>
  );
}
