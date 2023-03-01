import useSupabaseMemo from '../use-supabase';
import { useQuery } from '@tanstack/react-query';
import { getProductsByCategory } from './get-products-by-category';

export default function useProductsByCategory(category: number) {
  const client = useSupabaseMemo();
  const key = ['products_by_category', category];

  return useQuery(key, async () => {
    return getProductsByCategory(client, category).then(
      (result) => result.data
    );
  });
}
