<script lang="ts">
  import { fly } from 'svelte/transition';
  import ProductCard from '$lib/components/ProductCard.svelte';
  import type { Product } from '$lib/types';
  import { addToCart } from '$lib/stores/cartStore';
  
  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Mangoes' },
    { id: 'premium', name: 'Premium Varieties' },
    { id: 'regular', name: 'Regular Varieties' },
    { id: 'specialty', name: 'Specialty Items' },
  ];
  
  // Demo products - would come from API/database in production
  const allProducts: Product[] = [
    {
      id: "1",
      name: "Alphonso Mangoes",
      description: "The king of mangoes, known for its rich, creamy, saffron-colored pulp and delicate, unique flavor.",
      price: 39.99,
      image: "https://images.pexels.com/photos/918643/pexels-photo-918643.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "premium"
    },
    {
      id: "2",
      name: "Honey Mangoes",
      description: "Sweet as honey with a vibrant yellow flesh. Perfect for desserts and smoothies.",
      price: 29.99,
      image: "https://images.pexels.com/photos/2363345/pexels-photo-2363345.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "regular"
    },
    {
      id: "3",
      name: "Green Mango Box",
      description: "Tart and crispy green mangoes, perfect for salads and pickles. Contains 6 mangoes.",
      price: 24.99,
      image: "https://images.pexels.com/photos/3989821/pexels-photo-3989821.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "specialty"
    },
    {
      id: "4",
      name: "Mixed Variety Pack",
      description: "Experience different flavors with our curated box of 4 different premium mango varieties.",
      price: 44.99,
      image: "https://images.pexels.com/photos/6157047/pexels-photo-6157047.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "premium"
    },
    {
      id: "5",
      name: "Kesar Mangoes",
      description: "Known for their bright orange pulp and sweet flavor with subtle notes of saffron.",
      price: 34.99,
      image: "https://images.pexels.com/photos/4917086/pexels-photo-4917086.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "premium"
    },
    {
      id: "6",
      name: "Kent Mangoes",
      description: "Large, juicy mangoes with a sweet, rich flavor and minimal fiber.",
      price: 27.99,
      image: "https://images.pexels.com/photos/4022200/pexels-photo-4022200.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "regular"
    },
    {
      id: "7",
      name: "Ataulfo Mangoes",
      description: "Small, yellow mangoes with a buttery, smooth texture and sweet flavor.",
      price: 32.99,
      image: "https://images.pexels.com/photos/1441122/pexels-photo-1441122.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "premium"
    },
    {
      id: "8",
      name: "Mango Gift Box",
      description: "Premium assortment of mangoes with gourmet treats, perfect as a gift.",
      price: 59.99,
      image: "https://images.pexels.com/photos/2824734/pexels-photo-2824734.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "specialty"
    }
  ];
  
  let selectedCategory = 'all';
  let searchQuery = '';
  let sortOption = 'featured';
  
  $: filteredProducts = allProducts
    .filter(p => selectedCategory === 'all' || p.category === selectedCategory)
    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                p.description.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortOption === 'price-low') return a.price - b.price;
      if (sortOption === 'price-high') return b.price - a.price;
      if (sortOption === 'name') return a.name.localeCompare(b.name);
      return 0; // Default: featured/no sorting
    });
    
  function handleCategoryChange(catId: string) {
    selectedCategory = catId;
  }
</script>

<svelte:head>
  <title>Shop Mangoes | Mangola</title>
</svelte:head>

<section class="py-10 bg-gradient-to-b from-primary-50 to-white">
  <div class="container-custom">
    <div class="text-center mb-12">
      <h1 class="text-primary-800 mb-4">Shop Our Mangoes</h1>
      <p class="text-gray-600 max-w-2xl mx-auto">
        Discover our carefully curated selection of the world's finest mangoes,
        sourced directly from sustainable farms and delivered fresh to your door.
      </p>
    </div>
    
    <!-- Search and filters -->
    <div class="bg-white rounded-lg shadow-md p-4 mb-8">
      <div class="flex flex-col md:flex-row gap-4 items-center">
        <div class="w-full md:w-1/3">
          <label for="search" class="sr-only">Search</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
            </div>
            <input
              id="search"
              type="text"
              placeholder="Search mangoes..."
              bind:value={searchQuery}
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            />
          </div>
        </div>
        
        <div class="w-full md:w-1/3">
          <label for="category" class="sr-only">Category</label>
          <div class="relative">
            <select
              id="category"
              bind:value={selectedCategory}
              class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 rounded-md"
            >
              {#each categories as category}
                <option value={category.id}>{category.name}</option>
              {/each}
            </select>
          </div>
        </div>
        
        <div class="w-full md:w-1/3">
          <label for="sort" class="sr-only">Sort</label>
          <div class="relative">
            <select
              id="sort"
              bind:value={sortOption}
              class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 rounded-md"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Category tabs (for mobile/alternative navigation) -->
    <div class="flex overflow-x-auto gap-2 pb-2 mb-6 md:hidden">
      {#each categories as category}
        <button
          class="px-4 py-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors
                 {selectedCategory === category.id 
                   ? 'bg-primary-500 text-white' 
                   : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
          on:click={() => handleCategoryChange(category.id)}
        >
          {category.name}
        </button>
      {/each}
    </div>
    
    <!-- Products grid -->
    {#if filteredProducts.length > 0}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {#each filteredProducts as product, i}
          <div in:fly={{ y: 20, duration: 300, delay: 50 * i }}>
            <ProductCard {product} on:add={() => addToCart(product)} />
          </div>
        {/each}
      </div>
    {:else}
      <div class="text-center py-12">
        <h3 class="text-xl text-gray-600 mb-4">No mangoes found</h3>
        <p class="text-gray-500 mb-6">Try adjusting your search or filters</p>
        <button 
          on:click={() => { selectedCategory = 'all'; searchQuery = ''; }}
          class="btn-secondary"
        >
          Reset Filters
        </button>
      </div>
    {/if}
  </div>
</section>