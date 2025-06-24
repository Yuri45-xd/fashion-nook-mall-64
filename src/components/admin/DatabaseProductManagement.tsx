
import { useState, useEffect } from "react";
import { useSupabaseProductStore, DatabaseProduct } from "../../store/SupabaseProductStore";
import { supabase } from "@/integrations/supabase/client";
import DatabaseProductEditor from "./DatabaseProductEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Plus, Edit3, Trash2, Loader2, Search, Filter } from "lucide-react";

const DatabaseProductManagement = () => {
  const { products, loading, fetchProducts, deleteProduct, refreshProducts } = useSupabaseProductStore();
  const [editingProduct, setEditingProduct] = useState<DatabaseProduct | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    console.log('Initial products fetch');
    fetchProducts();
    
    // Set up real-time updates with more comprehensive listening
    const channel = supabase
      .channel('products-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'products'
        },
        (payload) => {
          console.log('Real-time update received:', payload);
          // Always refresh on any change
          refreshProducts();
        }
      )
      .subscribe((status) => {
        console.log('Real-time subscription status:', status);
      });

    return () => {
      console.log('Cleaning up real-time subscription');
      supabase.removeChannel(channel);
    };
  }, [fetchProducts, refreshProducts]);

  const handleEdit = (product: DatabaseProduct) => {
    setEditingProduct(product);
    setShowEditor(true);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setShowEditor(true);
  };

  const handleDelete = async (product: DatabaseProduct) => {
    if (confirm(`Are you sure you want to delete "${product.title}"?`)) {
      console.log('Deleting product:', product.id);
      await deleteProduct(product.id);
    }
  };

  const handleSave = async () => {
    console.log('Product saved, refreshing and closing editor');
    setShowEditor(false);
    setEditingProduct(null);
    // Force refresh after save
    await refreshProducts();
  };

  const handleCancel = () => {
    setShowEditor(false);
    setEditingProduct(null);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(products.map(p => p.category)));

  if (showEditor) {
    return (
      <div className="p-4">
        <DatabaseProductEditor
          product={editingProduct || undefined}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Product Management ({products.length} products)
            </div>
            <div className="flex gap-2">
              <Button onClick={() => refreshProducts()} variant="outline" size="sm">
                Refresh
              </Button>
              <Button onClick={handleAdd} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border rounded-md bg-white"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mb-4">
            Managing products in the central database. Changes are reflected in real-time across all users.
          </p>
        </CardContent>
      </Card>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin" />
          <span className="ml-2">Loading products...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <Card key={`product-${product.id}-${product.updated_at}-${Date.now()}`} className="relative group hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="aspect-square mb-3 overflow-hidden rounded-md bg-gray-100">
                  <img
                    src={product.image || '/placeholder.svg'}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <h3 className="font-medium text-sm leading-tight line-clamp-2 flex-1">
                      {product.title}
                    </h3>
                    <Badge 
                      variant={product.stock > 10 ? "default" : product.stock > 0 ? "secondary" : "destructive"}
                      className="ml-2 text-xs"
                    >
                      {product.stock}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <div className="flex flex-col">
                      <span className="font-semibold text-lg text-black">₹{product.price}</span>
                      {product.original_price && product.original_price > product.price && (
                        <span className="line-through text-gray-400">₹{product.original_price}</span>
                      )}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {product.category}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>⭐ {product.rating} ({product.rating_count})</span>
                    <span>SKU: {product.sku || 'N/A'}</span>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(product)}
                      className="flex-1"
                    >
                      <Edit3 className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(product)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!loading && filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">
            {searchTerm ? "No products found matching your search" : "No products found"}
          </p>
          <Button onClick={handleAdd}>
            <Plus className="w-4 h-4 mr-2" />
            Add First Product
          </Button>
        </div>
      )}
    </div>
  );
};

export default DatabaseProductManagement;
