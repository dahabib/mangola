<script lang="ts">
  import { page } from '$app/stores';
  
  // Navigation items for the account section
  const accountNavigation = [
    { title: 'Profile', href: '/account' },
    { title: 'Orders', href: '/account/orders' },
    { title: 'Addresses', href: '/account/addresses' },
    { title: 'Settings', href: '/account/settings' },
  ];
</script>

<div class="bg-gray-50 min-h-screen py-12">
  <div class="container-custom max-w-6xl">
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <!-- Sidebar -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="p-4 border-b border-gray-200">
            <h2 class="font-medium text-gray-800">Account</h2>
          </div>
          
          <nav class="p-2">
            <ul class="space-y-1">
              {#each accountNavigation as item}
                <li>
                  <a
                    href={item.href}
                    class="block px-3 py-2 rounded-md text-sm {$page.url.pathname === item.href 
                      ? 'bg-primary-50 text-primary-700 font-medium' 
                      : 'text-gray-700 hover:bg-gray-50'}"
                  >
                    {item.title}
                  </a>
                </li>
              {/each}
            </ul>
          </nav>
          
          <div class="p-4 border-t border-gray-200">
            <form action="/auth/signout" method="POST">
              <button type="submit" class="text-sm text-red-600 hover:text-red-800">
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </div>
      
      <!-- Main Content -->
      <div class="lg:col-span-3">
        <div class="bg-white rounded-lg shadow-md p-6">
          <slot />
        </div>
      </div>
    </div>
  </div>
</div>