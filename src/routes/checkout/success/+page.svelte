<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { clearCart } from '$lib/stores/cartStore';
  import { fly } from 'svelte/transition';
  
  onMount(() => {
    // Clear cart on successful order
    clearCart();
  });
</script>

<svelte:head>
  <title>Order Confirmed | Mangola</title>
</svelte:head>

<div class="bg-gray-50 py-16">
  <div class="container-custom max-w-2xl">
    <div class="bg-white rounded-lg shadow-lg p-8 text-center" in:fly={{ y: 20, duration: 500 }}>
      <div class="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <h1 class="text-3xl font-bold text-gray-800 mb-2">Thank You!</h1>
      <p class="text-xl text-gray-600 mb-6">Your order has been confirmed</p>
      
      <div class="mb-8">
        <p class="text-gray-600 mb-2">
          Order number: <span class="font-medium">#MP{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</span>
        </p>
        <p class="text-gray-600">
          We've sent a confirmation to your email with all the details.
        </p>
      </div>
      
      <div class="border-t border-b border-gray-200 py-6 mb-8">
        <h2 class="text-lg font-medium text-gray-800 mb-4">What's Next?</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 rounded bg-gray-50">
            <div class="text-primary-600 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 class="font-medium">Shipping</h3>
            </div>
            <p class="text-sm text-gray-600">
              Your mangoes will be carefully packed and shipped within 24 hours.
            </p>
          </div>
          
          <div class="p-4 rounded bg-gray-50">
            <div class="text-primary-600 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h3 class="font-medium">Updates</h3>
            </div>
            <p class="text-sm text-gray-600">
              We'll email you tracking information once your order ships.
            </p>
          </div>
        </div>
      </div>
      
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="/" class="btn-secondary">
          Return to Home
        </a>
        <a href="/shop" class="btn-primary">
          Continue Shopping
        </a>
      </div>
    </div>
  </div>
</div>