import useSupabaseMemo from '../use-supabase';
import { useQuery } from '@tanstack/react-query';
import { getOrdersByUserId } from './get-orders-by-user-id';

export default function useOrdersByUserId(userId: string) {
  const client = useSupabaseMemo();
  const key = ['order-by-id', userId];

  return useQuery(key, async () => {
    return getOrdersByUserId(client, userId).then((result) => result.data);
  });
}
