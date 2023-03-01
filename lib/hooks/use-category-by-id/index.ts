import useSupabaseMemo from '../use-supabase';
import { useQuery } from '@tanstack/react-query';
import { getCategoryById } from './get-category-by-id';

export default function useCategoryById(category: number) {
  const client = useSupabaseMemo();
  const key = ['category-by-id', category];

  return useQuery(key, async () => {
    return getCategoryById(client, category).then((result) => result.data);
  });
}
