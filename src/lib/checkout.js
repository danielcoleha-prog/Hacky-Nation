import { trackInitiateCheckout } from './pixel';

const ENDPOINT = '/.netlify/functions/create-checkout-session';

/**
 * Hands the cart to Stripe. Sends only { id, qty, size } — the server holds the
 * price whitelist and recomputes every amount, so nothing here is trusted.
 * Resolves by navigating away; rejects with a displayable message.
 *
 * `subtotal` is for the pixel only and never reaches the server.
 */
export async function startCheckout(items, subtotal) {
  if (!items.length) throw new Error('Your cart is empty.');

  /* Reported on intent rather than just before the redirect: once we navigate
     to Stripe the page is gone, and a beacon fired in that last instant is not
     reliably delivered. */
  trackInitiateCheckout(items, subtotal);

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
