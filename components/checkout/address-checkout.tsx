import { useState } from 'react';
import { Input } from '@components/ui/input';
import {
  checkoutInputs,
  initialCheckoutInputsValues,
  UserSignupInfo
} from '@lib/local/checkout-inputs';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { AuthModalState } from '@lib/state/auth-state';
import { useRouter } from 'next/router';
import { CheckoutStepState } from '@lib/state/stepper-state';
import AuthLogin from '@components/auth/auth-login';
import { toast } from 'react-toastify';
import { CheckoutState } from '@lib/state/checkout-state';

export default function CheckoutAddress(): JSX.Element {
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();

  const setAuthModal = useSetRecoilState(AuthModalState);
  const [checkoutState, setCheckoutState] = useRecoilState(CheckoutState);
  const [stepper, setStepper] = useRecoilState(CheckoutStepState);

  const [checkoutLogin, setCheckoutLogin] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [checkoutSignUpForm, setCheckoutSignUpForm] = useState<UserSignupInfo>(
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

  const validateNumberInput = (
    name: string,
    value: string,
    isNumber: boolean,
    errorMessage: string
  ) => {
    if (isNumber) {
      const ageRegex = /^[0-9\b]+$/;
      if (!ageRegex.test(value)) {
        toast.error(errorMessage);
        return;
      }
    }

    setCheckoutSignUpForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case 'mobile_number': {
        const errorMessage = 'Indtast kun tal for mobile nummer!';
        validateNumberInput(name, value, true, errorMessage);
        break;
      }
      case 'zip_code': {
        const errorMessage = 'Indtast kun tal for postnummer!';
        validateNumberInput(name, value, true, errorMessage);
        break;
      }
      default: {
        setCheckoutSignUpForm((prevState) => ({ ...prevState, [name]: value }));
        break;
      }
    }
  };

  const handleRef = () => {
    if (!full_name || !street || !zip_code || !city) {
      setError('Du skal udfylde alle felter!');
      return;
    }

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

    setCheckoutState({
      ...checkoutState,
      currentCheckoutId: stepper.stepperId
    });

    router.push('/kassen/betaling');
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (error) setError('');

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
                      handleChange={handleInputChange}
                      noColon
                      value={
                        input.name === 'email'
                          ? email
                          : input.name === 'password'
                          ? password
                          : confirm_password
                      }
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
                      handleChange={handleInputChange}
                      noColon
                      value={
                        input.name === 'full_name'
                          ? full_name
                          : input.name === 'street'
                          ? street
                          : input.name === 'zip_code'
                          ? zip_code
                          : city
                      }
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
                    handleChange={handleInputChange}
                    noColon
                    value={mobile_number}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='checkout-sidebar-grid'>
            <div className='checkout-sidebar-box grid place-items-center space-y-0'>
              <div className='inline-block xl:hidden'></div>
              <div className='space-y-4'>
                <button
                  type='submit'
                  className='bt-lg btn-rounded btn-error btn whitespace-nowrap'
                >
                  {session ? 'Fortsæt' : 'Opret bruger'}
                </button>
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
