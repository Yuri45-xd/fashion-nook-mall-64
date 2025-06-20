
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "../data/products";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { Heart, Star, ShoppingCart, Truck, Package, ChevronDown } from "lucide-react";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState(products[0]);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  
  const similarProducts = products.filter(p => 
    p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === Number(id));
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id]);

  const handleAddToCart = () => {
    toast.success("Product added to cart!");
  };

  const handleBuyNow = () => {
    toast.success("Proceeding to checkout!");
  };

  const sizes = ["S", "M", "L", "XL", "XXL"];

  if (!product) return <div>Product not found</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="bg-white rounded shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Product Images */}
            <div className="md:w-2/5">
              <div className="sticky top-20">
                <div className="border rounded p-2 mb-4">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-80 object-contain"
                  />
                </div>
                <div className="flex gap-2 justify-center">
                  <button className="btn-primary flex-1 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <ShoppingCart className="w-5 h-5" />
                      ADD TO CART
                    </div>
                  </button>
                  <button className="btn-secondary flex-1 py-3" onClick={handleBuyNow}>
                    BUY NOW
                  </button>
                </div>
              </div>
            </div>
            
            {/* Product Details */}
            <div className="md:w-3/5">
              <h1 className="text-xl font-medium mb-1">{product.title}</h1>
              
              <div className="flex items-center gap-2 mb-2">
                <span className="rating">
                  {product.rating} <Star className="w-3 h-3 fill-current" />
                </span>
                <span className="text-sm text-flipkart-text-secondary">
                  {product.ratingCount} ratings & reviews
                </span>
              </div>
              
              <div className="mb-4">
                <span className="text-flipkart-green font-medium text-sm">Special Price</span>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-medium">₹{product.price}</span>
                  <span className="text-flipkart-text-secondary line-through">₹{product.originalPrice}</span>
                  <span className="text-flipkart-green">{product.discountPercentage}% off</span>
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2">Select Size</h3>
                <div className="flex gap-3">
                  {sizes.map(size => (
                    <button 
                      key={size}
                      className={`w-12 h-12 rounded-full border font-medium ${
                        selectedSize === size 
                          ? 'border-flipkart-blue text-flipkart-blue' 
                          : 'border-gray-300'
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <Link to="#" className="text-flipkart-blue text-sm font-medium mt-1 inline-block">
                  Size Chart
                </Link>
              </div>
              
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2">Quantity</h3>
                <div className="flex items-center gap-1 w-24">
                  <button 
                    className="w-8 h-8 border rounded-full flex items-center justify-center"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <input 
                    type="number" 
                    min="1" 
                    value={quantity} 
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-8 text-center border-none focus:outline-none"
                  />
                  <button 
                    className="w-8 h-8 border rounded-full flex items-center justify-center"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2">Delivery Options</h3>
                <div className="flex items-start gap-2 text-sm">
                  <Truck className="w-5 h-5 text-flipkart-text-secondary mt-0.5" />
                  <div>
                    <p className="font-medium">Free delivery by tomorrow</p>
                    <p className="text-flipkart-text-secondary">Orders placed before 1:30pm are shipped the same day</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2">Highlights</h3>
                <ul className="list-disc pl-5 text-sm space-y-1 text-flipkart-text-secondary">
                  <li>Premium quality fabric</li>
                  <li>Regular fit, comfortable wear</li>
                  <li>Machine wash, easy care</li>
                  <li>Durable stitching for long-lasting use</li>
                </ul>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex mb-4">
                  <button 
                    className={`px-4 py-2 font-medium ${activeTab === 'description' ? 'text-flipkart-blue border-b-2 border-flipkart-blue' : 'text-flipkart-text-secondary'}`}
                    onClick={() => setActiveTab('description')}
                  >
                    Description
                  </button>
                  <button 
                    className={`px-4 py-2 font-medium ${activeTab === 'specifications' ? 'text-flipkart-blue border-b-2 border-flipkart-blue' : 'text-flipkart-text-secondary'}`}
                    onClick={() => setActiveTab('specifications')}
                  >
                    Specifications
                  </button>
                  <button 
                    className={`px-4 py-2 font-medium ${activeTab === 'reviews' ? 'text-flipkart-blue border-b-2 border-flipkart-blue' : 'text-flipkart-text-secondary'}`}
                    onClick={() => setActiveTab('reviews')}
                  >
                    Reviews
                  </button>
                </div>
                
                <div className="text-sm text-flipkart-text-secondary">
                  {activeTab === 'description' && (
                    <p>
                      This premium {product.title.toLowerCase()} is made with high-quality materials to ensure comfort and durability. 
                      Perfect for casual wear or special occasions, this versatile piece will become a staple in your wardrobe.
                    </p>
                  )}
                  
                  {activeTab === 'specifications' && (
                    <div>
                      <h4 className="font-medium text-flipkart-text-primary mb-2">General</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-flipkart-bg-light p-2">Brand</div>
                        <div className="p-2">Fashion Grown</div>
                        <div className="bg-flipkart-bg-light p-2">Type</div>
                        <div className="p-2">{product.category}</div>
                        <div className="bg-flipkart-bg-light p-2">Ideal For</div>
                        <div className="p-2">Unisex</div>
                        <div className="bg-flipkart-bg-light p-2">Material</div>
                        <div className="p-2">Cotton Blend</div>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'reviews' && (
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-medium">{product.rating} ★</div>
                          <div className="text-xs">{product.ratingCount} ratings</div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs w-6">5 ★</span>
                            <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
                              <div className="bg-flipkart-green h-full" style={{ width: '65%' }}></div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs w-6">4 ★</span>
                            <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
                              <div className="bg-flipkart-green h-full" style={{ width: '20%' }}></div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs w-6">3 ★</span>
                            <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
                              <div className="bg-flipkart-green h-full" style={{ width: '10%' }}></div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs w-6">2 ★</span>
                            <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
                              <div className="bg-flipkart-green h-full" style={{ width: '3%' }}></div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs w-6">1 ★</span>
                            <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
                              <div className="bg-flipkart-green h-full" style={{ width: '2%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-center">No reviews yet. Be the first to review this product.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="bg-white rounded shadow-sm p-4">
            <h2 className="text-xl font-medium mb-4">Similar Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {similarProducts.map(item => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
