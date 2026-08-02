import { useEffect, useState } from 'react';
import { useCart } from '../lib/CartContext';

/**
 * Handles the Stripe redirect back to the site: shows a flash banner, clears
 * the cart on success, and kicks off the Google Customer Reviews opt-in.
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
      if (sessionId) renderGCR(sessionId);
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
        isSuccess ? 'bg-blue text-paper' : 'bg-yellow text-ink'
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

/* Google Customer Reviews opt-in. Non-critical — fails silently. */
async function renderGCR(sessionId) {
  try {
    const res = await fetch(
      `/.netlify/functions/get-session?session_id=${encodeURIComponent(sessionId)}`
    );
    if (!res.ok) return;
    const data = await res.json();

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
