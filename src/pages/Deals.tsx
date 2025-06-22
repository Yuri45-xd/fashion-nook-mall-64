
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CategoryNav from "../components/CategoryNav";
import ProductCard from "../components/ProductCard";
import { useSupabaseProductStore } from "../store/SupabaseProductStore";
import { Clock, Flame } from "lucide-react";

const Deals = () => {
  const { products, fetchProducts } = useSupabaseProductStore();
  const [timeLeft, setTimeLeft] = useState({
    hours: 10,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const totalSeconds =
          prev.hours * 3600 + prev.minutes * 60 + prev.seconds - 1;
        
        if (totalSeconds <= 0) {
          clearInterval(timer);
          return { hours: 0, minutes: 0, seconds: 0 };
        }

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Convert database products to expected format
  const convertedProducts = products.map(dbProduct => ({
    id: dbProduct.id,
    title: dbProduct.title,
    price: dbProduct.price,
    originalPrice: dbProduct.original_price || dbProduct.price,
    discountPercentage: dbProduct.discount_percentage,
    image: dbProduct.image || '/placeholder.svg',
    rating: dbProduct.rating,
    ratingCount: dbProduct.rating_count,
    category: dbProduct.category,
    description: dbProduct.description || '',
    stock: dbProduct.stock || 0,
    sku: dbProduct.sku || '',
  }));

  // Filter products with discounts for deals
  const dealProducts = convertedProducts.filter(product => 
    product.discountPercentage > 0
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CategoryNav />
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-6 rounded-lg mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Flame className="w-8 h-8" />
              <div>
                <h1 className="text-3xl font-bold">Deals of the Day</h1>
                <p className="text-red-100">Limited time offers - Don't miss out!</p>
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-2 text-2xl font-bold">
                <Clock className="w-6 h-6" />
                <span>
                  {String(timeLeft.hours).padStart(2, "0")}:
                  {String(timeLeft.minutes).padStart(2, "0")}:
                  {String(timeLeft.seconds).padStart(2, "0")}
                </span>
              </div>
              <p className="text-sm text-red-100">Time Left</p>
            </div>
          </div>
        </div>

        {dealProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {dealProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Flame className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-600 mb-2">No Deals Available</h2>
            <p className="text-gray-500">Check back later for amazing deals!</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Deals;
