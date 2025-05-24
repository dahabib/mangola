<script lang="ts">
  import '../app.css';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { cart } from '$lib/stores/cartStore';
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  type CartItem = {
    id: string;
    quantity: number;
  };

  type Cart = CartItem[]; 
  
  onMount(() => {
    if (!browser) return;

    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem('mango-cart');
        if (savedCart) {
          const parsed: Cart = JSON.parse(savedCart);
          $cart = parsed;
        }
      } catch (e) {
        console.error('Error parsing saved cart', e);
        $cart = [];
      }
    };

    loadCart();

    // Subscribe to cart changes and save to localStorage
    const unsubscribe = cart.subscribe((value: Cart) => {
      localStorage.setItem('mango-cart', JSON.stringify(value));
    });

    return unsubscribe;
  });
</script>

<div class="flex flex-col min-h-screen">
  <Header />
  
  <main class="flex-grow" in:fade={{ duration: 300, delay: 100 }}>
    <slot />
  </main>
  
  <Footer />
</div>