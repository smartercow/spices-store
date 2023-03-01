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
import { useRecoilState, useSetRecoilState } from 'recoil';
import { CheckoutStepState } from '@lib/state/stepper-state';
import { useRouter } from 'next/router';
import { CheckoutState } from '@lib/state/checkout-state';

type CheckoutUserInfoProps = {
  isPreview?: boolean;
};

export default function CheckoutUserInfo({
  isPreview
}: CheckoutUserInfoProps): JSX.Element {
  const user = useUser();
  const router = useRouter();
  const supabase = useSupabaseClient();
  const { data: userData, isLoading: userDataLoading } = useAccount(
    user?.id || ''
  );

  const [checkoutState, setCheckoutState] = useRecoilState(CheckoutState);
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
    if (!user) return;
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

  const hideEmptyInput = isPreview && !mobile_number;

  return (
    <>
      {!userDataLoading && userData && (
        <form
          className={cn(isPreview ? '' : 'checkout-form')}
          onSubmit={handleSubmit(onSubmit)}
        >
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
                    hidden={input.name === 'mobile_number' && hideEmptyInput}
                    isPreview={isPreview}
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
                <div className={cn(isPreview ? 'hidden' : 'inline-grid')}>
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
          </div>
          <div
            className={cn(
              'checkout-sidebar-grid-hidden',
              isPreview ? 'hidden' : 'inline-grid'
            )}
          >
            <div className='checkout-sidebar-grid'>
              <div className='checkout-sidebar-box grid w-full grid-cols-1 place-items-center space-y-0'>
                <div className='inline-block xl:hidden'></div>
                <div className='space-y-4 text-center'>
                  <div>
                    <button
                      type='button'
                      className='btn-error btn-md btn md:btn-lg'
                      onClick={() => handleRef('/kassen/betaling')}
                    >
                      Fortsæt
                    </button>
                  </div>
                  {error && (
                    <p className='text-lg font-bold text-error'>{error}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
