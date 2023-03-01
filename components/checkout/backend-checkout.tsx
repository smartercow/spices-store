import { CheckoutState } from '@lib/state/checkout-state';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';

type CheckoutBackendProps = {
  products: { cartItemId: number; quantity: number }[];
  handleRef: () => void;
  totalPrice: number;
  orderNumber: number;
};

export default function CheckoutBackend({
  products,
  handleRef,
  totalPrice,
  orderNumber
}: CheckoutBackendProps): JSX.Element {
  const user = useUser();
  const supabase = useSupabaseClient();
  const checkoutState = useRecoilValue(CheckoutState);

  async function onSubmit() {
    if (!user) return;
    const response = await supabase.from('new_orders').insert({
      account: user.id,
      order_products: products,
      delivery: checkoutState.deliveryType === 'standard' ? 1 : 2,
      order_total_price: totalPrice,
      order_number: orderNumber
    });

    handleRef();
    if (response.error) {
      toast.error(response.error.message);
    }
  }
  return (
    <div className='pt-4 text-right'>
      <button className='btn-error btn-md btn xl:btn-lg' onClick={onSubmit}>
        Bekæft køb
      </button>
    </div>
  );
}
