import useProductById from '@lib/hooks/use-product-by-id';
import { PRODUCTS_CDN_URL } from '@lib/supabase/utils-supabase';
import Image from 'next/image';
import Link from 'next/link';
import cn from 'clsx';
import { useState } from 'react';

export type AccountProductProps = {
  cartItemId: number;
  quantity: number;
};

export default function AccountProduct({
  cartItemId,
  quantity
}: AccountProductProps): JSX.Element {
  const { data: product } = useProductById(cartItemId as number);

  const [imgLoading, setImgLoading] = useState<boolean>(true);

  return (
    <>
      {product && (
        <Link
          href={``}
          className='flex w-full items-center justify-between gap-2 overflow-hidden rounded-md bg-slate-200 pr-2 xl:pr-4'
        >
          <div className='h-16 w-16'>
            <Image
              priority
              alt={product.name}
              src={
                `${PRODUCTS_CDN_URL}/${product.preview}` ||
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
          <div>
            <p className='text-sm font-bold'>{product.name}</p>
          </div>
          <div className='text-center font-semibold'>
            <p className='text-sm'>{quantity}x</p>
            <p className='text-sm text-error'>{product.price} kr</p>
          </div>
        </Link>
      )}
    </>
  );
}
