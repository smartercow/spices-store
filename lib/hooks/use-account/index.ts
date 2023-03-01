import useSupabaseMemo from '../use-supabase';
import { useQuery } from '@tanstack/react-query';
import { getAccount } from './get-account';

export default function useAccount(id: string) {
  const client = useSupabaseMemo();
  const key = ['session_account', id];

  return useQuery(key, async () => {
    return getAccount(client, id).then((result) => result.data);
  });
}
