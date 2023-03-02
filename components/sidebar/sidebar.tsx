import { HeroIcon } from '@components/ui/hero-icon';
import { navLinks } from '@lib/local/navlinks';
import { useSupabaseClient, useSession } from '@supabase/auth-helpers-react';
import { AuthModalState } from '@lib/state/auth-state';
import { useRouter } from 'next/navigation';
import { useSetRecoilState } from 'recoil';
import SidebarLink from './link-sidebar';

export default function Aside(): JSX.Element {
  const supabase = useSupabaseClient();
  const session = useSession();

  const router = useRouter();

  const setAuthModal = useSetRecoilState(AuthModalState);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <aside className='sidebar-width h-screen border-r bg-white'>
      <header className='fixed flex h-full w-fit flex-col justify-between'>
        <nav className=''>
          <div className='py-2'>
            {/* <h2 className='text-4xl font-extrabold'>SPICES</h2> */}
          </div>
          <ul className='mt-14 w-fit space-y-2'>
            {navLinks.map((link) => (
              <SidebarLink key={link.linkName} {...link} />
            ))}
          </ul>
        </nav>
        <div>
          <button
            className='btn-error btn-lg btn-block btn-rounded btn z-10 p-0 text-lg font-semibold lg:gap-4'
            onClick={() =>
              session
                ? handleLogout()
                : setAuthModal({ open: true, view: 'login' })
            }
          >
            {session ? (
              <>
                <HeroIcon
                  iconName='ArrowLeftOnRectangleIcon'
                  className='inline-block h-6 w-6 lg:hidden'
                />
                <span className='hidden lg:inline-flex'>Log ud</span>{' '}
              </>
            ) : (
              <>
                <span className='hidden lg:inline-flex'>Log ind</span>{' '}
                <HeroIcon
                  iconName='ArrowRightOnRectangleIcon'
                  className='inline-block h-6 w-6 lg:hidden'
                />
              </>
            )}
          </button>
        </div>
        <div></div>
      </header>
    </aside>
  );
}
