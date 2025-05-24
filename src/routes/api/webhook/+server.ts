import { json } from '@sveltejs/kit';
import stripe from '$lib/server/stripe';
import { STRIPE_WEBHOOK_SECRET } from '$env/static/private';
import { prisma } from '$lib/server/db';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  const payload = await request.text();
  const signature = request.headers.get('stripe-signature');
  
  if (!signature) {
    return json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  try {
    const event = stripe.webhooks.constructEvent(payload, signature, STRIPE_WEBHOOK_SECRET);
    
    // Handle the event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      
      // Retrieve the session details
      const checkoutSession = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ['line_items'],
      });
      
      // Extract customer and order information
      const customerId = checkoutSession.customer as string;
      const shippingDetails = checkoutSession.shipping_details;
      const lineItems = checkoutSession.line_items?.data;
      
      if (customerId && shippingDetails && lineItems) {
        // Find the user by Stripe customer ID
        const user = await prisma.user.findFirst({
          where: { id: customerId },
        });
        
        if (user) {
          // Create or update shipping address
          const address = await prisma.address.create({
            data: {
              userId: user.id,
              firstName: shippingDetails.name?.split(' ')[0] || '',
              lastName: shippingDetails.name?.split(' ').slice(1).join(' ') || '',
              address: shippingDetails.address?.line1 || '',
              city: shippingDetails.address?.city || '',
              state: shippingDetails.address?.state || '',
              zipCode: shippingDetails.address?.postal_code || '',
              country: shippingDetails.address?.country || 'US',
            },
          });
          
          // Create the order
          await prisma.order.create({
            data: {
              userId: user.id,
              total: parseFloat((checkoutSession.amount_total! / 100).toFixed(2)),
              )
              )
              status: 'processing',
              paymentIntentId: checkoutSession.payment_intent as string,
              shippingAddressId: address.id,
              items: {
                create: lineItems.map(item => ({
                  productId: item.price?.product as string,
                  quantity: item.quantity || 1,
                  price: parseFloat((item.amount_total / 100).toFixed(2)),
                })),
              },
            },
          });
        }
      }
    }
    
    return json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return json({ error: 'Webhook error' }, { status: 400 });
  }
};