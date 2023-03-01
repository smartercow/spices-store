import { useState } from 'react';
import ProductsProvider, {
  BreadcrumbProps
} from '@components/page/product-page';
import Image from 'next/image';
import cn from 'clsx';
import OverviewProduct from './overview-product';
import BottomProduct from './bottom-product';
import OverviewFeatured from '@components/overview/featured-overview';
import useProductById from '@lib/hooks/use-product-by-id';
import { PRODUCTS_CDN_URL } from '@lib/supabase/utils-supabase';
import useProducts from '@lib/hooks/use-products/use-products';

type ProductProps = {
  pathname: string;
  productId: number;
};

export default function Product(
  props: ProductProps & BreadcrumbProps
): JSX.Element {
  const { pathname } = props;
  const { data: products, isLoading: productsLoading } = useProducts();
  const { data: product, isLoading } = useProductById(props?.productId);
  const [imgLoading, setImgLoading] = useState<boolean>(true);

  console.log('productPage', Object(product?.featured).id);

  return (
    <>
      {!isLoading && product && (
        <div className='space-y-6'>
          <ProductsProvider
            href='/produkter'
            page='Produkter'
            category={props.category}
            categoryHref={props.categoryHref}
            item={product.name}
            itemHref='/produkter/krydderier/kryditem'
          />
          <div className='space-y-12'>
            <div className='flex flex-col overflow-hidden rounded-2xl bg-white md:flex-row'>
              <div className='max-h-80 w-full md:h-full md:max-w-lg'>
                <Image
                  alt={product.name ?? ''}
                  src={
                    `${PRODUCTS_CDN_URL}/${product.preview}` ||
                    '/assets/images/placeholder.svg'
                  }
                  width={500}
                  height={600}
                  priority={true}
                  className={cn(
                    'h-full w-full rounded-sm object-cover duration-700 ease-in-out',
                    imgLoading
                      ? 'blur-2xl grayscale'
                      : 'scale-100 blur-0 grayscale-0'
                  )}
                  onLoadingComplete={() => setImgLoading(false)}
                />
              </div>
              <OverviewProduct product={product} />
            </div>

            <BottomProduct product={product} />
            <OverviewFeatured
              title='Anbefalet'
              href={`/produkter/${product.category}`}
              products={products}
              featuredId={Object(product?.featured).id}
            />
          </div>
        </div>
      )}
    </>
  );
}
