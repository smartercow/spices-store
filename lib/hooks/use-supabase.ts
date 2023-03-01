import { useMemo } from 'react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@lib/supabase/database';

export default function useSupabaseMemo() {
  // useMemo hook to prevent the client from being recreated on every render
  return useMemo(createBrowserSupabaseClient, []);
}
