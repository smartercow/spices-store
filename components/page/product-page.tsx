import Breadcrumbs from '@components/ui/breadcrumbs';
import { useRouter } from 'next/router';

export type BreadcrumbProps = {
  name?: string;
  page?: string;
  href?: string;
  item?: string;
  itemHref?: string;
  category?: string;
  categoryHref?: string;
};

export default function ProductsProvider(props: BreadcrumbProps): JSX.Element {
  const router = useRouter();
  const { name } = props;
  return (
    <div className='space-y-2'>
      {router && <Breadcrumbs {...props} />}
      {/* {name && <h2 className='text-3xl font-bold'>{name}</h2>} */}
    </div>
  );
}
