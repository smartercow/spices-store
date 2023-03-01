import Link from 'next/link';

type InternalLinkProps = {
  name: string;
  href: string;
};

export default function InternalLink({ name, href }: InternalLinkProps) {
  return (
    <>
      <Link
        href={href}
        className='main-transition font-medium hover:opacity-80'
      >
        {name} <i className='fa-solid fa-chevron-right text-lg'></i>
      </Link>
    </>
  );
}
