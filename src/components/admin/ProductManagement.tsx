
import { useState } from "react";
import { useProductStore } from "../../store/ProductStore";
import { useAdminStore } from "../../store/AdminStore";
import ProductEditor from "./ProductEditor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Plus, Edit3, Trash2, Eye, Settings, X } from "lucide-react";
import { Product } from "../../types";

const ProductManagement = () => {
  const { products, deleteProduct } = useProductStore();
  const { isAdminMode, toggleAdminMode } = useAdminStore();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showEditor, setShowEditor] = useState(false);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowEditor(true);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setShowEditor(true);
  };

  const handleDelete = (product: Product) => {
    if (confirm(`Are you sure you want to delete "${product.title}"?`)) {
      deleteProduct(product.id);
      toast.success("Product deleted successfully!");
    }
  };

  const handleSave = () => {
    setShowEditor(false);
    setEditingProduct(null);
  };

  const handleCancel = () => {
    setShowEditor(false);
    setEditingProduct(null);
  };

  if (showEditor) {
    return (
      <div className="p-4">
        <ProductEditor
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
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Product Management
            </div>
            <div className="flex gap-2">
              <Button
                variant={isAdminMode ? "destructive" : "default"}
                onClick={toggleAdminMode}
                size="sm"
              >
                {isAdminMode ? (
                  <>
                    <X className="w-4 h-4 mr-2" />
                    Exit Admin Mode
                  </>
                ) : (
                  <>
                    <Settings className="w-4 h-4 mr-2" />
                    Enter Admin Mode
                  </>
                )}
              </Button>
              {isAdminMode && (
                <Button onClick={handleAdd} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            {isAdminMode 
              ? "Admin mode is active. You can now edit, add, or delete products."
              : "Click 'Enter Admin Mode' to start managing products."
            }
          </p>
        </CardContent>
      </Card>

      {isAdminMode && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <Card key={product.id} className="relative">
              <CardContent className="p-4">
                <div className="aspect-square mb-3 overflow-hidden rounded-md">
                  <img
                    src={product.image}
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

      {!isAdminMode && (
        <div className="text-center py-12">
          <Eye className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500">
            Enable admin mode to manage products
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
