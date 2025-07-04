
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
  refreshProducts: () => Promise<void>;
}

export const useSupabaseProductStore = create<SupabaseProductState>((set, get) => ({
  products: [],
  loading: false,

  fetchProducts: async () => {
    set({ loading: true });
    try {
      console.log('Fetching products from database...');
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to fetch products');
        return;
      }

      console.log('Products fetched successfully:', data?.length);
      set({ products: data || [] });
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while fetching products');
    } finally {
      set({ loading: false });
    }
  },

  refreshProducts: async () => {
    // Force refresh without loading state
    try {
      console.log('Force refreshing products...');
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error refreshing products:', error);
        return;
      }

      console.log('Products refreshed successfully:', data?.length);
      set({ products: data || [] });
    } catch (error) {
      console.error('Error refreshing products:', error);
    }
  },

  addProduct: async (product) => {
    try {
      console.log('Adding product:', product);
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

      console.log('Product added successfully:', data);
      
      // Force refresh to get latest state
      await get().refreshProducts();
      toast.success('Product added successfully!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while adding the product');
    }
  },

  updateProduct: async (product) => {
    try {
      console.log('Updating product with ID:', product.id);

      const updateData = {
        title: product.title,
        price: Number(product.price),
        original_price: product.original_price ? Number(product.original_price) : null,
        discount_percentage: Number(product.discount_percentage),
        image: product.image,
        rating: Number(product.rating),
        rating_count: Number(product.rating_count),
        category: product.category,
        description: product.description,
        stock: Number(product.stock),
        sku: product.sku
      };

      console.log('Update data:', updateData);

      const { error } = await supabase
        .from('products')
        .update(updateData)
        .eq('id', product.id);

      if (error) {
        console.error('Error updating product:', error);
        toast.error(`Failed to update product: ${error.message}`);
        return;
      }

      console.log('Product updated successfully');
      
      // Force refresh to get latest state
      await get().refreshProducts();
      toast.success('Product updated successfully!');
    } catch (error) {
      console.error('Catch error updating product:', error);
      toast.error('An error occurred while updating the product');
    }
  },

  deleteProduct: async (id) => {
    try {
      console.log('Deleting product with ID:', id);
      
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting product:', error);
        toast.error('Failed to delete product');
        return;
      }

      console.log('Product deleted successfully');
      
      // Force refresh to get latest state
      await get().refreshProducts();
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
