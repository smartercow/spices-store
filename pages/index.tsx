import OverviewFeatured from '@components/overview/featured-overview';
import useProducts from '@lib/hooks/use-products/use-products';

export default function Homepage() {
  const { data: products } = useProducts();
  return (
    <div className='w-full space-y-10'>
      <div className='h-full w-full overflow-hidden rounded-lg'>
        <img
          src='/assets/images/main-hero.jpg'
          alt='Spices hero'
          className='max-h-56 w-full object-cover md:max-h-64 lg:max-h-80 xl:max-h-96'
        />
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
