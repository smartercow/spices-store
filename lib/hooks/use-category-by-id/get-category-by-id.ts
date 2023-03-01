import type { SupabaseClient } from '@supabase/auth-helpers-nextjs';

export function getCategoryById(client: SupabaseClient, category: number) {
  return client.from('categories').select('*').eq('id', category).single();
}
