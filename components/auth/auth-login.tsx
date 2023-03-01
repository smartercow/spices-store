import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { AuthModalState } from '@lib/state/auth-state';
import { Input } from '@components/ui/input';
import { authLoginInputs } from '@lib/local/auth-inputs';
import { useRouter } from 'next/navigation';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

const initialTextInputs = {
  email: '',
  password: ''
};

export default function AuthLogin(): JSX.Element {
  const supabase = useSupabaseClient();

  const router = useRouter();
  const [loginForm, setLoginForm] = useState(initialTextInputs);
  const { email, password } = loginForm;
  const [error, setError] = useState('');

  const setAuthModalState = useSetRecoilState(AuthModalState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));

    if (error) setError('');
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (error) setError('');

    if (email && password) {
      try {
        const res = await supabase.auth.signInWithPassword({
          email: email,
          password: password
        });
        if (res.error) throw res.error;
        /*         const urserId = res.data.user?.id;
        console.log('urserId', urserId); */

        setAuthModalState({ open: false, view: 'login' });
        router.refresh();
      } catch (error) {
        setError('ERROR while logging in!');
      }
    } else {
      setError('Please fill all fields');
    }
  };
  return (
    <>
      <form onSubmit={onSubmit} className='flex flex-col gap-5 text-main-black'>
        {authLoginInputs.map((input) => (
          <Input
            key={input.name}
            {...input}
            handleChange={handleChange}
            noColon
          />
        ))}

        <div className='flex w-full justify-between gap-1 font-semibold'>
          <span className='flex items-center gap-1'>
            <input
              type='checkbox'
              name='remember'
              value='Remember me'
              className='h-5 w-5'
            />
            <label htmlFor='remember' className='form-label'>
              Husk mig
            </label>
          </span>
          <span>
            <p
              onClick={() =>
                setAuthModalState({ open: true, view: 'resetPassword' })
              }
              className='form-label cursor-pointer'
            >
              Glemt password ?
            </p>
          </span>
        </div>

        <button type='submit' className='btn-error btn'>
          Log Ind
        </button>
      </form>
    </>
  );
}
