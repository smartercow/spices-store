import Product from '@components/product/product';
import { products } from '@lib/data/products';
import { useRouter } from 'next/router';
// export const dynamic = 'force-dynamic';

export default function ProductPage() {
  const router = useRouter();
  const { slug } = router.query;
  const queryId = router.query.id;
  const productId = Number(queryId);

  return (
    <>
      {slug && (
        <Product
          pathname={`/${slug}`}
          category='Krydderier'
          categoryHref='/produkter/krydderier'
          productId={productId}
        />
      )}
    </>
  );
}
