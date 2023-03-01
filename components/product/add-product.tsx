import { useState } from 'react';
import { useWindow } from '@lib/context/window-context';
import { CartState } from '@lib/state/cart';
import { Product } from '@lib/supabase/types-database';
import { useRecoilState } from 'recoil';

type ProductProps = {
  product: Product;
};

type SetCartProps = {
  prdkt: Product;
  qntty: number;
  ciid: number;
};

export default function AddProduct({ product }: ProductProps): JSX.Element {
  const { width } = useWindow();
  const [cart, setCart] = useRecoilState(CartState);
  const cartList = cart.cartList;

  const [quantity, setQuantity] = useState<number>(1);

  const randomValue = (Math.random() + 3).toString(36).substring(2);

  const handleSetCart = ({ prdkt, qntty, ciid }: SetCartProps) => {
    const productInCart = cartList.find(
      (cartItem) => cartItem.product.id === prdkt.id
    );

    if (productInCart) return;

    setCart({
      cartList: [
        ...cart.cartList,
        {
          product: prdkt,
          quantity: qntty,
          cartItemId: ciid
        }
      ]
    });
  };

  return (
    <>
      {product && (
        <div className='space-y-2 rounded-md bg-light-green p-4 xl:space-y-4 2xl:rounded-xl 2xl:p-8'>
          <div className='space-y-1'>
            <p className='text-base font-semibold xl:text-lg 2xl:text-xl'>
              {product.price},00 Kr
            </p>
            <p className='font-medium text-error'>På lager</p>
          </div>
          <div className='flex'>
            <input
              type='number'
              // max={product.stock ?? 1}
              max={10}
              value={quantity}
              min={1}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className='input-xl input w-full rounded-r-none py-2 text-center'
            />
            <button
              onClick={() =>
                handleSetCart({
                  prdkt: product,
                  qntty: quantity,
                  ciid: product.id
                })
              }
              className='text-bold btn-warning btn-lg btn-no-animation btn w-full rounded-l-none'
            >
              {width > 1025 ? 'Læg i kurv' : 'Kurv'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
