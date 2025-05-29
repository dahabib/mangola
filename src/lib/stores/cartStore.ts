import { writable, derived, get as getStoreValue } from "svelte/store";
import { browser } from "$app/environment";
import type { Product, CartItem } from "$lib/types";

// Initialize cart with localStorage data if available
let initialCart: CartItem[] = [];

if (browser) {
  try {
    const stored = localStorage.getItem("mango-cart");
    initialCart = stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.warn("Corrupted cart in localStorage, resetting.");
    localStorage.removeItem("mango-cart");
    initialCart = [];
  }
}

export const cart = writable<CartItem[]>(initialCart);

// Subscribe to cart changes and persist to localStorage
if (browser) {
  cart.subscribe((items) => {
    try {
      localStorage.setItem("mango-cart", JSON.stringify(items));
    } catch (error) {
      console.error("Failed to persist cart:", error);
      // Handle storage quota exceeded or other errors
    }
  });
}

// Existing cart functions (with minor optimizations)
export function addToCart(product: Product) {
  cart.update((items) => {
    const existingItem = items.find((item) => item.id === product.id);
    return existingItem
      ? items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...items, { ...product, quantity: 1 }];
  });
}

export function removeFromCart(productId: string) {
  cart.update((items) => items.filter((item) => item.id !== productId));
}

export function updateQuantity(productId: string, quantity: number) {
  cart.update((items) =>
    quantity <= 0
      ? items.filter((item) => item.id !== productId)
      : items.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
  );
}

export function clearCart() {
  cart.set([]);
}

// Derived stores for common calculations
export const cartTotal = derived(cart, ($cart) =>
  $cart.reduce((total, item) => total + item.price * item.quantity, 0)
);

export const cartItemsCount = derived(cart, ($cart) =>
  $cart.reduce((count, item) => count + item.quantity, 0)
);

// Optional: Add a function to get current cart (alternative to your get helper)
export function getCurrentCart(): CartItem[] {
  return getStoreValue(cart);
}
