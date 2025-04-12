import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set) => ({
      cart: [],
      wishlist: [],
      addToCart: (product) =>
        set((state) => ({
          cart: [...state.cart, product],
        })),
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((p) => p.id !== id),
        })),
      addToWishlist: (product) =>
        set((state) => ({
          wishlist: [...state.wishlist, product],
        })),
      removeFromWishlist: (id) =>
        set((state) => ({
          wishlist: state.wishlist.filter((p) => p.id !== id),
        })),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "shop-storage", // nome in localStorage
    }
  )
);
