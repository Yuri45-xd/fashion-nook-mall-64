
import React, { useState, useRef, useEffect } from "react";
import { Search, ShoppingCart, ChevronDown, User, Heart, Bell, Shield, MessageSquare, Store, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<'user' | 'more' | null>(null);
  const cartCount = 0;
  const navigate = useNavigate();
  const dropdownTimerRef = useRef<NodeJS.Timeout | null>(null);
  const { user, profile, signOut } = useAuth();

  const handleDropdownEnter = (dropdown: 'user' | 'more') => {
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current);
    }
    
    dropdownTimerRef.current = setTimeout(() => {
      setActiveDropdown(dropdown);
    }, 200);
  };

  const handleDropdownLeave = () => {
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current);
    }
    
    dropdownTimerRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 500);
  };

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/auth');
      return;
    }
    navigate('/cart');
  };

  const handleSignOut = async () => {
    await signOut();
    setActiveDropdown(null);
    navigate('/');
  };

  return (
    <header className="w-full bg-flipkart-blue text-white">
      <div className="container mx-auto px-4 py-2.5 flex items-center">
        <Link to="/" className="mr-4 flex flex-col">
          <span className="text-xl font-bold">Fashion Zone</span>
          <span className="text-xs text-flipkart-yellow flex items-center">
            Explorer Plus <ChevronDown className="w-3 h-3 ml-1" />
          </span>
        </Link>

        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for products, brands and more"
              className="w-full py-2 px-4 rounded text-flipkart-text-primary focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="absolute right-0 top-0 bottom-0 bg-white px-3 rounded-r">
              <Search className="w-5 h-5 text-flipkart-blue" />
            </button>
          </div>
        </div>

        <nav className="ml-auto flex items-center gap-5">
          <div 
            className="relative group cursor-pointer"
            onMouseEnter={() => handleDropdownEnter('user')}
            onMouseLeave={handleDropdownLeave}
          >
            <div className="flex items-center gap-1">
              <User className="w-5 h-5" />
              <span className="hidden md:inline">
                {user ? (profile?.username || 'Profile') : 'Login'}
              </span>
              <ChevronDown className="w-4 h-4" />
            </div>
            {activeDropdown === 'user' && (
              <div 
                className="absolute right-0 mt-2 w-48 bg-white text-flipkart-text-primary rounded-md shadow-lg z-50 overflow-hidden"
                onMouseEnter={() => {
                  if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
                }}
                onMouseLeave={handleDropdownLeave}
              >
                {!user ? (
                  <>
                    <div className="p-3 border-b border-gray-100">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">New Customer?</span>
                        <Link to="/auth?mode=signup" className="text-flipkart-blue text-sm font-medium">Sign Up</Link>
                      </div>
                    </div>
                    <ul className="py-1">
                      <li>
                        <Link to="/auth" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 transition-colors duration-150">
                          <User className="w-4 h-4" /> 
                          <span className="text-sm">Sign In</span>
                        </Link>
                      </li>
                    </ul>
                  </>
                ) : (
                  <ul className="py-1">
                    <li>
                      <div className="px-4 py-2 border-b border-gray-100">
                        <div className="text-sm font-medium">{profile?.username}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                      </div>
                    </li>
                    <li>
                      <Link to="/orders" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 transition-colors duration-150">
                        <ShoppingCart className="w-4 h-4" /> 
                        <span className="text-sm">Orders</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/wishlist" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 transition-colors duration-150">
                        <Heart className="w-4 h-4" /> 
                        <span className="text-sm">Wishlist</span>
                      </Link>
                    </li>
                    <li>
                      <button 
                        onClick={handleSignOut}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 transition-colors duration-150 w-full text-left"
                      >
                        <LogOut className="w-4 h-4" /> 
                        <span className="text-sm">Sign Out</span>
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            )}
          </div>

          <div 
            className="relative group cursor-pointer"
            onMouseEnter={() => handleDropdownEnter('more')}
            onMouseLeave={handleDropdownLeave}
          >
            <div className="flex items-center gap-1">
              <span className="hidden md:inline">More</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            {activeDropdown === 'more' && (
              <div 
                className="absolute right-0 mt-2 w-48 bg-white text-flipkart-text-primary rounded-md shadow-lg z-50 overflow-hidden"
                onMouseEnter={() => {
                  if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
                }}
                onMouseLeave={handleDropdownLeave}
              >
                <ul className="py-1">
                  <li>
                    <Link to="/customer-care" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 transition-colors duration-150">
                      <MessageSquare className="w-4 h-4 text-flipkart-blue" /> 
                      <span className="text-sm">Chat Support</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/notification-preferences" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 transition-colors duration-150">
                      <Bell className="w-4 h-4 text-flipkart-blue" /> 
                      <span className="text-sm">Notification Preferences</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 transition-colors duration-150">
                      <Shield className="w-4 h-4 text-flipkart-blue" /> 
                      <span className="text-sm">Admin Panel</span>
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <Link to="#" onClick={handleCartClick} className="flex items-center gap-1">
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-flipkart-yellow text-flipkart-blue text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden md:inline">Cart</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
