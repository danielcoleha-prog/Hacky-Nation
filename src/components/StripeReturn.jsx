import { useEffect, useState } from 'react';
import { useCart } from '../lib/CartContext';
import { readCheckoutSnapshot, trackPurchase } from '../lib/pixel';

/**
 * Handles the Stripe redirect back to the site: shows a flash banner, clears
 * the cart on success, reports the sale to Meta, and kicks off the Google
 * Customer Reviews opt-in.
 */
export default function StripeReturn() {
  const { clearCart } = useCart();
  const [flash, setFlash] = useState(null); // 'success' | 'cancel'

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const success = params.get('success');
    const cancel = params.get('cancel');
    const sessionId = params.get('session_id');

    if (!success && !cancel) return;

    if (success) {
      setFlash('success');
      clearCart();
      completeOrder(sessionId);
    } else {
      setFlash('cancel');
    }

    // Drop the query string so a refresh doesn't replay the banner.
    window.history.replaceState({}, '', window.location.pathname);
    // clearCart is stable for the life of the provider; run this once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!flash) return null;

  const isSuccess = flash === 'success';

  return (
    <div
      role="status"
      className={`relative z-30 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 border-b-2 border-ink px-6 py-3 text-center font-display text-label-lg uppercase ${
        isSuccess ? 'bg-blue text-paper' : 'bg-red text-paper'
      }`}
    >
      <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
        {isSuccess ? 'check_circle' : 'info'}
      </span>
      {isSuccess
        ? 'Order confirmed — check your email for the receipt. Welcome to the circle.'
        : 'Checkout cancelled. Your cart is still here whenever you are.'}
      <button
        type="button"
        onClick={() => setFlash(null)}
        aria-label="Dismiss"
        className="underline underline-offset-2"
      >
        Dismiss
      </button>
    </div>
  );
}

/**
 * One round trip to Stripe covers both post-purchase jobs: telling Meta what
 * the order was actually worth, and the Google review opt-in.
 */
async function completeOrder(sessionId) {
  const snapshot = readCheckoutSnapshot();
  let data = null;

  if (sessionId) {
    try {
      const res = await fetch(
        `/.netlify/functions/get-session?session_id=${encodeURIComponent(sessionId)}`
      );
      if (res.ok) data = await res.json();
    } catch {
      /* fall through — the cart snapshot still carries a usable value */
    }
  }

  /* Report the sale even if Stripe was unreachable. An approximate conversion
     beats a missing one: Meta optimizes against the events it receives, and a
     dropped Purchase teaches it that the ad didn't work. */
  trackPurchase({ sessionId, amount: data?.amount_total ?? undefined, snapshot });

  if (data) renderGCR(data);
}

/* Google Customer Reviews opt-in. Non-critical — fails silently. */
function renderGCR(data) {
  try {
    window._gcrData = data;
    window.renderOptIn = function renderOptIn() {
      if (!window._gcrData || !window.gapi) return;
      window.gapi.load('surveyoptin', () => {
        window.gapi.surveyoptin.render({
          merchant_id: 5783971572,
          order_id: window._gcrData.order_id,
          email: window._gcrData.email,
          delivery_country: window._gcrData.country,
          estimated_delivery_date: window._gcrData.estimated_delivery_date,
          opt_in_style: 'BOTTOM_RIGHT_DIALOG',
        });
      });
    };

    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js?onload=renderOptIn';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  } catch {
    /* opt-in is nice-to-have; never block the confirmation */
  }
}
