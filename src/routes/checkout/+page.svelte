<script lang="ts">
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { cart, getCartTotal } from '$lib/stores/cartStore';
  import { page } from '$app/stores';
  
  let isLoading = false;
  let shippingInfo = {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US'
  };
  
  let cardElement: any;
  let paymentError = '';
  let currentStep = 1;
  
  $: isStepOneComplete = shippingInfo.firstName && 
                         shippingInfo.lastName && 
                         shippingInfo.email && 
                         shippingInfo.address && 
                         shippingInfo.city &&
                         shippingInfo.zipCode;
  
  onMount(() => {
    // In production, this would load the Stripe Elements
    console.log('Stripe would be initialized here');
  });
  
  async function handleSubmit() {
    isLoading = true;
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Here we would normally process the payment with Stripe
    isLoading = false;
    
    // Navigate to success page (in production)
    window.location.href = '/checkout/success';
  }
  
  function nextStep() {
    if (currentStep < 2) currentStep++;
  }
  
  function prevStep() {
    if (currentStep > 1) currentStep--;
  }
</script>

<svelte:head>
  <title>Checkout | Mango Paradise</title>
</svelte:head>

<div class="bg-gray-50 py-12">
  <div class="container-custom max-w-5xl">
    <h1 class="text-3xl md:text-4xl font-bold text-primary-800 mb-8 text-center">Checkout</h1>
    
    <div class="mb-8">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <div class={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= 1 ? 'bg-primary-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
            1
          </div>
          <span class="ml-2 text-sm font-medium text-gray-900">Shipping</span>
        </div>
        <div class="hidden sm:block w-16 h-0.5 bg-gray-200"></div>
        <div class="flex items-center">
          <div class={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= 2 ? 'bg-primary-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
            2
          </div>
          <span class="ml-2 text-sm font-medium text-gray-900">Payment</span>
        </div>
      </div>
    </div>
    
    {#if currentStep === 1}
      <div in:fly={{ y: 10, duration: 300 }}>
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 class="text-xl font-semibold mb-4">Shipping Information</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                id="firstName"
                bind:value={shippingInfo.firstName}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                required
              />
            </div>
            
            <div>
              <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                id="lastName"
                bind:value={shippingInfo.lastName}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                required
              />
            </div>
          </div>
          
          <div class="mt-4">
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              id="email"
              bind:value={shippingInfo.email}
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
              required
            />
          </div>
          
          <div class="mt-4">
            <label for="address" class="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
            <input
              type="text"
              id="address"
              bind:value={shippingInfo.address}
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
              required
            />
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label for="city" class="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                type="text"
                id="city"
                bind:value={shippingInfo.city}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                required
              />
            </div>
            
            <div>
              <label for="state" class="block text-sm font-medium text-gray-700 mb-1">State</label>
              <input
                type="text"
                id="state"
                bind:value={shippingInfo.state}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                required
              />
            </div>
            
            <div>
              <label for="zipCode" class="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
              <input
                type="text"
                id="zipCode"
                bind:value={shippingInfo.zipCode}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                required
              />
            </div>
          </div>
          
          <div class="mt-4">
            <label for="country" class="block text-sm font-medium text-gray-700 mb-1">Country</label>
            <select
              id="country"
              bind:value={shippingInfo.country}
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
            >
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="UK">United Kingdom</option>
              <option value="AU">Australia</option>
            </select>
          </div>
        </div>
        
        <div class="flex justify-end">
          <button
            on:click={nextStep}
            disabled={!isStepOneComplete}
            class="btn-primary {!isStepOneComplete ? 'opacity-50 cursor-not-allowed' : ''}"
          >
            Continue to Payment
          </button>
        </div>
      </div>
    {:else if currentStep === 2}
      <div in:fly={{ y: 10, duration: 300 }}>
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 class="text-xl font-semibold mb-4">Payment Information</h2>
          <p class="text-sm text-gray-500 mb-6">
            All transactions are secure and encrypted. Credit card information is never stored on our servers.
          </p>
          
          <div class="mb-6 p-4 border border-gray-200 rounded-md">
            <!-- Stripe Card Element would be mounted here in production -->
            <div id="card-element" class="p-4 border border-dashed border-gray-300 rounded-md bg-gray-50 text-center text-sm text-gray-500">
              Stripe Payment Element Would Appear Here
            </div>
            
            {#if paymentError}
              <div class="mt-2 text-sm text-red-500">{paymentError}</div>
            {/if}
          </div>
          
          <div class="border-t border-gray-200 pt-4">
            <h3 class="font-medium text-gray-900 mb-2">Order Summary</h3>
            <div class="space-y-2 mb-4">
              {#each $cart as item}
                <div class="flex justify-between text-sm">
                  <span>{item.name} × {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              {/each}
            </div>
            
            <div class="flex justify-between py-2 text-sm">
              <span>Subtotal</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
            
            <div class="flex justify-between py-2 text-sm">
              <span>Shipping</span>
              <span>$9.99</span>
            </div>
            
            <div class="border-t border-gray-200 mt-2 pt-2 flex justify-between font-semibold">
              <span>Total</span>
              <span class="text-primary-800">${(getCartTotal() + 9.99).toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div class="flex justify-between">
          <button
            on:click={prevStep}
            class="btn-secondary"
          >
            Back to Shipping
          </button>
          
          <button
            on:click={handleSubmit}
            class="btn-primary flex items-center"
            disabled={isLoading}
          >
            {#if isLoading}
              <div class="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
              Processing...
            {:else}
              Complete Order
            {/if}
          </button>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  /* Component-specific styles here */
</style>