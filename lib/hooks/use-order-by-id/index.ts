import useSupabaseMemo from '../use-supabase';
import { useQuery } from '@tanstack/react-query';
import { getOrderById } from './get-order-by-id';

export default function useOrderById(orderId: number) {
  const client = useSupabaseMemo();
  const key = ['order-by-id', orderId];

  return useQuery(key, async () => {
    return getOrderById(client, orderId).then((result) => result.data);
  });
}
