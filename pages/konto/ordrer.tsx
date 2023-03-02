import AccountOrders from '@components/account/orders/orders-account';
import { useUser } from '@supabase/auth-helpers-react';

export default function AccountOrdersPage() {
  const user = useUser();
  return (
    <section className='mx-auto max-w-3xl'>
      {user && <AccountOrders userId={user.id} />}
    </section>
  );
}
