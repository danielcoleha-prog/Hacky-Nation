const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// Same rules file the cart imports. Sack prices, the multi rate and the
// automatic packs all come from here so the two can never drift apart.
const PRICING = require('../../src/lib/pricing.cjs');

// Server-side product whitelist — clients cannot manipulate prices
const PRODUCTS = {
  'magical-sack':       { name: 'The Magical Sack', },
  'pink-lemonade-sack': { name: 'Pink Lemonade Foot Bag', },
  'candy-corn-sack':    { name: 'Candy Corn Foot Bag', },
  'star-burst-sack':    { name: 'Star Burst Foot Bag', },
  'specialty-duo':      { name: 'The Specialty Duo',       price: 2900 },
  'og-pack':            { name: 'The OG Pack',             price: 4900 },
  '14-panel-pack':      { name: 'The 14 Panel Pack',       price: 3900 },
  '32-panel-pack':      { name: 'The 32 Panel Pack',       price: 3900 },
  'mystery-bag':    { name: 'Hand Knit Mystery Bag',  price: 1000 },
  'shirt-white':    { name: 'Hacky Nation Tee — White', price: 2000 },
  'shirt-black':    { name: 'Hacky Nation Tee — Black', price: 2000 },
  'sunset-sack':    { name: 'Sunset Foot Bag', },
  'bulldawgs-sack': { name: 'Bulldawgs Foot Bag', },
  'sky-sack':       { name: 'Sky Foot Bag', },
  'patriot-sack':   { name: 'Patriot Foot Bag', },
  'usl-pro-sack':   { name: 'USASackLeague X Hacky Nation Pro Sack', },
};

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

  const pricing = PRICING.priceSacks(
    validatedItems.filter(i => PRICING.isSackId(i.id)).map(i => ({ id: i.id, qty: i.qty }))
  );

  const lineItems = [];
  const orderSummaryParts = [];

  const push = (name, amount) => {
    orderSummaryParts.push(name);
    lineItems.push({
      price_data: {
        currency: 'usd',
        product_data: {
          name,
          tax_code: 'txcd_99999999', // General — Tangible Goods
        },
        unit_amount: amount,
        tax_behavior: 'exclusive',
      },
      quantity: 1,
    });
  };

  // Packs the cart formed on its own, billed as the pack rather than as parts.
  for (const pack of pricing.applied) {
    push(pack.name, pack.price);
  }

  // Whatever sacks were left over after those packs came out.
  for (const line of pricing.loose) {
    push(`${PRODUCTS[line.id].name} x${line.qty}`, line.total);
  }

  // Tees, the mystery bag, and packs bought outright — ordinary priced goods.
  for (const { product, qty, size, id } of validatedItems) {
    if (PRICING.isSackId(id)) continue;
    const baseName = size ? `${product.name} — ${size}` : product.name;
    push(`${baseName} x${qty}`, product.price * qty);
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      automatic_tax: { enabled: true },
      payment_intent_data: { description: orderSummaryParts.join(', ') },
      allow_promotion_codes: true,
      shipping_address_collection: {
        allowed_countries: ['US'],
      },
      shipping_options: [
        { shipping_rate: 'shr_1TbSltQ7R19docShrqObxzKi' },
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
