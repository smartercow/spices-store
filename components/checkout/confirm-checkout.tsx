import { useState } from 'react';
import CartOverview from '@components/cart/overview-cart';
import { CartState, defaultCartState } from '@lib/state/cart';
import { useRecoilState, useSetRecoilState } from 'recoil';
import CheckoutCreditCard from './creditcard-checkout';
import CheckoutShipment from './shipment-checkout';
import { useRouter } from 'next/router';
import {
  CheckoutStepState,
  defaultCheckoutStepState
} from '@lib/state/stepper-state';

export default function CheckoutPayment(): JSX.Element {
  const router = useRouter();
  const setStepper = useSetRecoilState(CheckoutStepState);
  const [cart, setCart] = useRecoilState(CartState);
  const cartList = cart.cartList ?? [];

  const [standard, setStandard] = useState<boolean>(true);
  const [express, setExpress] = useState<boolean>(false);

  const totalPrice = cartList.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const deliveryFree = totalPrice > 299;

  const handleRef = () => {
    setStepper(defaultCheckoutStepState);
    setCart(defaultCartState);
    localStorage.removeItem('cartList');
    localStorage.removeItem('stepper');
    router.push('/kassen/faktura');
  };

  return (
    <div className='space-y-8'>
      <div className='checkout-form'>
        <CheckoutCreditCard isPreview />
        <div className='checkout-box'>
          <CheckoutShipment
            standard={standard}
            setStandard={setStandard}
            express={express}
            setExpress={setExpress}
          />
          <div className='checkout-sidebar-box pt-2'>
            <div className='space-y-2 rounded-md bg-slate-200 p-6 md:p-8'>
              <span className='h5ding flex items-center justify-between'>
                <h5 className=''>Levering</h5>{' '}
                <p>
                  {(express && deliveryFree) || express
                    ? '85 kr'
                    : deliveryFree
                    ? '0 kr'
                    : '30 kr'}
                </p>
              </span>
              <span className='h5ding flex items-center justify-between whitespace-nowrap'>
                <h5 className=''>
                  PRIS I ALT{' '}
                  <span className='text-sm font-normal'>(inkl. moms)</span>
                </h5>{' '}
                <p>{totalPrice} KR</p>
              </span>
            </div>
          </div>
          <div className='pt-4 text-right'>
            <button
              className='btn-error btn-md btn xl:btn-lg'
              onClick={handleRef}
            >
              Videre
            </button>
          </div>
        </div>
      </div>
      <div className='checkout-form'>
        <CartOverview />
      </div>
    </div>
  );
}
