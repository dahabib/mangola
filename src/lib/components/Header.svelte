<script lang="ts">
  import { page } from '$app/stores';
  import { cart } from '$lib/stores/cartStore';
  import { onMount } from 'svelte';
  import { derived } from 'svelte/store';

  let showMobileMenu = false;
  let isScrolled = false;

  const navigation = [
    { title: 'Home', href: '/' },
    { title: 'Shop', href: '/shop' },
    { title: 'About', href: '/about' },
    { title: 'Contact', href: '/contact' },
  ];

  const cartCount = derived(cart, ($cart) => 
    $cart?.reduce((acc, item) => acc + item.quantity, 0) || 0
  );

  onMount(() => {
    const handleScroll = () => {
      isScrolled = window.scrollY > 20;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>


<header class="sticky top-0 z-50 w-full transition-all duration-300 {isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}">
  <div class="container-custom">
    <div class="flex items-center justify-between py-4">
      <!-- Logo -->
      <a href="/" class="flex items-center space-x-2">
        <span class="text-2xl font-display font-bold text-primary-700">Mangola</span>
      </a>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center space-x-6">
        {#each navigation as item}
          <a
            href={item.href}
            class="text-sm font-medium"
            class:is-active={$page.url.pathname === item.href}
            class:text-primary-700={$page.url.pathname === item.href}
            class:text-gray-700={isScrolled && $page.url.pathname !== item.href}
            class:text-gray-100={!isScrolled && $page.url.pathname !== item.href}
            class:hover:text-primary-600={isScrolled}
            class:hover:text-white={!isScrolled}
          >
            {item.title}
          </a>
        {/each}
      </nav>

      <!-- Cart & Account -->
      <div class="flex items-center">
        <!-- Cart Icon -->
        <a href="/cart" class="relative p-2 mr-2"
           class:text-gray-700={isScrolled}
           class:text-gray-100={!isScrolled}
           class:hover:text-primary-600={isScrolled}
           class:hover:text-white={!isScrolled}
           aria-label="Shopping cart"
        >
          <!-- Icon -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
          </svg>
          {#if $cartCount > 0}
            <span class="absolute top-0 right-0 px-2 py-1 text-xs font-bold rounded-full bg-primary-500 text-white transform translate-x-1/2 -translate-y-1/2">
              {$cartCount}
            </span>
          {/if}
        </a>

        <!-- Auth -->
        {#if $page.data.session?.user}
          <a href="/account" class="p-2"
             class:text-gray-700={isScrolled}
             class:text-gray-100={!isScrolled}
             class:hover:text-primary-600={isScrolled}
             class:hover:text-white={!isScrolled}
             aria-label="Account"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
          </a>
        {:else}
          <a href="/auth/signin" class="text-sm font-medium"
             class:text-gray-700={isScrolled}
             class:text-gray-100={!isScrolled}
             class:hover:text-primary-600={isScrolled}
             class:hover:text-white={!isScrolled}
          >
            Sign In
          </a>
        {/if}

        <!-- Mobile toggle -->
        <button on:click={() => showMobileMenu = !showMobileMenu}
                aria-label="Menu"
                class="ml-4 p-1 rounded-md md:hidden"
                class:text-gray-700={isScrolled}
                class:text-gray-100={!isScrolled}
                class:hover:text-primary-600={isScrolled}
                class:hover:text-white={!isScrolled}
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>
    </div>
  </div>

  <!-- Mobile Navigation -->
  {#if showMobileMenu}
    <div class="md:hidden bg-white border-t border-gray-200 shadow-lg" transition:slide={{ duration: 200 }}>
      <div class="container-custom py-3">
        <nav class="space-y-1">
          {#each navigation as item}
            <a href={item.href}
               class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-primary-600"
               on:click={() => showMobileMenu = false}
            >
              {item.title}
            </a>
          {/each}

          <div class="mt-4 pt-4 border-t border-gray-200">
            {#if $page.data.session?.user}
              <a href="/account" class="block px-3 py-2 text-base font-medium hover:bg-gray-100" on:click={() => showMobileMenu = false}>
                My Account
              </a>
              <form action="/auth/signout" method="POST" class="px-3 py-2">
                <button type="submit" class="text-base font-medium text-red-600 hover:text-red-800">
                  Sign Out
                </button>
              </form>
            {:else}
              <a href="/auth/signin" class="block px-3 py-2 text-base font-medium hover:bg-gray-100" on:click={() => showMobileMenu = false}>
                Sign In
              </a>
              <a href="/auth/signup" class="block px-3 py-2 text-base font-medium text-primary-600 hover:text-primary-800" on:click={() => showMobileMenu = false}>
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
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
  }
  
  :global(body:not(.home-page)) header {
    background-color: white;
    border-bottom: 1px solid #e5e7eb;
  }
</style>