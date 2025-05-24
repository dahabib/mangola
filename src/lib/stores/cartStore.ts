import { writable, derived } from 'svelte/store';
import type { Product, CartItem } from '$lib/types';

export const cart = writable<CartItem[]>([]);

export function addToCart(product: Product) {
  cart.update(items => {
    // Check if the product is already in the cart
    const existingItem = items.find(item => item.id === product.id);
    
    if (existingItem) {
      // If it exists, increment the quantity
      return items.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      );
    } else {
      // Otherwise, add it to the cart with quantity 1
      return [...items, { ...product, quantity: 1 }];
    }
  });
}

export function removeFromCart(productId: string) {
  cart.update(items => items.filter(item => item.id !== productId));
}

export function updateQuantity(productId: string, quantity: number) {
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }
  
  cart.update(items => 
    items.map(item => 
      item.id === productId ? { ...item, quantity } : item
    )
  );
}

export function clearCart() {
  cart.set([]);
}

export function getCartTotal(items?: CartItem[]): number {
  const cartItems = items || get(cart);
  return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function getCartItemsCount(items?: CartItem[]): number {
  const cartItems = items || get(cart);
  return cartItems.reduce((count, item) => count + item.quantity, 0);
}

// Helper function to get current store value
function get<T>(store: { subscribe: (callback: (value: T) => void) => any }): T {
  let value: T;
  store.subscribe(current => {
    value = current;
  })();
  return value!;
}