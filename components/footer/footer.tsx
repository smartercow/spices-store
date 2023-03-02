import Link from 'next/link';

export default function Footer(): JSX.Element {
  return (
    <footer className='main-extent mt-4 w-full space-y-5 py-8 text-center lg:mt-7'>
      <div>
        <ul className='flex w-full justify-center gap-4 font-medium'>
          <li>
            <Link href={``} className='link'>
              Opskrifter
            </Link>
          </li>
          <li>
            <Link href={``} className='link'>
              Handelsbetingelser
            </Link>
          </li>
          <li>
            <Link href={``} className='link'>
              Cookies & Privatlivspolitik
            </Link>
          </li>
          <li>
            <Link href={``} className='link'>
              Kontakt os
            </Link>
          </li>
        </ul>
      </div>
      <p className='text-sm'>
        &copy; {new Date().getFullYear()}{' '}
        <span className='text-base font-bold'>spices</span>. Alle rettigheder
        forbeholdes.
      </p>
    </footer>
  );
}
