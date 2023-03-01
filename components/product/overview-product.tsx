import AddProduct from './add-product';
import useCategoryById from '@lib/hooks/use-category-by-id';
import type { Product } from '@lib/supabase/types-database';

type OverviewProductProps = {
  product: any;
};
export default function OverviewProduct(
  props: OverviewProductProps
): JSX.Element {
  const { product } = props;

  return (
    <>
      {product && (
        <div className='flex w-full flex-col justify-between gap-4 overflow-hidden py-4 px-6 md:px-8 xl:space-y-6 xl:py-6 xl:px-10 2xl:space-y-8 2xl:py-8 2xl:px-14'>
          <div className='space-y-2 2xl:space-y-3'>
            <h6 className='text-lg font-medium capitalize text-main-black'>
              {product.category.name}
            </h6>
            <h2 className='main-heading'>
              {product.name} <span className='italic'>- 50g.</span>
            </h2>
            <div className='space-y-1'>
              <p className='paragraph'>
                Tilbud – Lorem ipsum dolor sit amet, consectetur adipisicing
                elit.
              </p>
              <p className='paragraph'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Aperiam.
              </p>
            </div>
          </div>
          <AddProduct product={product} />
          <div className='flex flex-col justify-between gap-5 xl:flex-row xl:gap-2'>
            <div className='flex items-center gap-2'>
              <div className='grid h-10 w-10 place-items-center rounded-full bg-light-green 2xl:h-14 2xl:w-14'>
                <i className='fa-regular fa-truck text-base text-error 2xl:text-xl'></i>
              </div>
              <div>
                <h6 className='text-sm font-medium'>Gratis levering</h6>
                <p className='paragraph text-sm'>Ved køb for min 300,- kr.</p>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <div className='grid h-10 w-10 place-items-center rounded-full bg-light-green 2xl:h-14 2xl:w-14'>
                <i className='fa-regular fa-star text-xl text-error'></i>
              </div>
              <div>
                <h6 className='text-sm font-medium'>Kvalitet I top</h6>
                <p className='paragraph text-sm'>På alle vores produkter</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
