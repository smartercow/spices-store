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
                  {Object(products).map((product: Product, i: number) => (
                    <OverviewCard
                      key={i}
                      category_id={product.category_id}
                      description={product.description}
                      featured_in={product.featured_in}
                      id={product.id}
                      name={product.name}
                      preview={product.preview}
                      price={product.price}
                      sale={product.sale}
                      sale_price={product.sale_price}
                      sale_text={product.sale_text}
                      stock={product.stock}
                    />
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
