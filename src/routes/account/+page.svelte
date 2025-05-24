<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  
  let user = $page.data.session?.user;
  let isEditing = false;
  let formData = {
    name: user?.name || '',
    email: user?.email || '',
    phone: ''
  };
  
  function handleEdit() {
    isEditing = true;
  }
  
  function handleCancel() {
    isEditing = false;
    // Reset form data
    formData = {
      name: user?.name || '',
      email: user?.email || '',
      phone: ''
    };
  }
  
  async function handleSave() {
    // Here we would submit the updated user data to the server
    // For demo purposes, we'll just toggle the editing state
    isEditing = false;
    
    // Update local user data (in production this would come from the server)
    user = {
      ...user,
      name: formData.name,
      email: formData.email
    };
  }
</script>

<svelte:head>
  <title>Account | Mango Paradise</title>
</svelte:head>

<div class="space-y-6">
  <div class="flex justify-between items-center">
    <h1 class="text-2xl font-bold text-gray-800">My Profile</h1>
    
    {#if !isEditing}
      <button 
        class="text-sm text-primary-600 hover:text-primary-800 font-medium"
        on:click={handleEdit}
      >
        Edit Profile
      </button>
    {/if}
  </div>
  
  {#if user}
    {#if !isEditing}
      <div class="space-y-4">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-semibold text-lg mr-4">
            {user.name ? user.name[0].toUpperCase() : 'U'}
          </div>
          <div>
            <h2 class="font-medium text-gray-800">{user.name || 'User'}</h2>
            <p class="text-gray-500 text-sm">{user.email}</p>
          </div>
        </div>
        
        <div class="border-t border-gray-200 pt-4 mt-4">
          <h3 class="font-medium text-gray-800 mb-2">Account Details</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-500">Name</p>
              <p>{user.name || 'Not provided'}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Email</p>
              <p>{user.email}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Phone</p>
              <p>Not provided</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Account Created</p>
              <p>{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    {:else}
      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              id="name"
              bind:value={formData.name}
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>
          
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              id="email"
              bind:value={formData.email}
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>
          
          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              id="phone"
              bind:value={formData.phone}
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>
        </div>
        
        <div class="flex justify-end space-x-3 mt-4 pt-4 border-t border-gray-200">
          <button 
            class="btn-secondary"
            on:click={handleCancel}
          >
            Cancel
          </button>
          <button 
            class="btn-primary"
            on:click={handleSave}
          >
            Save Changes
          </button>
        </div>
      </div>
    {/if}
  {:else}
    <div class="text-center py-8">
      <p class="text-gray-600 mb-4">Please sign in to view your profile</p>
      <a href="/auth/signin" class="btn-primary inline-block">Sign In</a>
    </div>
  {/if}
</div>