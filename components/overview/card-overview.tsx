import { useState } from 'react';
import Image from 'next/image';
import cn from 'clsx';
import Link from 'next/link';
import useCategoryById from '@lib/hooks/use-category-by-id';
import { PRODUCTS_CDN_URL } from '@lib/supabase/utils-supabase';
import type { Product } from '@lib/supabase/types-database';

type OverviewCardProps = {
  product: any;
};

export default function OverviewCard({
  product
}: OverviewCardProps): JSX.Element {
  const [imgLoading, setImgLoading] = useState<boolean>(true);

  // if (!category) return <></>;

  const category_name = product.category?.name ?? '';
  const category_path = product.category?.path ?? '';

  console.log('product: ', product);

  return (
    <>
      {product && (
        <Link
          href={`/produkter/${category_path}/${product.id}/${String(
            product.name
          )
            .toLowerCase()
            .replace(/ /g, '-')}`}
          className='main-transition overflow-hidden rounded-md bg-white shadow-md duration-500 hover:scale-[1.01] 
                     hover:shadow-lg active:scale-[0.98]'
        >
          <div className=''>
            <Image
              priority
              alt={product.name || 'Video thumbnail'}
              src={
                `${PRODUCTS_CDN_URL}/${product.preview}` ||
                '/assets/images/placeholder.svg'
              }
              width={500}
              height={600}
              className={cn(
                'select-none duration-700 ease-in-out',
                imgLoading ? 'blur-2xl grayscale' : 'blur-0 grayscale-0'
              )}
              onLoadingComplete={() => setImgLoading(false)}
            />
          </div>
          <div className='space-y-1 p-2'>
            <div className='flex flex-nowrap items-center justify-between gap-2'>
              <p className='text-sm capitalize text-gray-900'>
                {category_name}
              </p>
              <div className='w-20 text-right'>
                <p className='text-base font-medium text-error lg:text-lg'>
                  {product.price} kr
                </p>
              </div>
            </div>
            <h4 className='truncate text-sm font-semibold md:text-base'>
              {product.name}
            </h4>
          </div>
        </Link>
      )}
    </>
  );
}
