import OverviewCard from '@components/overview/card-overview';
import { useWindow } from '@lib/context/window-context';
import InternalLink from '@components/ui/internal-link';
import type { Product } from '@lib/supabase/types-database';

type OverviewFeaturedProps = {
  title: string;
  href: string;
  products?: any;
  featuredId: number;
};

export default function OverviewFeatured({
  title,
  href,
  products,
  featuredId
}: OverviewFeaturedProps): JSX.Element {
  const { width } = useWindow();

  const featuredProducts = products?.filter(
    (product: { featured: { id: number } }) =>
      product.featured?.id === featuredId
  );

  return (
    <div className='space-y-5 rounded-lg bg-white px-8 py-5'>
      <div className='flex justify-between gap-2'>
        <div>
          <h3 className='text-2xl font-semibold'>{title}</h3>
        </div>
        <InternalLink name='Se alle' href={href} />
      </div>
      {featuredProducts && (
        <div className='items-grid'>
          {featuredProducts
            .slice(0, width < 1025 ? 3 : width < 1600 ? 4 : 5)
            .map((p: Product, i: number) => (
              <OverviewCard
                key={i}
                category_id={p.category_id}
                description={p.description}
                featured_in={p.featured_in}
                id={p.id}
                name={p.name}
                preview={p.preview}
                price={p.price}
                sale={p.sale}
                sale_price={p.sale_price}
                sale_text={p.sale_text}
                stock={p.stock}
              />
            ))}
        </div>
      )}
    </div>
  );
}
