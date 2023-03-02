import OverviewCard from '@components/overview/card-overview';
import ProductsProvider from '@components/page/product-page';
import useProductsByCategory from '@lib/hooks/use-products-by-category';
import { Product } from '@lib/supabase/types-database';

type OverviewProductsProps = {
  name: string;
  href: string;
  productId: number;
};

export default function OverviewProducts({
  name,
  href,
  productId
}: OverviewProductsProps): JSX.Element {
  const { data: products, isLoading } = useProductsByCategory(productId);

  console.log('producst', products);

  return (
    <>
      {!isLoading && (
        <>
          <div className='space-y-6'>
            <ProductsProvider
              name={name}
              href='/produkter'
              page='Produkter'
              category={name}
              categoryHref={`/produkter/${href}`}
            />

            <div className='items-grid'>
              {products && (
                <>
                  {Object(products).map((product: any, i: number) => (
                    <OverviewCard key={i} product={product} />
                  ))}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
