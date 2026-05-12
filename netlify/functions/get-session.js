const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const ALLOWED_ORIGINS = [
  process.env.URL,
  'http://localhost:8888',
  'http://localhost:3000',
].filter(Boolean);

exports.handler = async (event) => {
  const origin = event.headers.origin || event.headers.Origin || '';
  const corsHeaders = {
    'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0] || '',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders, body: '' };
  }

  const { session_id } = event.queryStringParameters || {};
  if (!session_id || !session_id.startsWith('cs_')) {
    return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Invalid session' }) };
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['customer_details'],
    });

    // Estimated delivery: 7 days from now
    const delivery = new Date();
    delivery.setDate(delivery.getDate() + 7);
    const estimatedDelivery = delivery.toISOString().split('T')[0];

    return {
      statusCode: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        order_id: session.payment_intent,
        email: session.customer_details?.email || '',
        country: session.customer_details?.address?.country || 'US',
        estimated_delivery_date: estimatedDelivery,
      }),
    };
  } catch (err) {
    console.error('Stripe error:', err.message);
    return { statusCode: 500, headers: corsHeaders, body: JSON.stringify({ error: 'Could not fetch session' }) };
  }
};
