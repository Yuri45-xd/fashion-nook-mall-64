import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, ShoppingCart, User, Search, ChevronDown } from "lucide-react";
import { useCartStore } from "../store/CartStore";
import { useAuthStore } from "../store/AuthStore";
import CartSidebar from "./CartSidebar";
import SearchModal from "./SearchModal";

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { getTotalItems, toggleCart } = useCartStore();
  const { user, isLoggedIn, logout } = useAuthStore();

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Latitude:", latitude, "Longitude:", longitude);
          alert(`Your approximate location is: Latitude ${latitude}, Longitude ${longitude}`);
        },
        (error) => {
          console.error("Error getting location:", error.message);
          alert("Error getting location. Please make sure location services are enabled.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <>
      <header className="bg-flipkart-blue text-white sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="text-xl font-bold">Fashion Zone</div>
            </Link>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-6">
              <div className="relative w-full">
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="w-full bg-white text-gray-800 px-4 py-2 rounded-sm flex items-center justify-between hover:bg-gray-50"
                >
                  <span className="text-gray-500">Search for products...</span>
                  <Search className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              {/* Mobile Search */}
              <button 
                className="md:hidden p-2 hover:bg-blue-600 rounded"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Location */}
              <button 
                onClick={handleLocationClick}
                className="hidden md:flex items-center space-x-1 hover:bg-blue-600 px-2 py-1 rounded"
              >
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Location</span>
              </button>

              {/* User Account */}
              <div className="relative group">
                <button className="flex items-center space-x-1 hover:bg-blue-600 px-2 py-1 rounded">
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline text-sm">
                    {isLoggedIn ? user?.username : "Account"}
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                <div className="absolute right-0 mt-1 w-48 bg-white text-gray-800 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  {isLoggedIn ? (
                    <>
                      <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100">My Orders</Link>
                      <Link to="/wishlist" className="block px-4 py-2 hover:bg-gray-100">Wishlist</Link>
                      <button 
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="block px-4 py-2 hover:bg-gray-100">Login</Link>
                      <Link to="/signup" className="block px-4 py-2 hover:bg-gray-100">Sign Up</Link>
                    </>
                  )}
                </div>
              </div>

              {/* Cart */}
              <button 
                className="flex items-center space-x-1 hover:bg-blue-600 px-2 py-1 rounded relative"
                onClick={toggleCart}
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="hidden sm:inline text-sm">Cart</span>
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-flipkart-orange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Modals */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <CartSidebar />
    </>
  );
};

export default Header;
