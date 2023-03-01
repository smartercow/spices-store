import useOrdersByUserId from '@lib/hooks/use-orders-by-user-id';
import { Order } from '@lib/supabase/types-database';
import AccountOrder from './order-account';

export default function AccountOrders({
  userId
}: {
  userId: string;
}): JSX.Element {
  const { data: orders, isLoading } = useOrdersByUserId(userId);

  return (
    <div>
      <h4 className='text-xl font-bold'>Mine ordrer</h4>
      <div className='accordion-group'>
        {!isLoading && orders && (
          <div>
            {Object(orders).map((order: Order, index: number) => (
              <AccountOrder key={index} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
