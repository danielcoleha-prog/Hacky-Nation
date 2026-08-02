import { useEffect, useRef, useState } from 'react';
import { useCart } from '../lib/CartContext';
import { startCheckout } from '../lib/checkout';
import { formatPrice, SACK_BUNDLE_PRICE, BUNDLE_MIN_QTY } from '../lib/products';

export default function CartDrawer() {
  const { lines, subtotal, count, isOpen, closeCart, setQty, removeItem, bundleActive, savings, totalSackQty, items } =
    useCart();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const panelRef = useRef(null);

  /* Esc closes; focus moves into the panel when it opens. */
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') closeCart();
    };
    document.addEventListener('keydown', onKey);
    panelRef.current?.focus();
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, closeCart]);

  useEffect(() => {
    if (!isOpen) setError('');
  }, [isOpen]);

  async function onCheckout() {
    setBusy(true);
    setError('');
    try {
      await startCheckout(items);
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  }

  const sacksToBundle = BUNDLE_MIN_QTY - totalSackQty;

  return (
    <>
      <div
        onClick={closeCart}
        aria-hidden="true"
        className={`fixed inset-0 z-50 bg-ink/50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <aside
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l-2 border-ink bg-paper transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <header className="flex items-center justify-between border-b-2 border-ink px-6 py-4">
          <h2 className="font-display text-display-md uppercase text-ink">
            Your Cart{count > 0 && <span className="text-blue"> ({count})</span>}
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="grid h-10 w-10 place-content-center text-ink hover:text-blue"
          >
            <span className="material-symbols-outlined" aria-hidden="true">close</span>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {lines.length === 0 ? (
            <div className="grid h-full place-content-center text-center">
              <p className="font-display text-display-md uppercase text-ink-soft">Empty</p>
              <p className="mt-2 font-body text-body-md text-ink-soft">
                Nothing in the circle yet.
              </p>
              <button type="button" onClick={closeCart} className="btn-secondary mt-6">
                Keep Shopping
              </button>
            </div>
          ) : (
            <ul className="flex flex-col gap-5">
              {lines.map((line) => (
                <li key={line.key} className="flex gap-4 border-b-2 border-ink/10 pb-5">
                  <div className="grid h-20 w-20 shrink-0 place-content-center border-2 border-ink/15 bg-paper-deep">
                    <img
                      src={line.product.image}
                      alt=""
                      width={64}
                      height={64}
                      loading="lazy"
                      className="h-16 w-16 object-contain"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-label text-label-lg uppercase text-ink">
                      {line.product.fullName}
                    </p>
                    {line.size && (
                      <p className="mt-1 font-label text-label-caps uppercase text-ink-soft">
                        Size {line.size}
                      </p>
                    )}
                    <p className="mt-1 font-body text-body-md text-ink-soft">
                      {formatPrice(line.unitPrice)}
                      {line.discounted && (
                        <span className="ml-2 bg-yellow px-1.5 py-0.5 font-label text-[9px] uppercase tracking-widest text-ink">
                          Bundle
                        </span>
                      )}
                    </p>

                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex items-center border-2 border-ink">
                        <button
                          type="button"
                          onClick={() => setQty(line.key, line.qty - 1)}
                          aria-label={`Decrease quantity of ${line.product.fullName}`}
                          className="grid h-9 w-9 place-content-center text-ink hover:bg-ink hover:text-paper"
                        >
                          −
                        </button>
                        <span className="w-9 text-center font-label text-label-lg">{line.qty}</span>
                        <button
                          type="button"
                          onClick={() => setQty(line.key, line.qty + 1)}
                          aria-label={`Increase quantity of ${line.product.fullName}`}
                          className="grid h-9 w-9 place-content-center text-ink hover:bg-ink hover:text-paper"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(line.key)}
                        className="font-label text-label-caps uppercase text-ink-soft underline hover:text-red"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <p className="font-display text-lg text-ink">{formatPrice(line.lineTotal)}</p>
                </li>
              ))}
            </ul>
          )}

          {lines.length > 0 && !bundleActive && sacksToBundle > 0 && (
            <p className="mt-5 border-2 border-blue bg-blue/10 px-4 py-3 font-label text-label-caps uppercase leading-relaxed text-blue-deep">
              Add {sacksToBundle} more sack{sacksToBundle === 1 ? '' : 's'} — every sack drops to{' '}
              {formatPrice(SACK_BUNDLE_PRICE)}
            </p>
          )}
        </div>

        {lines.length > 0 && (
          <footer className="border-t-2 border-ink px-6 py-5">
            {bundleActive && savings > 0 && (
              <p className="mb-3 font-label text-label-caps uppercase text-blue">
                Bundle applied — you saved {formatPrice(savings)}
              </p>
            )}

            <div className="flex items-baseline justify-between">
              <span className="font-label text-label-lg uppercase text-ink-soft">Subtotal</span>
              <span className="font-display text-2xl text-ink">{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-1 font-body text-body-md text-ink-soft">
              Shipping and tax calculated at checkout.
            </p>

            {error && (
              <p role="alert" className="mt-3 border-2 border-red bg-red/10 px-3 py-2 font-body text-body-md text-red-deep">
                {error}
              </p>
            )}

            <button
              type="button"
              onClick={onCheckout}
              disabled={busy}
              className="btn-blue mt-4 w-full disabled:cursor-not-allowed disabled:opacity-60"
            >
              {busy ? 'Starting checkout…' : 'Checkout'}
            </button>
          </footer>
        )}
      </aside>
    </>
  );
}
