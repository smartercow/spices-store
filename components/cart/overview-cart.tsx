import { useState } from 'react';
import Link from 'next/link';
import { CartState } from '@lib/state/cart';
import { PRODUCTS_CDN_URL } from '@lib/supabase/utils-supabase';
import Image from 'next/image';
import { useRecoilValue } from 'recoil';
import cn from 'clsx';

export default function CartOverview(): JSX.Element {
  const cart = useRecoilValue(CartState);
  const cartList = cart.cartList ?? [];

  const [imgLoading, setImgLoading] = useState<boolean>(true);

  const totalPrice = cartList.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  return (
    <div className='checkout-box'>
      <h4 className='h4ding'>Ordre</h4>
      <div className='space-y-4 md:space-y-6'>
        {cartList.map((item) => (
          <div
            key={item.cartItemId}
            className='main-transition flex items-center justify-between gap-1 rounded-md pr-4 hover:bg-slate-300'
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
                    imgLoading ? 'blur-2xl grayscale' : 'blur-0 grayscale-0'
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
            <div>
              <p className='whitespace-nowrap text-sm text-gray-900'>
                {item.quantity} {item.quantity === 1 ? 'stykke' : 'styks'}
                {item.quantity > 1 && ` x ${item.product.price} kr `} ={' '}
                <span className='text-base font-medium text-error'>
                  {item.quantity * item.product.price} kr
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
