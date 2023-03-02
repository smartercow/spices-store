import { useEffect, useState } from 'react';
import CartOverview from '@components/cart/overview-cart';
import { CartState, defaultCartState } from '@lib/state/cart';
import { useRecoilState, useSetRecoilState } from 'recoil';
import CheckoutCreditCard from './creditcard-checkout';
import CheckoutShipment from './shipment-checkout';
import { useRouter } from 'next/router';
import {
  CheckoutStepState,
  defaultStepperState
} from '@lib/state/stepper-state';
import CheckoutUserInfo from './userinfo-checkout';
import { CheckoutState } from '@lib/state/checkout-state';
import CheckoutBackend from './backend-checkout';

const orderNumber = Math.floor(1000000000 + Math.random() * 9000000000);

export default function CheckoutPayment(): JSX.Element {
  const router = useRouter();
  const [stepper, setStepper] = useRecoilState(CheckoutStepState);
  const [checkoutState, setCheckoutState] = useRecoilState(CheckoutState);
  const isStandard = checkoutState.deliveryType === 'standard';
  const isExpress = checkoutState.deliveryType === 'express';
  const [cart, setCart] = useRecoilState(CartState);
  const cartList = cart.cartList ?? [];

  const [cartItems, setCartItems] = useState<
    { cartItemId: number; quantity: number }[]
  >([]);
  const [standard, setStandard] = useState<boolean>(true);
  const [express, setExpress] = useState<boolean>(false);

  const totalPrice = cartList.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const deliveryFree = totalPrice > 299;

  const handleFilter = () => {
    const filteredItems = cartList
      .map((item) => ({
        cartItemId: item.cartItemId,
        quantity: item.quantity
      }))
      .filter(
        (item) =>
          typeof item.cartItemId === 'number' &&
          typeof item.quantity === 'number'
      );

    setCartItems(filteredItems);
  };

  useEffect(() => {
    if (cartList.length < 0) return;

    handleFilter();
  }, [cartList]);

  const handleRef = () => {
    setCheckoutState({
      ...checkoutState,
      checkoutDone: true,
      orderNumber: orderNumber,
      currentCheckoutId: stepper.stepperId
    });
    setStepper(defaultStepperState);
    setCart(defaultCartState);
    localStorage.removeItem('cartList');
    localStorage.removeItem('stepper');
    router.push('/kassen/faktura');
  };

  return (
    <div className='space-y-8'>
      <div className='checkout-form'>
        <div className='w-full space-y-8'>
          <CheckoutUserInfo isPreview />
          <CheckoutCreditCard isPreview />
        </div>
        <div className='checkout-box h-fit xl:max-w-lg'>
          <CheckoutShipment
            isPreview
            standard={standard}
            setStandard={setStandard}
            express={express}
            setExpress={setExpress}
          />
          <div className='pt-4'>
            <div className='space-y-2 rounded-md bg-slate-200 p-6 md:p-8'>
              <span className='h5ding flex items-center justify-between'>
                <h5 className=''>Levering</h5>{' '}
                <p>
                  {(isExpress && deliveryFree) || isExpress
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
          <CheckoutBackend
            products={cartItems}
            handleRef={handleRef}
            totalPrice={totalPrice}
            orderNumber={orderNumber}
          />
        </div>
      </div>
      <div className='checkout-form'>
        <CartOverview />
      </div>
    </div>
  );
}
