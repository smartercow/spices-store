import { Database } from './database';

export type Account = Database['public']['Tables']['accounts']['Row'];
export type Product = Database['public']['Tables']['products']['Row'];
export type Category = Database['public']['Tables']['categories']['Row'];
