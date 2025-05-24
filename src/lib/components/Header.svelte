<script lang="ts">
  import { page } from '$app/stores';
  import { cart, getCartTotal, getCartItemsCount } from '$lib/stores/cartStore';
  import { onMount } from 'svelte';
  import { fly, slide } from 'svelte/transition';
  
  let showMobileMenu = false;
  let isScrolled = false;
  let cartCount = 0;
  
  // Navigation items
  const navigation = [
    { title: 'Home', href: '/' },
    { title: 'Shop', href: '/shop' },
    { title: 'About', href: '/about' },
    { title: 'Contact', href: '/contact' },
  ];
  
  // Listen for scroll events
  onMount(() => {
    const handleScroll = () => {
      isScrolled = window.scrollY > 20;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
  
  // Subscribe to cart changes
  $: cartCount = getCartItemsCount($cart);
</script>

<header class="sticky top-0 z-50 transition-colors duration-300 {isScrolled ? 'bg-white shadow-md' : 'bg-transparent'} w-full">
  <div class="container-custom">
    <div class="flex items-center justify-between py-4">
      <!-- Logo -->
      <a href="/" class="flex items-center space-x-2">
        <span class="text-2xl font-display font-bold text-primary-700">
          Mango
          <span class="text-secondary-600">Paradise</span>
        </span>
      </a>
      
      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center space-x-6">
        {#each navigation as item}
          <a 
            href={item.href} 
            class="text-sm font-medium {$page.url.pathname === item.href 
              ? 'text-primary-700' 
              : isScrolled ? 'text-gray-700 hover:text-primary-600' : 'text-gray-100 hover:text-white'}"
          >
            {item.title}
          </a>
        {/each}
      </nav>
      
      <!-- Right Section: Cart & Account -->
      <div class="flex items-center">
        <!-- Cart -->
        <a 
          href="/cart" 
          class="relative p-2 mr-2 {isScrolled ? 'text-gray-700 hover:text-primary-600' : 'text-gray-100 hover:text-white'}"
          aria-label="Shopping cart"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          
          {#if cartCount > 0}
            <span class="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none transform translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-500 text-white">
              {cartCount}
            </span>
          {/if}
        </a>
        
        <!-- Account -->
        {#if $page.data.session?.user}
          <a 
            href="/account" 
            class="relative p-2 {isScrolled ? 'text-gray-700 hover:text-primary-600' : 'text-gray-100 hover:text-white'}"
            aria-label="Account"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </a>
        {:else}
          <a 
            href="/auth/signin" 
            class="text-sm font-medium {isScrolled ? 'text-gray-700 hover:text-primary-600' : 'text-gray-100 hover:text-white'}"
          >
            Sign In
          </a>
        {/if}
        
        <!-- Mobile menu button -->
        <button 
          class="ml-4 p-1 rounded-md md:hidden {isScrolled ? 'text-gray-700 hover:text-primary-600' : 'text-gray-100 hover:text-white'}"
          on:click={() => showMobileMenu = !showMobileMenu}
          aria-label="Menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  </div>
  
  <!-- Mobile menu -->
  {#if showMobileMenu}
    <div class="md:hidden bg-white border-t border-gray-200 shadow-lg" transition:slide={{ duration: 200 }}>
      <div class="container-custom py-3">
        <nav>
          <ul class="space-y-1">
            {#each navigation as item}
              <li>
                <a 
                  href={item.href}
                  class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-primary-600"
                  on:click={() => showMobileMenu = false}
                >
                  {item.title}
                </a>
              </li>
            {/each}
          </ul>
          
          <div class="mt-4 pt-4 border-t border-gray-200">
            {#if $page.data.session?.user}
              <a 
                href="/account"
                class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                on:click={() => showMobileMenu = false}
              >
                My Account
              </a>
              <form action="/auth/signout" method="POST" class="block px-3 py-2">
                <button type="submit" class="text-base font-medium text-red-600 hover:text-red-800">
                  Sign Out
                </button>
              </form>
            {:else}
              <a 
                href="/auth/signin"
                class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                on:click={() => showMobileMenu = false}
              >
                Sign In
              </a>
              <a 
                href="/auth/signup"
                class="block px-3 py-2 rounded-md text-base font-medium text-primary-600 hover:text-primary-800"
                on:click={() => showMobileMenu = false}
              >
                Create Account
              </a>
            {/if}
          </div>
        </nav>
      </div>
    </div>
  {/if}
</header>

<style>
  /* Make header transparent at top and solid after scrolling */
  header {
    background-color: transparent;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
  }
  
  :global(body:not(.home-page)) header {
    background-color: white;
    border-bottom: 1px solid #e5e7eb;
  }
</style>