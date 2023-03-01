import { useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useSetRecoilState } from 'recoil';
import { AuthModalState } from '@lib/state/auth-state';
import { authSignUpInputs } from '@lib/local/auth-inputs';
import { Input } from '@components/ui/input';

const initialInputsValues = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

export default function AuthSignUp(): JSX.Element {
  const supabase = useSupabaseClient();
  const [signUpForm, setSignUpForm] = useState(initialInputsValues);
  const { fullName, email, password, confirmPassword } = signUpForm;
  const [error, setError] = useState<string>('');
  const setAuthState = useSetRecoilState(AuthModalState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  const format = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/;

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (error) setError('');

    if (format.test(email)) return setError('Invalid email');
    if (password !== confirmPassword) return setError('Password do not match');
    if (password.length < 6)
      return setError('Password must be at least 6 characters long');

    if (email && password.length >= 6) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email: email,
          password: password,
          options: {
            data: {
              full_name: fullName
            }
          }
        });
        if (error) throw error;
      } catch (error) {
        setError('ERROR while signing up!');
      } finally {
        setAuthState({ open: true, view: 'login' });
      }
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit} className='flex flex-col gap-3'>
        {authSignUpInputs.map((input) => (
          <Input
            key={input.name}
            {...input}
            handleChange={handleChange}
            labelClassName='text-[14px] font-bold'
            className='auth-inputs'
            noColon
          />
        ))}
        <button type='submit' className='btn-error btn'>
          Sign Up
        </button>
      </form>

      {error && <p className='text-c-red'>{error}</p>}
    </div>
  );
}
