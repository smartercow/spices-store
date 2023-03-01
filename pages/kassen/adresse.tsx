import CheckoutAddress from '@components/checkout/address-checkout';
import CheckoutLayout from '@components/checkout/layout-checkout';
import CheckoutUserInfo from '@components/checkout/userinfo-checkout';
import { useSession } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';

export default function AddressPage() {
  const session = useSession();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (session) {
      setLoading(false);
    }
  }, [session]);

  return (
    <CheckoutLayout>
      {<>{session ? <CheckoutUserInfo /> : <CheckoutAddress />}</>}
      {/* {loading && <div>Loading...</div>} */}
    </CheckoutLayout>
  );
}
