<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  let isLoading = false;
  let error = $page.url.searchParams.get('error') || '';
  
  async function handleGoogleSignIn() {
    isLoading = true;
    // In production this would redirect to Google OAuth
    console.log('Signing up with Google');
    isLoading = false;
  }
  
  async function handleFacebookSignIn() {
    isLoading = true;
    // In production this would redirect to Facebook OAuth
    console.log('Signing up with Facebook');
    isLoading = false;
  }
</script>

<svelte:head>
  <title>Create Account | Mango Paradise</title>
</svelte:head>

<div class="bg-gray-50 min-h-screen py-12 md:py-20">
  <div class="container-custom max-w-md">
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="px-6 py-8">
        <div class="text-center mb-8">
          <h1 class="text-2xl font-bold text-gray-800">Create an Account</h1>
          <p class="text-gray-600 mt-2">Join Mango Paradise for fresh, premium mangoes delivered to your door.</p>
        </div>
        
        {#if error}
          <div class="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {#if error === 'OAuthAccountNotLinked'}
              The email is already associated with another account.
            {:else}
              An error occurred. Please try again.
            {/if}
          </div>
        {/if}
        
        <div class="space-y-4">
          <button 
            class="w-full flex justify-center items-center bg-white border border-gray-300 rounded-md py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            on:click={handleGoogleSignIn}
            disabled={isLoading}
          >
            <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Sign up with Google
          </button>
          
          <button 
            class="w-full flex justify-center items-center bg-[#1877F2] rounded-md py-2 px-4 text-sm font-medium text-white hover:bg-[#166FE5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1877F2]"
            on:click={handleFacebookSignIn}
            disabled={isLoading}
          >
            <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
            </svg>
            Sign up with Facebook
          </button>
        </div>
        
        <div class="mt-8 text-center">
          <p class="text-sm text-gray-600">
            Already have an account?
            <a href="/auth/signin" class="font-medium text-primary-600 hover:text-primary-500">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</div>