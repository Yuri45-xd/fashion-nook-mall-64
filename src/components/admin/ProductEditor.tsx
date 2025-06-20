
import { useState } from "react";
import { Product } from "../../types";
import { useProductStore } from "../../store/ProductStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Trash2, Edit3, Plus, Save, X } from "lucide-react";

interface ProductEditorProps {
  product?: Product;
  onSave: () => void;
  onCancel: () => void;
}

const ProductEditor = ({ product, onSave, onCancel }: ProductEditorProps) => {
  const { addProduct, updateProduct } = useProductStore();
  const [formData, setFormData] = useState<Partial<Product>>({
    title: product?.title || "",
    price: product?.price || 0,
    originalPrice: product?.originalPrice || 0,
    discountPercentage: product?.discountPercentage || 0,
    image: product?.image || "",
    rating: product?.rating || 4.0,
    ratingCount: product?.ratingCount || 100,
    category: product?.category || "",
    description: product?.description || "",
    stock: product?.stock || 50,
    sku: product?.sku || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.price || !formData.category) {
      toast.error("Please fill in all required fields");
      return;
    }

    const productData = {
      ...formData,
      id: product?.id || Date.now(),
      price: Number(formData.price),
      originalPrice: Number(formData.originalPrice),
      discountPercentage: Number(formData.discountPercentage),
      rating: Number(formData.rating),
      ratingCount: Number(formData.ratingCount),
      stock: Number(formData.stock),
    } as Product;

    if (product) {
      updateProduct(productData);
      toast.success("Product updated successfully!");
    } else {
      addProduct(productData);
      toast.success("Product added successfully!");
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
              <Label htmlFor="originalPrice">Original Price</Label>
              <Input
                id="originalPrice"
                type="number"
                value={formData.originalPrice}
                onChange={(e) => setFormData({...formData, originalPrice: Number(e.target.value)})}
                placeholder="0"
              />
            </div>
            
            <div>
              <Label htmlFor="discountPercentage">Discount %</Label>
              <Input
                id="discountPercentage"
                type="number"
                value={formData.discountPercentage}
                onChange={(e) => setFormData({...formData, discountPercentage: Number(e.target.value)})}
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
            
            <div>
              <Label htmlFor="rating">Rating</Label>
              <Input
                id="rating"
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={formData.rating}
                onChange={(e) => setFormData({...formData, rating: Number(e.target.value)})}
                placeholder="4.0"
              />
            </div>
            
            <div>
              <Label htmlFor="ratingCount">Rating Count</Label>
              <Input
                id="ratingCount"
                type="number"
                value={formData.ratingCount}
                onChange={(e) => setFormData({...formData, ratingCount: Number(e.target.value)})}
                placeholder="100"
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

export default ProductEditor;
