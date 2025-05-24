<script lang="ts">
  import { fly } from 'svelte/transition';
  import { onMount } from 'svelte';
  import ProductCard from '$lib/components/ProductCard.svelte';
  import type { Product } from '$lib/types';
  import { addToCart } from '$lib/stores/cartStore';
  
  // Demo products - would come from API/database in production
  const products: Product[] = [
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
    }
  ];

  let activeSection = "hero";

  onMount(() => {
    const observeSection = (id: string) => {
      const section = document.getElementById(id);
      if (!section) return;
      
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          activeSection = id;
        }
      }, { threshold: 0.6 });
      
      observer.observe(section);
      return observer;
    };
    
    const observers = ['hero', 'featured', 'about', 'testimonials'].map(observeSection);
    
    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  });
</script>

<svelte:head>
  <title>Mango Paradise | Premium Mango Delivery</title>
  <meta name="description" content="The finest selection of premium mangoes delivered fresh to your door." />
</svelte:head>

<!-- Hero Section -->
<section id="hero" class="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
  <div class="absolute inset-0 z-0">
    <img 
      src="https://images.pexels.com/photos/2294477/pexels-photo-2294477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
      alt="Fresh mangoes background" 
      class="object-cover w-full h-full brightness-[0.85]"
    />
    <div class="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60"></div>
  </div>
  
  <div class="container-custom relative z-10 text-white text-center">
    <div in:fly={{ y: 20, duration: 800, delay: 200 }}>
      <h1 class="font-display text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">
        Mango Paradise
      </h1>
      <p class="text-xl md:text-2xl max-w-2xl mx-auto mb-8 drop-shadow-md">
        Experience the extraordinary taste of premium, handpicked mangoes delivered fresh to your doorstep
      </p>
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <a href="/shop" class="btn-primary text-lg px-8 py-3">
          Shop Now
        </a>
        <a href="#featured" class="btn-secondary text-lg px-8 py-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 border-0 text-white">
          Explore Varieties
        </a>
      </div>
    </div>
  </div>
  
  <div class="absolute bottom-8 left-1/2 -translate-x-1/2">
    <div class="animate-bounce-light">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  </div>
</section>

<!-- Featured Products Section -->
<section id="featured" class="py-20 bg-gray-50">
  <div class="container-custom">
    <div class="text-center mb-12">
      <h2 class="text-primary-800 mb-4">Our Premium Mangoes</h2>
      <p class="text-gray-600 max-w-2xl mx-auto">
        Carefully selected from the finest orchards around the world, our mangoes 
        represent the perfect balance of sweetness, texture, and aroma.
      </p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {#each products as product, i}
        <div class="animate-enter" style="animation-delay: {i * 100}ms">
          <ProductCard {product} on:add={() => addToCart(product)} />
        </div>
      {/each}
    </div>
    
    <div class="text-center mt-12">
      <a href="/shop" class="btn-primary inline-block">View All Products</a>
    </div>
  </div>
</section>

<!-- About Section -->
<section id="about" class="py-20 bg-white">
  <div class="container-custom">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div class="order-2 lg:order-1">
        <h2 class="text-primary-800 mb-6">Our Mango Story</h2>
        <p class="text-gray-700 mb-4">
          At Mango Paradise, our journey began with a simple desire: to share the incredible
          joy of perfectly ripened mangoes with mango enthusiasts everywhere.
        </p>
        <p class="text-gray-700 mb-4">
          We partner directly with small, family-owned farms that have been growing mangoes
          for generations. This ensures sustainable farming practices and the highest quality fruit.
        </p>
        <p class="text-gray-700 mb-6">
          Every mango is handpicked at peak ripeness, carefully packed, and delivered straight
          to your door within days of harvest - preserving that perfect tree-ripened flavor.
        </p>
        <a href="/about" class="btn-primary inline-block">Learn More About Us</a>
      </div>
      <div class="order-1 lg:order-2 relative">
        <div class="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
          <img 
            src="https://images.pexels.com/photos/5472324/pexels-photo-5472324.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="Mango farmer picking fresh mangoes" 
            class="object-cover w-full h-full"
          />
        </div>
        <div class="absolute -bottom-6 -left-6 hidden md:block w-40 h-40 bg-primary-100 rounded-lg z-[-1]"></div>
        <div class="absolute -top-6 -right-6 hidden md:block w-40 h-40 bg-secondary-100 rounded-lg z-[-1]"></div>
      </div>
    </div>
  </div>
</section>

<!-- Testimonials Section -->
<section id="testimonials" class="py-20 bg-gradient-to-b from-gray-50 to-white">
  <div class="container-custom">
    <div class="text-center mb-16">
      <h2 class="text-primary-800 mb-4">What Our Customers Say</h2>
      <p class="text-gray-600 max-w-2xl mx-auto">
        Don't just take our word for it - hear from mango lovers who've experienced
        the Mango Paradise difference.
      </p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      {#each [
        {
          name: "Sarah Johnson",
          role: "Food Blogger",
          image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          text: "I've tried mangoes from all over, but nothing compares to the Alphonso mangoes from Mango Paradise. The flavor is incredible!"
        },
        {
          name: "Michael Chen",
          role: "Chef",
          image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          text: "As a chef, I'm extremely particular about my ingredients. These mangoes are consistently perfect - sweet, fragrant, and ideal for both savory and dessert applications."
        },
        {
          name: "Emma Rodriguez",
          role: "Mango Enthusiast",
          image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          text: "The Mixed Variety Pack is amazing! It's like a mango tasting tour without leaving home. The packaging is eco-friendly and keeps them perfectly ripened."
        }
      ] as {name: string, role: string, image: string, text: string}[], i (testimonial, i)}
        <div 
          class="bg-white p-6 rounded-lg shadow-md" 
          in:fly={{ y: 20, duration: 400, delay: 100 * i }}
        >
          <div class="flex items-center mb-4">
            <img 
              src={testimonial.image} 
              alt={testimonial.name} 
              class="w-12 h-12 rounded-full object-cover mr-4"
            />
            <div>
              <h4 class="font-bold text-gray-900">{testimonial.name}</h4>
              <p class="text-sm text-gray-500">{testimonial.role}</p>
            </div>
          </div>
          <p class="text-gray-700 italic">{testimonial.text}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="py-16 bg-primary-500">
  <div class="container-custom text-center text-white">
    <h2 class="text-4xl font-bold mb-6">Ready to Taste the Difference?</h2>
    <p class="text-xl max-w-2xl mx-auto mb-8 text-primary-50">
      Join thousands of mango lovers experiencing the finest mangoes delivered fresh to their doorstep.
    </p>
    <a href="/shop" class="bg-white text-primary-600 hover:bg-primary-50 px-8 py-3 rounded-md font-semibold text-lg inline-block transition-all">
      Shop Premium Mangoes
    </a>
  </div>
</section>

<style>
  /* Any component-specific styles here */
</style>