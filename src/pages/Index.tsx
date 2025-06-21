
import { useState, useEffect } from "react";
import Header from "../components/Header";
import CategoryNav from "../components/CategoryNav";
import BannerCarousel from "../components/BannerCarousel";
import DealsSection from "../components/DealsSection";
import ProductSection from "../components/ProductSection";
import Footer from "../components/Footer";
import { useSupabaseProductStore, DatabaseProduct } from "../store/SupabaseProductStore";

// Convert DatabaseProduct to Product format for existing components
const convertDatabaseProduct = (dbProduct: DatabaseProduct) => ({
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
});

const Index = () => {
  const { products, fetchProducts, getProductsByCategory } = useSupabaseProductStore();
  
  const [tshirts, setTshirts] = useState<ReturnType<typeof convertDatabaseProduct>[]>([]);
  const [hoodies, setHoodies] = useState<ReturnType<typeof convertDatabaseProduct>[]>([]);
  const [jeans, setJeans] = useState<ReturnType<typeof convertDatabaseProduct>[]>([]);
  const [dresses, setDresses] = useState<ReturnType<typeof convertDatabaseProduct>[]>([]);
  const [kids, setKids] = useState<ReturnType<typeof convertDatabaseProduct>[]>([]);
  const [shirts, setShirts] = useState<ReturnType<typeof convertDatabaseProduct>[]>([]);
  const [outerwear, setOuterwear] = useState<ReturnType<typeof convertDatabaseProduct>[]>([]);
  const [activewear, setActivewear] = useState<ReturnType<typeof convertDatabaseProduct>[]>([]);
  const [accessories, setAccessories] = useState<ReturnType<typeof convertDatabaseProduct>[]>([]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    // Convert database products to the format expected by existing components
    const convertedProducts = products.map(convertDatabaseProduct);
    
    // Populate products by categories
    setTshirts(getProductsByCategory("tshirts").map(convertDatabaseProduct));
    setHoodies(getProductsByCategory("hoodies").map(convertDatabaseProduct));
    setJeans(getProductsByCategory("jeans").map(convertDatabaseProduct));
    setDresses(getProductsByCategory("dresses").map(convertDatabaseProduct));
    setKids(getProductsByCategory("kids").map(convertDatabaseProduct));
    setShirts(getProductsByCategory("shirts").map(convertDatabaseProduct));
    setOuterwear(getProductsByCategory("outerwear").map(convertDatabaseProduct));
    setActivewear(getProductsByCategory("activewear").map(convertDatabaseProduct));
    setAccessories(getProductsByCategory("accessories").map(convertDatabaseProduct));
  }, [products, getProductsByCategory]);

  const allConvertedProducts = products.map(convertDatabaseProduct);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CategoryNav />
      <main className="flex-1 container mx-auto px-4 py-4">
        <BannerCarousel />
        <div className="my-6">
          <DealsSection products={allConvertedProducts} />
          
          {tshirts.length > 0 && (
            <ProductSection 
              title="T-shirts" 
              products={tshirts} 
              viewAllLink="/categories/tshirts" 
            />
          )}
          
          {hoodies.length > 0 && (
            <ProductSection 
              title="Hoodies" 
              products={hoodies} 
              viewAllLink="/categories/hoodies" 
            />
          )}
          
          {jeans.length > 0 && (
            <ProductSection 
              title="Jeans" 
              products={jeans} 
              viewAllLink="/categories/jeans" 
            />
          )}
          
          {dresses.length > 0 && (
            <ProductSection 
              title="Dresses" 
              products={dresses} 
              viewAllLink="/categories/dresses" 
            />
          )}
          
          {kids.length > 0 && (
            <ProductSection 
              title="Kids Collection" 
              products={kids} 
              viewAllLink="/categories/kids" 
            />
          )}
          
          {shirts.length > 0 && (
            <ProductSection 
              title="Shirts" 
              products={shirts} 
              viewAllLink="/categories/shirts" 
            />
          )}
          
          {outerwear.length > 0 && (
            <ProductSection 
              title="Outerwear" 
              products={outerwear} 
              viewAllLink="/categories/outerwear" 
            />
          )}
          
          {activewear.length > 0 && (
            <ProductSection 
              title="Activewear" 
              products={activewear} 
              viewAllLink="/categories/activewear" 
            />
          )}
          
          {accessories.length > 0 && (
            <ProductSection 
              title="Accessories" 
              products={accessories} 
              viewAllLink="/categories/accessories" 
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
