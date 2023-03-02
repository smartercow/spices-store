import ProductsCategories from '@components/products/categories-products';
import OverviewCard from '@components/overview/card-overview';
import ProductsProvider from '@components/page/product-page';
import useProducts from '@lib/hooks/use-products/use-products';
import { Product } from '@lib/supabase/types-database';
import { useWindow } from '@lib/context/window-context';

export default function ProductsRootPage() {
  const { width } = useWindow();
  const { data: products } = useProducts();

  return (
    <div className='space-y-6'>
      <div className='space-y-2'>
        <ProductsProvider
          name='Vores produkter'
          href='/produkter'
          page='Produkter'
        />
        <ProductsCategories />
      </div>

      {products && (
        <div className='items-grid'>
          <>
            {Object(products).map((product: any, i: number) => (
              <OverviewCard key={i} product={product} />
            ))}
          </>
        </div>
      )}
    </div>
  );
}
