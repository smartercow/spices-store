import CheckoutLayout from '@components/checkout/layout-checkout';
import CheckoutPayment from '@components/checkout/payment-checkout';

export default function PaymentPage() {
  return (
    <CheckoutLayout>
      <CheckoutPayment />
    </CheckoutLayout>
  );
}
