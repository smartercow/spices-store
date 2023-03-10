import type { SupabaseClient } from '@supabase/auth-helpers-nextjs';

export function getCategoryById(client: SupabaseClient, productId: number) {
  return client
    .from('products')
    .select(
      ` id,
        name,
        description,
        price,
        preview,
        stock,
        sale,
        sale_price,
        sale_text,
        category: category_id (id, name ,path),
        featured: featured_in (id, name ,path),
        weight
      `
    )
    .eq('id', productId)
    .single();
}
