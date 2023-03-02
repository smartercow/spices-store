import { Order } from '@lib/supabase/types-database';
import AccountProduct, { AccountProductProps } from './product-account';
import cn from 'clsx';
import useOrderById from '@lib/hooks/use-order-by-id';

export type AccountOrderProps = {
  order?: Order;
  isInvoice?: boolean;
  orderNumber?: number;
};

export default function AccountOrder({
  order,
  isInvoice,
  orderNumber
}: AccountOrderProps): JSX.Element {
  const { data: invoiceOrder, isLoading } = useOrderById(orderNumber ?? 0);
  const currentOrder = isInvoice ? invoiceOrder : order;

  return (
    <>
      {!isLoading && currentOrder && (
        <div
          className={cn(
            'accordion-group-bordered accordion-group-hover accordion',
            isInvoice && 'accordion-open'
          )}
        >
          <input
            type='checkbox'
            id={`${currentOrder.order_number}`}
            className='accordion-toggle'
          />

          <label
            htmlFor={`${currentOrder.order_number}`}
            className='accordion-title flex w-full px-4'
          >
            <p className='scale-x-[1] text-sm'>
              {String(currentOrder.created_at).slice(0, 10)}
            </p>
            <h4 className='h4ding '>
              Order nummer: {currentOrder.order_number}
            </h4>
          </label>

          <div className='accordion-content'>
            <div className='min-h-0 space-y-2 px-4'>
              {Object(currentOrder.order_products)?.map(
                (item: AccountProductProps, index: number) => (
                  <AccountProduct
                    key={index}
                    cartItemId={item.cartItemId}
                    quantity={item.quantity}
                  />
                )
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
