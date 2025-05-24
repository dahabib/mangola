<script lang="ts">
  import { fly, slide } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } from '$lib/stores/cartStore';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  
  let mounted = false;
  
  onMount(() => {
    mounted = true;
  });
  
  function handleCheckout() {
    if ($cart.length === 0) return;
    goto('/checkout');
  }
</script>

<svelte:head>
  <title>Your Cart | Mango Paradise</title>
</svelte:head>

<div class="bg-gray-50 py-12">
  <div class="container-custom">
    <h1 class="text-3xl md:text-4xl font-bold text-primary-800 mb-8 text-center">Your Shopping Cart</h1>
    
    {#if mounted && $cart.length > 0}
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Cart Items -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <ul class="divide-y divide-gray-200">
              {#each $cart as item, i (item.id)}
                <li 
                  class="p-4 flex flex-col sm:flex-row sm:items-center gap-4" 
                  animate:flip={{ duration: 300 }}
                  in:fly={{ y: 20, duration: 300, delay: 50 * i }}
                >
                  <div class="flex-shrink-0 w-20 h-20">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      class="w-full h-full object-cover rounded"
                    />
                  </div>
                  
                  <div class="flex-grow">
                    <h3 class="font-medium text-gray-800">{item.name}</h3>
                    <p class="text-sm text-gray-500 mb-1">${item.price.toFixed(2)}</p>
                  </div>
                  
                  <div class="flex items-center">
                    <button 
                      class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
                      on:click={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      aria-label="Decrease quantity"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                      </svg>
                    </button>
                    
                    <span class="mx-3 w-8 text-center">
                      {item.quantity}
                    </span>
                    
                    <button 
                      class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
                      on:click={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                  
                  <div class="text-right">
                    <p class="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    <button 
                      class="text-sm text-red-500 hover:text-red-700 mt-1"
                      on:click={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              {/each}
            </ul>
          </div>
          
          <div class="mt-4 flex justify-between">
            <button 
              class="text-primary-600 hover:text-primary-800 text-sm font-medium"
              on:click={() => goto('/shop')}
            >
              ← Continue Shopping
            </button>
            
            <button 
              class="text-red-500 hover:text-red-700 text-sm font-medium"
              on:click={() => clearCart()}
            >
              Clear Cart
            </button>
          </div>
        </div>
        
        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-md p-6 sticky top-20">
            <h2 class="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
            
            <div class="space-y-3 mb-6">
              <div class="flex justify-between">
                <span class="text-gray-600">Subtotal</span>
                <span class="font-medium">${getCartTotal().toFixed(2)}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Shipping</span>
                <span class="font-medium">$9.99</span>
              </div>
              <div class="border-t border-gray-200 pt-3 flex justify-between">
                <span class="font-semibold">Total</span>
                <span class="font-bold text-primary-800">
                  ${(getCartTotal() + 9.99).toFixed(2)}
                </span>
              </div>
            </div>
            
            <button 
              on:click={handleCheckout}
              class="w-full btn-primary py-3 flex items-center justify-center"
            >
              Proceed to Checkout
            </button>
            
            <p class="text-xs text-gray-500 text-center mt-4">
              Free shipping on orders over $100
            </p>
          </div>
        </div>
      </div>
    {:else if mounted}
      <div class="text-center py-12 bg-white rounded-lg shadow-md" in:fly={{ y: 20, duration: 300 }}>
        <div class="mb-6 text-primary-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h2 class="text-2xl font-semibold text-gray-800 mb-2">Your cart is empty</h2>
        <p class="text-gray-600 mb-6">Looks like you haven't added any mangoes to your cart yet.</p>
        <a href="/shop" class="btn-primary inline-block">
          Start Shopping
        </a>
      </div>
    {:else}
      <div class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    {/if}
  </div>
</div>