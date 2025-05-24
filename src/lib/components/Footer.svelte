<script lang="ts">
  // Social media links
  const socialLinks = [
    { 
      name: 'Facebook', 
      url: '#',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" /></svg>'
    },
    { 
      name: 'Instagram', 
      url: '#',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 9.52A2.48 2.48 0 1 0 14.48 12 2.48 2.48 0 0 0 12 9.52Zm9.93-2.45a6.53 6.53 0 0 0-.42-2.26 4 4 0 0 0-2.32-2.32 6.53 6.53 0 0 0-2.26-.42C15.64 2 15.26 2 12 2s-3.64 0-4.93.07a6.53 6.53 0 0 0-2.26.42 4 4 0 0 0-2.32 2.32 6.53 6.53 0 0 0-.42 2.26C2 8.36 2 8.74 2 12s0 3.64.07 4.93a6.86 6.86 0 0 0 .42 2.27 3.94 3.94 0 0 0 .91 1.4 3.89 3.89 0 0 0 1.41.91 6.53 6.53 0 0 0 2.26.42C8.36 22 8.74 22 12 22s3.64 0 4.93-.07a6.53 6.53 0 0 0 2.26-.42 3.89 3.89 0 0 0 1.41-.91 3.94 3.94 0 0 0 .91-1.4 6.6 6.6 0 0 0 .42-2.27C22 15.64 22 15.26 22 12s0-3.64-.07-4.93Zm-2.54 8a5.73 5.73 0 0 1-.39 1.8A3.86 3.86 0 0 1 16.87 19a5.73 5.73 0 0 1-1.81.35H8.94A5.73 5.73 0 0 1 7.13 19a3.51 3.51 0 0 1-1.31-.86A3.51 3.51 0 0 1 5 16.87a5.49 5.49 0 0 1-.34-1.81V8.94A5.49 5.49 0 0 1 5 7.13a3.51 3.51 0 0 1 .86-1.31A3.59 3.59 0 0 1 7.13 5a5.73 5.73 0 0 1 1.81-.35h6.12A5.73 5.73 0 0 1 16.87 5a3.51 3.51 0 0 1 1.31.86A3.51 3.51 0 0 1 19 7.13a5.73 5.73 0 0 1 .35 1.81V12c0 2.06.07 2.27.04 3.06Zm-1.6-7.44a2.38 2.38 0 0 0-1.41-1.41A4 4 0 0 0 15 6H9a4 4 0 0 0-1.38.26 2.38 2.38 0 0 0-1.41 1.36A4.27 4.27 0 0 0 6 9v6a4.27 4.27 0 0 0 .26 1.38 2.38 2.38 0 0 0 1.41 1.41 4.27 4.27 0 0 0 1.33.26h6a4 4 0 0 0 1.38-.26 2.38 2.38 0 0 0 1.41-1.41 4 4 0 0 0 .26-1.38V9a3.78 3.78 0 0 0-.26-1.38ZM12 15.82A3.81 3.81 0 0 1 8.19 12 3.82 3.82 0 1 1 12 15.82Zm4-6.89a.9.9 0 0 1 0-1.79.9.9 0 0 1 0 1.79Z"/></svg>'
    },
    { 
      name: 'Twitter', 
      url: '#',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" /></svg>'
    }
  ];
  
  const quickLinks = [
    { title: 'Shop', href: '/shop' },
    { title: 'About Us', href: '/about' },
    { title: 'Blog', href: '/blog' },
    { title: 'FAQs', href: '/faqs' },
    { title: 'Contact', href: '/contact' },
  ];
  
  const customerService = [
    { title: 'Shipping & Delivery', href: '/shipping' },
    { title: 'Returns & Refunds', href: '/returns' },
    { title: 'Privacy Policy', href: '/privacy' },
    { title: 'Terms of Service', href: '/terms' },
  ];
</script>

<footer class="bg-gray-900 text-gray-300">
  <!-- Main Footer -->
  <div class="container-custom py-12">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <!-- Company Info -->
      <div>
        <div class="mb-4">
          <span class="text-xl font-display font-bold text-primary-400">
            Mangola
          </span>
        </div>
        <p class="text-gray-400 mb-4">
          Delivering the world's finest mangoes straight to your doorstep since 2020.
        </p>
        <div class="flex space-x-4">
          {#each socialLinks as social}
            <a 
              href={social.url} 
              class="text-gray-400 hover:text-primary-400 transition-colors"
              aria-label={social.name}
              target="_blank"
              rel="noopener noreferrer"
            >
              {@html social.icon}
            </a>
          {/each}
        </div>
      </div>
      
      <!-- Quick Links -->
      <div>
        <h3 class="text-lg font-semibold text-white mb-4">Quick Links</h3>
        <ul class="space-y-2">
          {#each quickLinks as link}
            <li>
              <a 
                href={link.href} 
                class="text-gray-400 hover:text-primary-400 transition-colors"
              >
                {link.title}
              </a>
            </li>
          {/each}
        </ul>
      </div>
      
      <!-- Customer Service -->
      <div>
        <h3 class="text-lg font-semibold text-white mb-4">Customer Service</h3>
        <ul class="space-y-2">
          {#each customerService as link}
            <li>
              <a 
                href={link.href} 
                class="text-gray-400 hover:text-primary-400 transition-colors"
              >
                {link.title}
              </a>
            </li>
          {/each}
        </ul>
      </div>
      
      <!-- Newsletter -->
      <div>
        <h3 class="text-lg font-semibold text-white mb-4">Join Our Newsletter</h3>
        <p class="text-gray-400 mb-4">
          Subscribe to get special offers, mango season updates, and more.
        </p>
        <form class="flex">
          <input
            type="email"
            placeholder="Your email"
            class="flex-grow px-4 py-2 rounded-l-md focus:outline-none text-gray-900"
            aria-label="Email address"
          />
          <button 
            type="submit" 
            class="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-r-md transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  </div>
  
  <!-- Bottom Footer -->
  <div class="border-t border-gray-800 py-6">
    <div class="container-custom flex flex-col md:flex-row justify-between items-center">
      <p class="text-sm text-gray-500 mb-4 md:mb-0">
        &copy; {new Date().getFullYear()} Mangola. All rights reserved.
      </p>
      
      <div class="flex space-x-6">
        <a href="/privacy" class="text-sm text-gray-500 hover:text-gray-300">Privacy</a>
        <a href="/terms" class="text-sm text-gray-500 hover:text-gray-300">Terms</a>
        <a href="/cookies" class="text-sm text-gray-500 hover:text-gray-300">Cookies</a>
      </div>
    </div>
  </div>
</footer>