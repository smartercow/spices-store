import useSupabaseMemo from '../use-supabase';
import { useQuery } from '@tanstack/react-query';
import { getCategoryById } from './get-product-by-id';

export default function useProductById(productId: number) {
  const client = useSupabaseMemo();
  const key = ['product-by-id', productId];

  return useQuery(key, async () => {
    return getCategoryById(client, productId).then((result) => result.data);
  });
}
