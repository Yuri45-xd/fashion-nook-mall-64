
import { create } from "zustand";
import { Product } from "../types";

interface SearchState {
  query: string;
  results: Product[];
  isSearching: boolean;
  recentSearches: string[];
  setQuery: (query: string) => void;
  setResults: (results: Product[]) => void;
  setIsSearching: (isSearching: boolean) => void;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
}

export const useSearchStore = create<SearchState>((set, get) => ({
  query: "",
  results: [],
  isSearching: false,
  recentSearches: JSON.parse(localStorage.getItem("recent-searches") || "[]"),

  setQuery: (query) => set({ query }),

  setResults: (results) => set({ results }),

  setIsSearching: (isSearching) => set({ isSearching }),

  addRecentSearch: (query) => {
    if (query.trim() === "") return;
    
    const current = get().recentSearches;
    const updated = [query, ...current.filter(q => q !== query)].slice(0, 5);
    
    set({ recentSearches: updated });
    localStorage.setItem("recent-searches", JSON.stringify(updated));
  },

  clearRecentSearches: () => {
    set({ recentSearches: [] });
    localStorage.removeItem("recent-searches");
  }
}));
