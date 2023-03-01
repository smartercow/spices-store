import { Input } from '@components/ui/input';
import useAccount from '@lib/hooks/use-account';
import {
  checkoutInputs,
  initialCheckoutUserData,
  UserData
} from '@lib/local/checkout-inputs';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import cn from 'clsx';
import { useRecoilState } from 'recoil';
import { CheckoutStepState } from '@lib/state/stepper-state';
import { useRouter } from 'next/router';

export default function CheckoutUserInfo(): JSX.Element {
  const user = useUser();
  const router = useRouter();
  const supabase = useSupabaseClient();
  const { data: userData, isLoading: userDataLoading } = useAccount(
    user?.id || ''
  );
  const [stepper, setStepper] = useRecoilState(CheckoutStepState);

  const [checkoutUserData, setCheckoutUserData] = useState<UserData>(
    initialCheckoutUserData
  );

  const [error, setError] = useState<string>('');

  const { full_name, street, zip_code, city, mobile_number } = checkoutUserData;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckoutUserData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));

    if (error) setError('');
  };

  const {
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm<UserData>();

  const handleRef = (path: string) => {
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

    router.push(path);
  };

  useEffect(() => {
    if (userData) {
      setCheckoutUserData((prev) => ({
        ...prev,
        full_name: userData.full_name,
        street: userData.street,
        zip_code: userData.zip_code,
        city: userData.city,
        mobile_number: userData.mobile_number
      }));
    }
  }, [userData]);

  async function onSubmit(data: UserData) {
    if (!user) return;
    const response = await supabase
      .from('accounts')
      .update({
        full_name: full_name,
        street: street,
        zip_code: zip_code,
        city: city
      })
      .eq('id', user.id);

    if (response.error) {
      toast.error(response.error.message);
    }

    if (!!data) {
      toast.success('Dine ændringer er blevet gemt!');
    }
  }

  return (
    <>
      {!userDataLoading && userData && (
        <form className='checkout-form' onSubmit={handleSubmit(onSubmit)}>
          <div className='checkout-box space-y-8'>
            <div className='space-y-4'>
              <h4 className='h4ding'>Leveringadresse</h4>
              <div className='checkout-box-grid items-center'>
                {checkoutInputs.slice(0, 5).map((input) => (
                  <Input
                    key={input.name}
                    {...input}
                    handleChange={handleChange}
                    noColon
                    value={
                      input.name === 'full_name'
                        ? full_name
                        : input.name === 'street'
                        ? street
                        : input.name === 'zip_code'
                        ? zip_code
                        : input.name === 'city'
                        ? city
                        : input.name === 'mobile_number'
                        ? mobile_number
                        : ''
                    }
                  />
                ))}
                <div className='grid h-full place-items-end text-right'>
                  <button
                    type='submit'
                    className={cn(
                      'btn-error btn min-w-[6rem]',
                      isSubmitting && 'btn-loading'
                    )}
                  >
                    {!isSubmitting && 'Rediger'}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='checkout-sidebar-grid'>
            <div className='checkout-sidebar-box'>
              <div></div>
              <div className='space-y-4'>
                <div>
                  <button
                    type='button'
                    className='btn-error btn'
                    onClick={() => handleRef('/kassen/betaling')}
                  >
                    Videre
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
    </>
  );
}
