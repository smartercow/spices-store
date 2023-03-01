import type { SupabaseClient } from '@supabase/auth-helpers-nextjs';

export function getOrderById(client: SupabaseClient, orderId: number) {
  console.log('orderId', orderId);

  return client
    .from('new_orders')
    .select(
      `id,
        order_number,
        account,
        order_products,
        order_total_price,
        delivery_type: delivery (id, name , type),
        created_at`
    )
    .eq('order_number', orderId)
    .single();
}
