
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  username: string;
  email: string;
  phone: string;
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,

      login: (userData) => {
        set({
          user: userData,
          isLoggedIn: true
        });
      },

      logout: () => {
        set({
          user: null,
          isLoggedIn: false
        });
        // Clear other stores on logout
        localStorage.removeItem("cart-storage");
      },

      updateUser: (userData) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...userData }
          });
        }
      }
    }),
    {
      name: "auth-storage",
    }
  )
);
