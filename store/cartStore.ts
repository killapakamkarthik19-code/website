import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product, ProductColor, CartItem } from "@/lib/types";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  wishlist: string[];
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, color?: ProductColor, quantity?: number) => void;
  removeItem: (productId: string, colorName: string) => void;
  updateQuantity: (productId: string, colorName: string, delta: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalAmount: () => number;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      wishlist: [],

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (product, color, quantity = 1) => {
        const selectedColor = color || product.colors[0];
        set((state) => {
          const existingIndex = state.items.findIndex(
            (i) =>
              i.product.id === product.id &&
              i.selectedColor.name === selectedColor.name
          );
          if (existingIndex > -1) {
            const updated = [...state.items];
            updated[existingIndex].quantity += quantity;
            return { items: updated, isOpen: true };
          }
          return {
            items: [
              ...state.items,
              { product, selectedColor, quantity },
            ],
            isOpen: true,
          };
        });
      },

      removeItem: (productId, colorName) => {
        set((state) => ({
          items: state.items.filter(
            (i) =>
              !(
                i.product.id === productId &&
                i.selectedColor.name === colorName
              )
          ),
        }));
      },

      updateQuantity: (productId, colorName, delta) => {
        set((state) => {
          const updated = state.items
            .map((i) => {
              if (
                i.product.id === productId &&
                i.selectedColor.name === colorName
              ) {
                const newQty = i.quantity + delta;
                return newQty > 0 ? { ...i, quantity: newQty } : null;
              }
              return i;
            })
            .filter(Boolean) as CartItem[];
          return { items: updated };
        });
      },

      clearCart: () => set({ items: [] }),

      totalItems: () => {
        return get().items.reduce((acc, curr) => acc + curr.quantity, 0);
      },

      totalAmount: () => {
        return get().items.reduce(
          (acc, curr) => acc + curr.product.price * curr.quantity,
          0
        );
      },

      toggleWishlist: (productId) => {
        set((state) => {
          const exists = state.wishlist.includes(productId);
          return {
            wishlist: exists
              ? state.wishlist.filter((id) => id !== productId)
              : [...state.wishlist, productId],
          };
        });
      },

      isInWishlist: (productId) => {
        return get().wishlist.includes(productId);
      },
    }),
    {
      name: "gyp-signatures-cart-storage",
      partialize: (state) => ({ items: state.items, wishlist: state.wishlist }),
    }
  )
);
