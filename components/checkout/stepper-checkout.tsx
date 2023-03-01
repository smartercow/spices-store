import { useRouter } from 'next/router';
import cn from 'clsx';
import { useRecoilValue } from 'recoil';
import { CheckoutStepState } from '@lib/state/stepper-state';
import { CheckoutState } from '@lib/state/checkout-state';

type STEP_PATH = 'adresse' | 'betaling' | 'bekraeft' | 'faerdig' | 'faktura';

export default function CheckoutStepper(): JSX.Element {
  const router = useRouter();
  const stepper = useRecoilValue(CheckoutStepState);
  const checkoutState = useRecoilValue(CheckoutState);
  const steps = stepper.steps;
  const checkoutDone = checkoutState.checkoutDone;

  const address = router.pathname.startsWith('/kassen/adresse');
  const betaling = router.pathname.startsWith('/kassen/betaling');
  const bekraeft = router.pathname.startsWith('/kassen/bekraeft');
  const faerdig = router.pathname.startsWith('/kassen/faerdig');
  // const faktura = router.pathname.startsWith('/kassen/faktura');

  const stepPath = address
    ? 'adresse'
    : betaling
    ? 'betaling'
    : bekraeft
    ? 'bekraeft'
    : faerdig
    ? 'faerdig'
    : 'faktura';

  const currentStep = steps.find((step) => step.step === stepPath);

  const adresse_step = steps.find((step) => step.step === 'adresse');
  const betaling_step = steps.find((step) => step.step === 'betaling');
  const bekraeft_step = steps.find((step) => step.step === 'bekraeft');
  const faerdig_step = steps.find((step) => step.step === 'faerdig');

  const addressStep =
    (currentStep?.step === 'adresse' && currentStep?.active && 'active') ||
    (adresse_step?.completed && 'completed');
  const betalingStep =
    (currentStep?.step === 'betaling' && currentStep?.active && 'active') ||
    (betaling_step?.completed && 'completed');
  const bekraeftStep =
    (currentStep?.step === 'bekraeft' && currentStep?.active && 'active') ||
    (bekraeft_step?.completed && 'completed');
  const faerdigStep =
    (currentStep?.step === 'faerdig' && currentStep?.active && 'active') ||
    (faerdig_step?.completed && 'completed');

  const notLoading =
    addressStep === 'active' ||
    addressStep === 'completed' ||
    betalingStep === 'active' ||
    betalingStep === 'completed' ||
    bekraeftStep === 'active' ||
    bekraeftStep === 'completed' ||
    faerdigStep === 'active' ||
    faerdigStep === 'completed';

  return (
    <div className='w-full py-4'>
      {checkoutDone ||
        (router && notLoading && (
          <ol className='steps'>
            <>
              <li
                className={cn(
                  'step overflow-hidden',
                  addressStep === 'active'
                    ? 'step-active step-error'
                    : addressStep === 'completed' || checkoutDone
                    ? 'step-error step-done'
                    : ''
                )}
              >
                <div className='step-circle'>1</div>
                <h3>Adresse</h3>
              </li>
              <li
                className={cn(
                  'step overflow-hidden',
                  betalingStep === 'active'
                    ? 'step-active step-error'
                    : betalingStep === 'completed' || checkoutDone
                    ? 'step-error step-done '
                    : ''
                )}
              >
                <div className='step-circle'>2</div>
                <h3>Betaling</h3>
              </li>
              <li
                className={cn(
                  'step overflow-hidden',
                  bekraeftStep === 'active'
                    ? 'step-active step-error'
                    : bekraeftStep === 'completed' || checkoutDone
                    ? 'step-error step-done '
                    : ''
                )}
              >
                <div className='step-circle'>3</div>
                <h3>Bekræft</h3>
              </li>
              <li
                className={cn(
                  'step-error step overflow-hidden',
                  checkoutDone
                    ? 'step-active step-error'
                    : faerdigStep === 'completed'
                    ? 'step-error step-done '
                    : ''
                )}
              >
                <div className='step-circle'>4</div>
                <h3>Færdig</h3>
              </li>
            </>
          </ol>
        ))}
    </div>
  );
}
