import { useState } from 'react';
import { Input } from '@components/ui/input';
import {
  checkoutInputs,
  initialCheckoutInputsValues
} from '@lib/local/checkout-inputs';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { AuthModalState } from '@lib/state/auth-state';
import { useRouter } from 'next/router';
import { CheckoutStepState } from '@lib/state/stepper-state';
import AuthLogin from '@components/auth/auth-login';

const format = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/;

export default function CheckoutAddress(): JSX.Element {
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();
  const setAuthModal = useSetRecoilState(AuthModalState);
  const [stepper, setStepper] = useRecoilState(CheckoutStepState);

  const [checkoutLogin, setCheckoutLogin] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [checkoutSignUpForm, setCheckoutSignUpForm] = useState(
    initialCheckoutInputsValues
  );

  const {
    full_name,
    email,
    password,
    confirm_password,
    street,
    zip_code,
    city,
    mobile_number
  } = checkoutSignUpForm;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckoutSignUpForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));

    if (error) setError('');
  };

  const handleRef = () => {
    const setPrevStep = stepper.steps.map((step) => {
      if (step.step === 'adresse') {
        return {
          ...step,
          active: false,
          completed: true
        };
      }
      return step;
    });

    setStepper({
      ...stepper,
      steps: [
        ...setPrevStep,
        {
          step: 'betaling',
          active: true,
          completed: false
        }
      ]
    });

    router.push('/kassen/betaling');
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (error) setError('');

    if (format.test(email)) return setError('Ugyldig email');
    if (password !== confirm_password) return setError('Password matcher ikke');
    if (password.length < 6)
      return setError('Adgangskoden skal være på mindst 6 tegn');
    if (!full_name) return setError('Du skal udfylde dit fulde navn');
    if (!street) return setError('Du skal udfylde din adresse');
    if (!zip_code) return setError('Du skal udfylde dit postnummer');
    if (!city) return setError('Du skal udfylde din by');

    if (email && password.length >= 6) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email: email,
          password: password,
          options: {
            data: {
              full_name: full_name,
              street: street,
              zip_code: zip_code,
              city: city,
              mobile_number: mobile_number ?? null,
              user_info_added: true
            }
          }
        });
        if (error) throw error;
      } catch (error) {
        setError('FEJL under oprettelse af bruger!');
      } finally {
        setCheckoutLogin(true);
      }
    }
  };

  return (
    <>
      {!checkoutLogin && (
        <form onSubmit={onSubmit} className='checkout-form'>
          <div className='w-full space-y-6'>
            <div className='checkout-box checkout-box-grid'>
              <div className='grid place-items-center'>
                <div className='space-y-4 text-center'>
                  <h4 className='h4ding'>Har du allerede en konto?</h4>
                  <button
                    className='btn-rounded btn-error btn px-8'
                    onClick={() => setAuthModal({ open: true, view: 'login' })}
                  >
                    Log Ind
                  </button>
                </div>
              </div>
              <div className='space-y-4'>
                <h4 className='h4ding'>Jeg er ny her</h4>
                <div className='space-y-4'>
                  {checkoutInputs.slice(5, 8).map((input) => (
                    <Input
                      key={input.name}
                      {...input}
                      handleChange={handleChange}
                      noColon
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className='checkout-box space-y-8'>
              <div className='space-y-4'>
                <h4 className='h4ding'>Leveringadresse</h4>
                <div className='checkout-box-grid'>
                  {checkoutInputs.slice(0, 4).map((input) => (
                    <Input
                      key={input.name}
                      {...input}
                      handleChange={handleChange}
                      noColon
                    />
                  ))}
                </div>
              </div>
              <div className='space-y-4'>
                <div>
                  <h4 className='h4ding'>Øverige oplysninger</h4>
                  <p className='text-sm'>
                    Vi sender dig en automatisk SMS når pakken er klar til
                    afhentning.
                  </p>
                </div>
                <div className='checkout-box-grid'>
                  <Input
                    {...checkoutInputs[4]}
                    handleChange={handleChange}
                    noColon
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='checkout-sidebar-grid'>
            <div className='checkout-sidebar-box'>
              <div></div>
              <div className='space-y-4'>
                <div>
                  <button type='submit' className='btn-error btn'>
                    {session ? 'Fortsæt' : 'Opret bruger'}
                  </button>
                </div>
                {error && (
                  <p className='text-lg font-bold text-error'>{error}</p>
                )}
              </div>
            </div>
          </div>
        </form>
      )}

      {checkoutLogin && (
        <div className='grid h-full w-full place-items-center'>
          <div className='w-full max-w-xl space-y-6 rounded-md bg-white py-8 px-10 xl:rounded-lg xl:px-14 xl:py-10'>
            <h1 className='text-xl font-bold'>Log Ind</h1>
            <AuthLogin
              checkoutLogin
              setCheckoutLogin={setCheckoutLogin}
              handleRef={handleRef}
            />
          </div>
        </div>
      )}
    </>
  );
}
