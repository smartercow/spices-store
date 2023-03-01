import useSupabaseMemo from '../use-supabase';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from './get-products';

export default function useProducts() {
  const client = useSupabaseMemo();
  const key = ['all_products'];

  return useQuery(key, async () => {
    return getProducts(client).then((result) => result.data);
  });
}
