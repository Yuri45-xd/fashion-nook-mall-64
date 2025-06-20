import { Product } from "../types";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { useCartStore } from "../store/CartStore";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCartStore();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem(product, 1);
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart`,
    });
  };

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow overflow-hidden">
        <div className="relative pt-[100%] mb-3 overflow-hidden rounded-md">
          <img
            src={product.image}
            alt={product.title}
            className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex flex-col flex-grow">
          <h3 className="text-sm font-medium overflow-hidden line-clamp-2 mb-1">
            {product.title}
          </h3>
          <div className="flex items-center gap-1 mb-1">
            <span className="rating">
              {product.rating} <Star className="w-3 h-3 ml-0.5 fill-current" />
            </span>
            <span className="text-xs text-flipkart-text-secondary">
              ({product.ratingCount})
            </span>
          </div>
          <div className="price-tag mt-auto">
            <span className="discount-price">₹{product.price}</span>
            <span className="original-price">₹{product.originalPrice}</span>
            <span className="discount-percentage">{product.discountPercentage}% off</span>
          </div>
        </div>
        <div className="p-3">
          <button
            onClick={handleAddToCart}
            className="w-full mt-2 bg-flipkart-orange text-white py-1 px-3 rounded text-sm hover:bg-flipkart-orange/90 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
