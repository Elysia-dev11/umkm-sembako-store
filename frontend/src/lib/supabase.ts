import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://czitnzwpeqzfnbbosxbz.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Auth helpers
export const auth = {
  signUp: async (email: string, password: string, name: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } }
    });
    if (error) throw error;
    return data;
  },
  
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },
  
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },
  
  getUser: () => supabase.auth.getUser(),
  
  onAuthStateChange: (callback: (event: string, session: any) => void) => 
    supabase.auth.onAuthStateChange(callback),
};

// Products API
export const products = {
  getAll: async (params?: { category?: string; search?: string }) => {
    let query = supabase.from('products').select('*');
    if (params?.category) query = query.eq('category', params.category);
    if (params?.search) query = query.ilike('name', `%${params.search}%`);
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },
  
  getById: async (id: string | number) => {
    const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  },

  getByCategory: async (category: string) => {
    const { data, error } = await supabase.from('products').select('*').eq('category', category);
    if (error) throw error;
    return data;
  },
};

// Categories API
export const categories = {
  getAll: async () => {
    const { data, error } = await supabase.from('products').select('category');
    if (error) throw error;
    // Get unique categories
    const uniqueCategories = [...new Set(data?.map(p => p.category) || [])];
    return uniqueCategories.map(cat => ({ name: cat, slug: cat }));
  },
};

export default supabase;