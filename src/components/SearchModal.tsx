
import React, { useState, useEffect } from "react";
import { Search, X, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchStore } from "../store/SearchStore";
import { useProductStore } from "../store/ProductStore";
import ProductCard from "./ProductCard";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [localQuery, setLocalQuery] = useState("");
  const { 
    query, 
    results, 
    isSearching, 
    recentSearches, 
    setQuery, 
    setResults, 
    setIsSearching, 
    addRecentSearch,
    clearRecentSearches 
  } = useSearchStore();
  const { products } = useProductStore();

  useEffect(() => {
    if (localQuery.trim() === "") {
      setResults([]);
      setQuery("");
      return;
    }

    setIsSearching(true);
    setQuery(localQuery);

    // Simulate search delay
    const timer = setTimeout(() => {
      const searchResults = products.filter(product =>
        product.title.toLowerCase().includes(localQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(localQuery.toLowerCase())
      );
      setResults(searchResults);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [localQuery, products, setQuery, setResults, setIsSearching]);

  const handleSearch = (searchTerm: string) => {
    setLocalQuery(searchTerm);
    if (searchTerm.trim()) {
      addRecentSearch(searchTerm);
    }
  };

  const handleRecentSearch = (searchTerm: string) => {
    setLocalQuery(searchTerm);
    handleSearch(searchTerm);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute top-0 left-0 right-0 bg-white shadow-xl max-h-[80vh] overflow-hidden">
        <div className="flex flex-col">
          {/* Search Header */}
          <div className="flex items-center gap-3 p-4 border-b">
            <Search className="h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search for products..."
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              className="flex-1 border-none shadow-none focus-visible:ring-0"
              autoFocus
            />
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Search Content */}
          <div className="flex-1 overflow-y-auto max-h-[60vh]">
            {localQuery.trim() === "" ? (
              <div className="p-4">
                {recentSearches.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-gray-700">Recent Searches</h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={clearRecentSearches}
                        className="text-xs"
                      >
                        Clear All
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => handleRecentSearch(search)}
                          className="flex items-center gap-2 w-full p-2 text-left hover:bg-gray-50 rounded"
                        >
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span>{search}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : isSearching ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-flipkart-blue mx-auto"></div>
                <p className="mt-2 text-gray-500">Searching...</p>
              </div>
            ) : (
              <div className="p-4">
                {results.length > 0 ? (
                  <div>
                    <h3 className="font-medium mb-4">Found {results.length} results for "{query}"</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {results.slice(0, 8).map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                    {results.length > 8 && (
                      <div className="text-center mt-4">
                        <Button variant="outline" onClick={onClose}>
                          View All {results.length} Results
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="font-medium mb-2">No results found</h3>
                    <p className="text-gray-500">Try searching with different keywords</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
