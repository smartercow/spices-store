import CheckoutInvoice from '@components/checkout/invoice-checkout';
import CheckoutLayout from '@components/checkout/layout-checkout';

export default function InvoicePage(): JSX.Element {
  return (
    <CheckoutLayout>
      <CheckoutInvoice />
    </CheckoutLayout>
  );
}
