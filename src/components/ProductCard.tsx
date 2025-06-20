
import { Product } from "../types";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="p-3 flex flex-col h-full">
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
      </div>
    </Link>
  );
};

export default ProductCard;
