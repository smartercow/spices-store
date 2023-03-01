import { LayoutProps } from '@components/layout/layout';
import CheckoutStepper from './stepper-checkout';

export default function CheckoutLayout({ children }: LayoutProps): JSX.Element {
  return (
    <section className='space-y-4'>
      <CheckoutStepper />
      <div>{children}</div>
    </section>
  );
}
