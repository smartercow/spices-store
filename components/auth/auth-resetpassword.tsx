import { useSetRecoilState } from 'recoil';
import { useState } from 'react';
import { AuthModalState } from '@lib/state/auth-state';
import { Input } from '@components/ui/input';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

export default function AuthResetPassword(): JSX.Element {
  const supabase = useSupabaseClient();

  const setAuthModal = useSetRecoilState(AuthModalState);

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const format = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/;

  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    if (format.test(email)) return setError('Invalid email');
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) setError(error.message);
    else setMessage('Check your email for the password reset link');
    setLoading(false);
  };
  return (
    <>
      <form onSubmit={handlePasswordReset} className='flex flex-col gap-2'>
        <div>
          <p className='text-sm font-medium'>
            Fortæl os den emailadresse, der er knyttet til din Spices konto, og
            vi sender dig en email for at nulstille din adgangskode.
          </p>
        </div>
        <div></div>
        <div className='flex flex-col gap-4'>
          <Input
            handleChange={(e: any) => setEmail(e.target.value)}
            name={'reset-password'}
            label={'Email'}
            type={'email'}
            noColon
            placeholder={'Indtast din email'}
          />

          <button type='submit' disabled={loading} className='btn-error btn'>
            Send mig en email
          </button>
          <div className='mt-2'>
            {message && (
              <p className='font-semibold text-secondary'>{message}</p>
            )}
            {error && <p className='font-semibold text-primary'>{error}</p>}
          </div>
        </div>
        <span className='py-2'>
          <p
            onClick={() => setAuthModal({ open: true, view: 'login' })}
            className='hover:text-main-gray-sec cursor-pointer font-semibold text-main-black transition-all'
          >
            Log Ind
          </p>
        </span>
      </form>
    </>
  );
}
