<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Product } from '$lib/types';
  import { addToCart } from '$lib/stores/cartStore';
  
  export let product: Product;
  
  const dispatch = createEventDispatcher();
  
  function handleAddToCart() {
    addToCart(product);
    dispatch('add', product);
  }
</script>

<div class="card h-full group">
  <div class="relative overflow-hidden">
    <img
      src={product.image}
      alt={product.name}
      class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
    
    <button 
      class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-full text-sm font-medium transition-all opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
      on:click={handleAddToCart}
    >
      Add to Cart
    </button>
  </div>
  
  <div class="p-4">
    <div class="flex items-center justify-between mb-1">
      <h3 class="font-semibold text-gray-800">{product.name}</h3>
      <span class="font-bold text-primary-600">${product.price.toFixed(2)}</span>
    </div>
    <p class="text-sm text-gray-600 line-clamp-2">{product.description}</p>
  </div>
</div>