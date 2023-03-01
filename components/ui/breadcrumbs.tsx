import Link from 'next/link';
import type { BreadcrumbProps } from '@components/page/product-page';

export default function Breadcrumbs({
  page,
  href,
  item,
  itemHref,
  category,
  categoryHref
}: BreadcrumbProps): JSX.Element {
  return (
    <div className='breadcrumbs px-0 text-sm'>
      <ul>
        <li>
          <Link href={href || '/produkter'}>{page}</Link>
        </li>
        {category && (
          <li>
            <Link href={categoryHref || ''}>{category}</Link>
          </li>
        )}
        {item && (
          <li>
            <Link href={itemHref || ''}>{item}</Link>
          </li>
        )}
      </ul>
    </div>
  );
}
