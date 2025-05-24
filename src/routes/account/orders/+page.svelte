<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  
  // Demo orders - would be fetched from the database in production
  const demoOrders = [
    {
      id: "ORD-5678",
      date: "2023-04-15",
      total: 89.97,
      status: "Delivered",
      items: [
        { name: "Alphonso Mangoes", quantity: 2, price: 39.99 },
        { name: "Green Mango Box", quantity: 1, price: 9.99 }
      ]
    },
    {
      id: "ORD-1234",
      date: "2023-05-20",
      total: 144.97,
      status: "Processing",
      items: [
        { name: "Mixed Variety Pack", quantity: 3, price: 44.99 },
        { name: "Honey Mangoes", quantity: 1, price: 9.99 }
      ]
    }
  ];
  
  let orders = demoOrders;
  let selectedOrder = null;
</script>

<svelte:head>
  <title>Your Orders | Mangola</title>
</svelte:head>

<div>
  <h1 class="text-2xl font-bold text-gray-800 mb-6">Your Orders</h1>
  
  {#if orders.length > 0}
    <div class="space-y-4">
      {#each orders as order}
        <div 
          class="border border-gray-200 rounded-md overflow-hidden cursor-pointer hover:border-primary-300 transition"
          on:click={() => selectedOrder = selectedOrder === order ? null : order}
        >
          <div class="bg-gray-50 px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between">
            <div>
              <div class="flex items-center">
                <h3 class="font-medium text-gray-800">{order.id}</h3>
                <span class="ml-2 px-2 py-0.5 rounded-full text-xs {
                  order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                  order.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                }">
                  {order.status}
                </span>
              </div>
              <p class="text-sm text-gray-500">Ordered on {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <div class="mt-2 sm:mt-0 flex items-center">
              <span class="font-medium">${order.total.toFixed(2)}</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                class="ml-2 h-5 w-5 text-gray-500 transform transition-transform {selectedOrder === order ? 'rotate-180' : ''}" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          
          {#if selectedOrder === order}
            <div class="px-4 py-3 border-t border-gray-200 animate-enter" style="animation-delay: 50ms">
              <h4 class="font-medium text-sm text-gray-700 mb-2">Order Items</h4>
              <ul class="space-y-2">
                {#each order.items as item}
                  <li class="flex justify-between text-sm">
                    <span>{item.name} × {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                {/each}
              </ul>
              
              <div class="mt-4 pt-3 border-t border-gray-200 flex justify-between">
                <span class="font-medium">Total</span>
                <span class="font-bold">${order.total.toFixed(2)}</span>
              </div>
              
              <div class="mt-4 flex gap-2">
                <button class="btn-secondary text-xs py-1 px-3">
                  Track Order
                </button>
                <button class="text-primary-600 hover:text-primary-800 text-xs">
                  View Invoice
                </button>
              </div>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  {:else}
    <div class="text-center py-8 border border-gray-200 rounded-md">
      <p class="text-gray-600 mb-4">You haven't placed any orders yet</p>
      <a href="/shop" class="btn-primary inline-block">Start Shopping</a>
    </div>
  {/if}
</div>