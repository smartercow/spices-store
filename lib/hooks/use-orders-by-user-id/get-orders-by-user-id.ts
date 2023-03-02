import type { SupabaseClient } from '@supabase/auth-helpers-nextjs';

export function getOrdersByUserId(client: SupabaseClient, userId: string) {
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
    .order('created_at', { ascending: false })
    .eq('account', userId);
}
