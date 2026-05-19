const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Server-side product whitelist — clients cannot manipulate prices
const PRODUCTS = {
  'mystery-bag':    { name: 'Hand Knit Mystery Bag',  price: 1000 },
  'shirt-white':    { name: 'Hacky Nation Tee — White', price: 1900 },
  'shirt-black':    { name: 'Hacky Nation Tee — Black', price: 1900 },
  'sunset-sack':    { name: 'Sunset Foot Bag',          price: 1700, bundlePrice: 1500 },
  'bulldawgs-sack': { name: 'Bulldawgs Foot Bag',       price: 1700, bundlePrice: 1500 },
  'sky-sack':       { name: 'Sky Foot Bag',             price: 1700, bundlePrice: 1500 },
  'patriot-sack':   { name: 'Patriot Foot Bag',         price: 1700, bundlePrice: 1500 },
};

const SACK_IDS = new Set(['sunset-sack', 'bulldawgs-sack', 'sky-sack', 'patriot-sack']);

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
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: corsHeaders, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  let items;
  try {
    ({ items } = JSON.parse(event.body));
  } catch {
    return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Invalid request body' }) };
  }

  if (!Array.isArray(items) || items.length === 0) {
    return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Cart is empty' }) };
  }

  // Validate items and compute total sack qty for bundle pricing
  const validatedItems = [];
  for (const item of items) {
    const product = PRODUCTS[item.id];
    if (!product) {
      return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: `Unknown product: ${item.id}` }) };
    }
    const qty = parseInt(item.qty, 10);
    if (!qty || qty < 1 || qty > 20) {
      return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Invalid quantity' }) };
    }
    const size = typeof item.size === 'string' && /^(S|M|L|XL|XXL)$/.test(item.size) ? item.size : null;
    validatedItems.push({ product, qty, size, id: item.id });
  }

  const totalSackQty = validatedItems.filter(i => SACK_IDS.has(i.id)).reduce((s, i) => s + i.qty, 0);
  const isBundleOrder = totalSackQty >= 2;

  const lineItems = [];
  const orderSummaryParts = [];
  for (const { product, qty, size, id } of validatedItems) {
    const unitPrice = SACK_IDS.has(id) && isBundleOrder ? product.bundlePrice : product.price;
    const baseName = size ? `${product.name} — ${size}` : product.name;
    orderSummaryParts.push(`${baseName} x${qty}`);
    lineItems.push({
      price_data: {
        currency: 'usd',
        product_data: { name: `${baseName} x${qty}` },
        unit_amount: unitPrice * qty,
      },
      quantity: 1,
    });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      payment_intent_data: { description: orderSummaryParts.join(', ') },
      allow_promotion_codes: true,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'],
      },
      shipping_options: [
        { shipping_rate: 'shr_1TTCaSQ7R19docShWmxtVoEp' },
      ],
      phone_number_collection: { enabled: true },
      success_url: `${process.env.URL || 'http://localhost:8888'}/?success=1&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${process.env.URL || 'http://localhost:8888'}/?cancel=1`,
    });

    return {
      statusCode: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err) {
    console.error('Stripe error:', err.message);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Payment initialization failed. Please try again.' }),
    };
  }
};
