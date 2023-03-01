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
            {Object(products)
              .slice(0, width < 1025 ? 3 : width < 1600 ? 4 : 5)
              .map((product: Product, i: number) => (
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
        </div>
      )}
    </div>
  );
}
