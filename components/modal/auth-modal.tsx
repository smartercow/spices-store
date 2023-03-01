import Modal from './modal';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useSession } from '@supabase/auth-helpers-react';
import { AuthModalState } from 'lib/state/auth-state';
import AuthLogin from '../auth/auth-login';
import AuthResetPassword from '../auth/auth-resetpassword';
import AuthSignUp from '../auth/auth-signup';
import { HeroIcon } from '@components/ui/hero-icon';

export default function AuthModal(): JSX.Element {
  const session = useSession();
  const [authModal, setAuthModal] = useRecoilState(AuthModalState);
  const [passReset, setPassReset] = useState(false);

  const handleClose = () => {
    setAuthModal((prev) => ({
      ...prev,
      open: false,
      view: 'overview'
    }));
  };

  useEffect(() => {
    if (authModal.view === 'resetPassword') {
      setPassReset(true);
    } else {
      setPassReset(false);
    }
  }, [authModal]);

  useEffect(() => {
    if (session) {
      setAuthModal({ open: false, view: 'overview' });
    }
  }, [session]);

  return (
    <Modal
      open={authModal.open}
      closeModal={handleClose}
      className='dosis max-w-xs md:max-w-md'
    >
      <div className='text-main-black bg-white px-6 py-3 md:px-10 md:py-8'>
        <div className='flex justify-end'>
          <button
            onClick={() => setAuthModal({ open: false, view: 'overview' })}
          >
            <HeroIcon iconName='XMarkIcon' />
          </button>
        </div>
        <div className='mb-2 py-1 text-center md:mb-6'>
          <h2 className='text-xl font-bold md:text-3xl'>
            {authModal.view === 'login' && 'Kunde login'}
            {authModal.view === 'signup' && 'Tilmeld dig'}
            {authModal.view === 'resetPassword' && 'Nulstille password'}
          </h2>
        </div>
        {authModal.view === 'login' && <AuthLogin />}
        {authModal.view === 'signup' && <AuthSignUp />}
        {authModal.view === 'resetPassword' && <AuthResetPassword />}

        {!passReset && (
          <div className='mt-2'>
            <p
              onClick={() =>
                setAuthModal({
                  open: true,
                  view: authModal.view === 'login' ? 'signup' : 'login'
                })
              }
              className='text-main-gray-sec hover:text-main-black cursor-pointer font-semibold transition-all'
            >
              {authModal.view === 'login' && `Har du ikke en konto?`}
              {authModal.view === 'signup' && 'Har du allerede en bruger?'}
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
}
