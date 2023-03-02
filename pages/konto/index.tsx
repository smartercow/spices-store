import AccountOrders from '@components/account/orders/orders-account';
import CheckoutCreditCard from '@components/checkout/creditcard-checkout';
import CheckoutUserInfo from '@components/checkout/userinfo-checkout';
import { useUser } from '@supabase/auth-helpers-react';

export default function AcountPage() {
  const user = useUser();
  return (
    <>
      {user && (
        <section className='space-y-6 xl:space-y-8'>
          <div className='checkout-box'>
            <h2 className='text-xl font-bold xl:text-2xl'>Konto</h2>
          </div>
          <div className='checkout-form'>
            <AccountOrders userId={user.id} />
            <div className='space-y-8'>
              <CheckoutUserInfo isPreview />
              {/* <CheckoutCreditCard isPreview /> */}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
