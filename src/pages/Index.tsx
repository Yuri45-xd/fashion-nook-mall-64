
import { useState, useEffect } from "react";
import Header from "../components/Header";
import CategoryNav from "../components/CategoryNav";
import BannerCarousel from "../components/BannerCarousel";
import DealsSection from "../components/DealsSection";
import ProductSection from "../components/ProductSection";
import Footer from "../components/Footer";
import { useProductStore } from "../store/ProductStore";

const Index = () => {
  // Use product store instead of direct imports
  const { products, getProductsByCategory } = useProductStore();
  
  const [tshirts, setTshirts] = useState<typeof products>([]);
  const [hoodies, setHoodies] = useState<typeof products>([]);
  const [jeans, setJeans] = useState<typeof products>([]);
  const [dresses, setDresses] = useState<typeof products>([]);
  const [kids, setKids] = useState<typeof products>([]);
  const [shirts, setShirts] = useState<typeof products>([]);
  const [outerwear, setOuterwear] = useState<typeof products>([]);
  const [activewear, setActivewear] = useState<typeof products>([]);
  const [accessories, setAccessories] = useState<typeof products>([]);

  useEffect(() => {
    // Populate products by categories using the store
    setTshirts(getProductsByCategory("tshirts"));
    setHoodies(getProductsByCategory("hoodies"));
    setJeans(getProductsByCategory("jeans"));
    setDresses(getProductsByCategory("dresses"));
    setKids(getProductsByCategory("kids"));
    setShirts(getProductsByCategory("shirts"));
    setOuterwear(getProductsByCategory("outerwear"));
    setActivewear(getProductsByCategory("activewear"));
    setAccessories(getProductsByCategory("accessories"));
  }, [products, getProductsByCategory]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CategoryNav />
      <main className="flex-1 container mx-auto px-4 py-4">
        <BannerCarousel />
        <div className="my-6">
          <DealsSection products={products} />
          
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
