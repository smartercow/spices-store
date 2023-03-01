import OverviewFeatured from '@components/overview/featured-overview';
import useProducts from '@lib/hooks/use-products/use-products';

export default function Homepage() {
  const { data: products } = useProducts();
  return (
    <div className='w-full space-y-10'>
      <div className='flex gap-6'>
        <div className='max-w-[300px] space-y-3'>
          <h3 className='text-xl font-bold'>Økologiske krydderier</h3>
          <p>
            Økologiske krydderier fra det meste af verden er vores speciale, med
            garanti for at kvaliteten er i højsæde.
          </p>
        </div>
      </div>
      {products && (
        <section className='space-y-6'>
          <OverviewFeatured
            title='Nye produkter'
            href='/nye-produkter'
            featuredId={1}
            products={products}
          />
          <OverviewFeatured
            title='Tilbud'
            href='/tilbud'
            products={products}
            featuredId={1}
          />
          <OverviewFeatured
            title='Mest solgte'
            href='/mest-solgte'
            featuredId={1}
            products={products}
          />
        </section>
      )}
    </div>
  );
}
