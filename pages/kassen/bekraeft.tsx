import CheckoutConfirm from '@components/checkout/confirm-checkout';
import CheckoutLayout from '@components/checkout/layout-checkout';

export default function ConfirmPage() {
  return (
    <CheckoutLayout>
      <CheckoutConfirm />
    </CheckoutLayout>
  );
}
