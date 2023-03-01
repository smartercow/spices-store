import Link from 'next/link';
import { preventBubbling } from '@lib/utils/bubbling';

export default function ProductsCategories(): JSX.Element {
  const disabled = true;

  return (
    <div className='flex gap-4'>
      <Link
        href='/produkter/krydderier'
        className='btn-warning btn-sm btn-rounded btn'
      >
        Krydderier
      </Link>
      <Link
        href='/produkter/oekologi'
        className='btn-success btn-sm btn-rounded btn'
      >
        Økologi
      </Link>
      <Link
        href='/produkter/oekologi'
        className='btn-sm btn-rounded btn cursor-not-allowed bg-slate-500'
        onClick={disabled ? preventBubbling() : undefined}
      >
        Sødt
      </Link>
    </div>
  );
}
