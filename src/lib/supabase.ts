import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase configuration');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Product = {
  id: string;
  slug: string;
  name: string;
  subtitle: string | null;
  price_cents: number;
  image_url: string;
  is_featured: boolean;
  category_id: string | null;
};

export type Category = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  position: number;
};
