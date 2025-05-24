<script lang="ts">
  import { page } from '$app/stores';
  import '../app.css';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { cart } from '$lib/stores/cartStore';
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  
  // Load cart from localStorage on mount (client-side only)
  onMount(() => {
    const savedCart = localStorage.getItem('mango-cart');
    if (savedCart) {
      try {
        $cart = JSON.parse(savedCart);
      } catch (e) {
        console.error('Error parsing saved cart', e);
      }
    }
    
    // Subscribe to cart changes and save to localStorage
    const unsubscribe = cart.subscribe(value => {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('mango-cart', JSON.stringify(value));
      }
    });
    
    return () => {
      unsubscribe();
    };
  });
</script>

<div class="flex flex-col min-h-screen">
  <Header />
  
  <main class="flex-grow" in:fade={{ duration: 300, delay: 100 }}>
    <slot />
  </main>
  
  <Footer />
</div>