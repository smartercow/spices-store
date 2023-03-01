import type { SupabaseClient } from '@supabase/auth-helpers-nextjs';

export function getAccount(client: SupabaseClient, id: string) {
  return client.from('accounts').select().eq('id', id).single();
}
