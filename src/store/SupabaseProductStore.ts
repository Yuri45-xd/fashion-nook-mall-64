
import { create } from "zustand";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type DatabaseProduct = {
  id: number;
  title: string;
  price: number;
  original_price: number | null;
  discount_percentage: number;
  image: string | null;
  rating: number;
  rating_count: number;
  category: string;
  description: string | null;
  stock: number;
  sku: string | null;
  created_at: string;
  updated_at: string;
};

interface SupabaseProductState {
  products: DatabaseProduct[];
  loading: boolean;
  fetchProducts: () => Promise<void>;
  addProduct: (product: Omit<DatabaseProduct, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateProduct: (product: DatabaseProduct) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  getProductsByCategory: (category: string) => DatabaseProduct[];
}

export const useSupabaseProductStore = create<SupabaseProductState>((set, get) => ({
  products: [],
  loading: false,

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to fetch products');
        return;
      }

      set({ products: data || [] });
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while fetching products');
    } finally {
      set({ loading: false });
    }
  },

  addProduct: async (product) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select()
        .single();

      if (error) {
        console.error('Error adding product:', error);
        toast.error('Failed to add product');
        return;
      }

      set((state) => ({
        products: [data, ...state.products]
      }));

      toast.success('Product added successfully!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while adding the product');
    }
  },

  updateProduct: async (product) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .update({
          title: product.title,
          price: product.price,
          original_price: product.original_price,
          discount_percentage: product.discount_percentage,
          image: product.image,
          rating: product.rating,
          rating_count: product.rating_count,
          category: product.category,
          description: product.description,
          stock: product.stock,
          sku: product.sku
        })
        .eq('id', product.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating product:', error);
        toast.error('Failed to update product');
        return;
      }

      set((state) => ({
        products: state.products.map(p => p.id === product.id ? data : p)
      }));

      toast.success('Product updated successfully!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while updating the product');
    }
  },

  deleteProduct: async (id) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting product:', error);
        toast.error('Failed to delete product');
        return;
      }

      set((state) => ({
        products: state.products.filter(p => p.id !== id)
      }));

      toast.success('Product deleted successfully!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while deleting the product');
    }
  },

  getProductsByCategory: (category: string) => {
    return get().products.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    );
  },
}));
