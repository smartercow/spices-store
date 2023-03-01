import Link from 'next/link';
import { useRouter } from 'next/router';
import { NavLink } from '@lib/local/navlinks';
import { preventBubbling } from '@lib/utils/bubbling';
import cn from 'clsx';

export default function SidebarLink({
  href,
  linkName,
  iconName,
  disabled,
  customIcon,
  canBeHidden,
  fontAwesomeIcon
}: NavLink): JSX.Element {
  const router = useRouter();
  const pathname = router.pathname;

  const isActive =
    pathname?.startsWith(href) && href !== '/'
      ? true
      : pathname?.length === 1 && href === '/'
      ? true
      : false;

  return (
    <li className='w-full'>
      <Link
        href={href}
        className={cn(
          'main-transition flex items-center gap-0 rounded-3xl py-2 px-2 text-lg font-medium hover:bg-slate-400 lg:gap-2 lg:px-5',
          disabled && 'cursor-not-allowed'
        )}
        onClick={disabled ? preventBubbling() : undefined}
      >
        <i
          className={cn(
            'w-fit px-1 text-2xl lg:w-8',
            isActive ? 'fa-solid' : 'fa-regular',
            fontAwesomeIcon
          )}
        ></i>

        <p
          className={cn(
            'sec-transition hidden lg:inline-flex',
            isActive && 'font-bold'
          )}
        >
          {linkName}
        </p>
      </Link>
    </li>
  );
}
