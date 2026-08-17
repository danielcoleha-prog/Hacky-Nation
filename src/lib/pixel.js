/**
 * Meta Pixel — the SPA half.
 *
 * The base pixel and the first PageView are installed in index.html. That
 * script tag can only ever see the initial page load, so everything a router
 * or a checkout does after that has to be reported from here.
 *
 * Every call no-ops when fbq is absent — ad blockers, local dev, the seconds
 * before Meta's script finishes loading — so callers never have to guard, and
 * analytics can never take a page down with it.
 */

const CURRENCY = 'USD';
const SNAPSHOT_KEY = 'hackyCheckout';
const REPORTED_KEY = 'hackyPurchaseReported';

function send(...args) {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return;
  try {
    window.fbq(...args);
  } catch {
    /* a broken pixel must never break the store */
  }
}

/** Standard Meta event. Params are optional. */
export function track(event, params) {
  if (params) send('track', event, params);
  else send('track', event);
}

/** Fired on every client-side route change; index.html covers the first load. */
export function trackPageView() {
  send('track', 'PageView');
}

export function trackViewContent(product) {
  if (!product) return;
  track('ViewContent', {
    content_type: 'product',
    content_ids: [product.id],
    content_name: product.fullName || product.name,
    value: product.price,
    currency: CURRENCY,
  });
}

export function trackAddToCart(product, qty = 1) {
  if (!product) return;
  track('AddToCart', {
    content_type: 'product',
    content_ids: [product.id],
    content_name: product.fullName || product.name,
    contents: [{ id: product.id, quantity: qty }],
    value: product.price * qty,
    currency: CURRENCY,
  });
}

/**
 * Fired just before we hand off to Stripe. Also stashes the cart, because the
 * customer leaves the site entirely at this point — by the time they come back
 * the cart has been cleared, and this is the only record of what they bought.
 */
export function trackInitiateCheckout(items, subtotal) {
  const payload = {
    content_type: 'product',
    content_ids: items.map((i) => i.id),
    contents: items.map((i) => ({ id: i.id, quantity: i.qty })),
    num_items: items.reduce((n, i) => n + i.qty, 0),
    value: subtotal,
    currency: CURRENCY,
  };
  track('InitiateCheckout', payload);

  try {
    sessionStorage.setItem(
      SNAPSHOT_KEY,
      JSON.stringify({ content_ids: payload.content_ids, contents: payload.contents, value: subtotal })
    );
  } catch {
    /* private browsing — Purchase falls back to Stripe's amount alone */
  }
}

export function readCheckoutSnapshot() {
  try {
    const raw = sessionStorage.getItem(SNAPSHOT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * The money event. `amount` comes from Stripe when we can reach it, since that
 * is the figure actually charged — shipping and any discount included — and a
 * cart subtotal is only ever an approximation of it.
 *
 * Guarded against double-counting: a customer who reloads the confirmation, or
 * gets sent the success URL twice, must not report two sales.
 */
export function trackPurchase({ sessionId, amount, snapshot }) {
  const value = typeof amount === 'number' ? amount : snapshot?.value;
  if (typeof value !== 'number') return;

  const stamp = sessionId || `anon:${value}`;
  try {
    const reported = JSON.parse(sessionStorage.getItem(REPORTED_KEY) || '[]');
    if (reported.includes(stamp)) return;
    sessionStorage.setItem(REPORTED_KEY, JSON.stringify([...reported, stamp].slice(-10)));
  } catch {
    /* can't dedupe without storage; still better to report the sale */
  }

  track('Purchase', {
    content_type: 'product',
    content_ids: snapshot?.content_ids || [],
    contents: snapshot?.contents || [],
    value,
    currency: CURRENCY,
  });

  try {
    sessionStorage.removeItem(SNAPSHOT_KEY);
  } catch {
    /* nothing to clean up */
  }
}
