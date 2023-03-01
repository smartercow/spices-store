import { useState } from 'react';
import Image from 'next/image';
import cn from 'clsx';
import Link from 'next/link';
import useCategoryById from '@lib/hooks/use-category-by-id';
import type { Product } from '@lib/supabase/types-database';
import { PRODUCTS_CDN_URL } from '@lib/supabase/utils-supabase';

export default function OverviewCard(props: Product): JSX.Element {
  const { data: category } = useCategoryById(props.category_id ?? 1);
  const [imgLoading, setImgLoading] = useState<boolean>(true);

  const category_name = category?.name ?? '';
  const category_path = category?.path ?? '';

  return (
    <>
      {props && category && (
        <Link
          href={`/produkter/${category_path}/${props.id}/${String(props.name)
            .toLowerCase()
            .replace(/ /g, '-')}`}
          className='main-transition overflow-hidden rounded-md bg-white shadow-md duration-500 hover:scale-[1.01] 
                     hover:shadow-lg active:scale-[0.98]'
        >
          <div className=''>
            <Image
              priority
              alt={props.name || 'Video thumbnail'}
              src={
                `${PRODUCTS_CDN_URL}/${props.preview}` ||
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
                  {props.price} kr
                </p>
              </div>
            </div>
            <h4 className='truncate text-sm font-semibold md:text-base'>
              {props.name}
            </h4>
          </div>
        </Link>
      )}
    </>
  );
}
