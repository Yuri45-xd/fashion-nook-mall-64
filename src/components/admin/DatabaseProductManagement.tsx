
import { useState, useEffect } from "react";
import { useSupabaseProductStore, DatabaseProduct } from "../../store/SupabaseProductStore";
import DatabaseProductEditor from "./DatabaseProductEditor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Plus, Edit3, Trash2, Loader2 } from "lucide-react";

const DatabaseProductManagement = () => {
  const { products, loading, fetchProducts, deleteProduct } = useSupabaseProductStore();
  const [editingProduct, setEditingProduct] = useState<DatabaseProduct | null>(null);
  const [showEditor, setShowEditor] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

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
      await deleteProduct(product.id);
    }
  };

  const handleSave = () => {
    setShowEditor(false);
    setEditingProduct(null);
    fetchProducts(); // Refresh the list
  };

  const handleCancel = () => {
    setShowEditor(false);
    setEditingProduct(null);
  };

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
    <div className="p-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div>
              Product Management (Database)
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAdd} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            Managing products in the central database. Changes will be visible to all users immediately.
          </p>
        </CardContent>
      </Card>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin" />
          <span className="ml-2">Loading products...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <Card key={product.id} className="relative">
              <CardContent className="p-4">
                <div className="aspect-square mb-3 overflow-hidden rounded-md">
                  <img
                    src={product.image || '/placeholder.svg'}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-medium text-sm mb-2 line-clamp-2">
                  {product.title}
                </h3>
                <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
                  <span>₹{product.price}</span>
                  <span className="capitalize">{product.category}</span>
                </div>
                <div className="flex gap-2">
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
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!loading && products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No products found</p>
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
