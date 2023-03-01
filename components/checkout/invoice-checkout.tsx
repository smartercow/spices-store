import AccountOrder from '@components/account/orders/order-account';
import AccountOrders from '@components/account/orders/orders-account';
import { CheckoutState } from '@lib/state/checkout-state';
import { useUser } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import CheckoutCreditCard from './creditcard-checkout';
import CheckoutUserInfo from './userinfo-checkout';

export default function CheckoutInvoice(): JSX.Element {
  const user = useUser();
  const [checkoutState, setCheckoutState] = useRecoilState(CheckoutState);

  return (
    <>
      {user && (
        <section className='space-y-4'>
          <div className='flex w-full flex-col-reverse justify-between gap-4 md:flex-row '>
            <div className='rounded-lg bg-white p-6'>
              <h4 className='h4ding font-bold'>
                Forventes leveret: man., 6 marts og ons., 8 marts
              </h4>
              <p className='text-sm font-medium text-gray-900'>
                Vi håber, at du har haft en god shopping oplevelse hos os.
              </p>
            </div>
            <div className='pt-4'>
              <Link href='/konto/ordrer' className='btn-error btn-lg btn '>
                Se mine ordrer
              </Link>
            </div>
          </div>
          <div className='checkout-form'>
            <div className='w-full space-y-6 lg:max-w-2xl xl:space-y-8'>
              <div className='checkout-box'>
                <AccountOrder
                  isInvoice
                  orderNumber={checkoutState.orderNumber}
                />
              </div>
            </div>
            <div className='space-y-6 xl:space-y-8'>
              <CheckoutUserInfo isPreview />
              <CheckoutCreditCard isPreview />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
