
import { useState } from "react";
import { DatabaseProduct, useSupabaseProductStore } from "../../store/SupabaseProductStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit3, Plus, Save, X } from "lucide-react";

interface DatabaseProductEditorProps {
  product?: DatabaseProduct;
  onSave: () => void;
  onCancel: () => void;
}

const DatabaseProductEditor = ({ product, onSave, onCancel }: DatabaseProductEditorProps) => {
  const { addProduct, updateProduct } = useSupabaseProductStore();
  const [formData, setFormData] = useState({
    title: product?.title || "",
    price: product?.price || 0,
    original_price: product?.original_price || 0,
    discount_percentage: product?.discount_percentage || 0,
    image: product?.image || "",
    rating: product?.rating || 4.0,
    rating_count: product?.rating_count || 100,
    category: product?.category || "",
    description: product?.description || "",
    stock: product?.stock || 50,
    sku: product?.sku || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.price || !formData.category) {
      return;
    }

    if (product) {
      await updateProduct({
        ...product,
        ...formData,
        price: Number(formData.price),
        original_price: Number(formData.original_price),
        discount_percentage: Number(formData.discount_percentage),
        rating: Number(formData.rating),
        rating_count: Number(formData.rating_count),
        stock: Number(formData.stock),
      });
    } else {
      await addProduct({
        ...formData,
        price: Number(formData.price),
        original_price: Number(formData.original_price),
        discount_percentage: Number(formData.discount_percentage),
        rating: Number(formData.rating),
        rating_count: Number(formData.rating_count),
        stock: Number(formData.stock),
      });
    }
    
    onSave();
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {product ? <Edit3 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          {product ? "Edit Product" : "Add New Product"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Product Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Enter product title"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="category">Category *</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                placeholder="e.g., tshirts, jeans, dresses"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="price">Price *</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                placeholder="0"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="original_price">Original Price</Label>
              <Input
                id="original_price"
                type="number"
                value={formData.original_price}
                onChange={(e) => setFormData({...formData, original_price: Number(e.target.value)})}
                placeholder="0"
              />
            </div>
            
            <div>
              <Label htmlFor="discount_percentage">Discount %</Label>
              <Input
                id="discount_percentage"
                type="number"
                value={formData.discount_percentage}
                onChange={(e) => setFormData({...formData, discount_percentage: Number(e.target.value)})}
                placeholder="0"
              />
            </div>
            
            <div>
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({...formData, stock: Number(e.target.value)})}
                placeholder="50"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          <div>
            <Label htmlFor="sku">SKU</Label>
            <Input
              id="sku"
              value={formData.sku}
              onChange={(e) => setFormData({...formData, sku: e.target.value})}
              placeholder="AUTO-GENERATED"
            />
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              className="w-full p-2 border rounded-md resize-none"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Product description..."
            />
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              <Save className="w-4 h-4 mr-2" />
              {product ? "Update Product" : "Add Product"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default DatabaseProductEditor;
