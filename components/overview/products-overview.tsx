import OverviewCard from '@components/overview/card-overview';
import ProductsProvider from '@components/page/product-page';
import useProductsByCategory from '@lib/hooks/use-products-by-category';
import OverviewHero from './hero-overview';

type OverviewProductsProps = {
  name: string;
  href: string;
  categoryId: number;
};

export default function OverviewProducts({
  name,
  href,
  categoryId
}: OverviewProductsProps): JSX.Element {
  const { data: products, isLoading } = useProductsByCategory(categoryId);

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

            {products && (
              <>
                <OverviewHero categoryId={categoryId} />

                <div className='items-grid pt-6'>
                  {Object(products).map((product: any, i: number) => (
                    <OverviewCard key={i} product={product} />
                  ))}
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}
