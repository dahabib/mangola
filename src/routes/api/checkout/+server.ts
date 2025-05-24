import { json } from '@sveltejs/kit';
import { createCheckoutSession } from '$lib/server/stripe';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
  try {
    const { items } = await request.json();
    
    // Validate items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return json({ error: 'Invalid items' }, { status: 400 });
    }
    
    // Get the current user (if logged in)
    const session = await locals.auth();
    const customerId = session?.user?.id;
    
    // Create a checkout session
    const checkoutSession = await createCheckoutSession(items, customerId);
    
    return json({ url: checkoutSession.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return json({ error: 'Error creating checkout session' }, { status: 500 });
  }
};