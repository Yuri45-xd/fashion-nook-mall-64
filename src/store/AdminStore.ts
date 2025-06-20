
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AdminState {
  isAdminMode: boolean;
  toggleAdminMode: () => void;
  setAdminMode: (mode: boolean) => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      isAdminMode: false,
      toggleAdminMode: () => set((state) => ({ isAdminMode: !state.isAdminMode })),
      setAdminMode: (mode) => set({ isAdminMode: mode }),
    }),
    {
      name: "admin-storage",
    }
  )
);
