const ENDPOINT = '/.netlify/functions/create-checkout-session';

/**
 * Hands the cart to Stripe. Sends only { id, qty, size } — the server holds the
 * price whitelist and recomputes every amount, so nothing here is trusted.
 * Resolves by navigating away; rejects with a displayable message.
 */
export async function startCheckout(items) {
  if (!items.length) throw new Error('Your cart is empty.');

  const payload = {
    items: items.map((i) => ({ id: i.id, qty: i.qty, size: i.size || undefined })),
  };

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  let data = {};
  try {
    data = await res.json();
  } catch {
    /* non-JSON error body — fall through to the generic message */
  }

  if (!res.ok || !data.url) {
    throw new Error(data.error || 'Checkout is unavailable right now. Please try again.');
  }

  window.location.href = data.url;
}
