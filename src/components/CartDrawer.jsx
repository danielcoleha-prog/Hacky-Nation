import { useEffect, useRef, useState } from 'react';
import { useCart } from '../lib/CartContext';
import { startCheckout } from '../lib/checkout';
import { formatPrice, SACK_BUNDLE_PRICE, BUNDLE_MIN_QTY } from '../lib/products';

export default function CartDrawer() {
  const {
    lines, subtotal, count, isOpen, closeCart, setQty, removeItem,
    bundleActive, savings, totalSackQty, packs, items,
  } = useCart();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const panelRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === 'Escape' && closeCart();
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
      await startCheckout(items, subtotal);
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
        className={`fixed inset-0 z-50 bg-ink/55 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <aside
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l-2 border-ink bg-paper transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <header className="flex items-center justify-between border-b-2 border-ink px-5 py-4">
          <h2 className="font-display text-display-md text-ink">
            Your cart
            {count > 0 && <span className="ml-2 text-blue">({count})</span>}
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="grid h-10 w-10 place-content-center border-2 border-ink bg-paper transition-colors hover:bg-ink hover:text-paper"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">close</span>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {lines.length === 0 ? (
            <div className="grid h-full place-content-center text-center">
              <span className="material-symbols-outlined mx-auto text-[44px] text-ink-faint" aria-hidden="true">
                shopping_bag
              </span>
              <p className="mt-4 font-display text-display-md text-ink">Nothing here yet</p>
              <p className="mt-2 font-body text-body-md text-ink-soft">
                The circle is waiting on you.
              </p>
              <button type="button" onClick={closeCart} className="btn-secondary mx-auto mt-7">
                Keep shopping
              </button>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {lines.map((line) => (
                <li key={line.key} className="flex gap-4 border-2 border-ink bg-paper p-3">
                  <div className="grid h-20 w-20 shrink-0 place-content-center border-2 border-ink bg-paper-deep">
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
                    <p className="font-display text-[14px] uppercase leading-tight text-ink">
                      {line.product.fullName}
                    </p>
                    {line.size && <p className="label mt-1 text-ink-faint">Size {line.size}</p>}

                    <p className="mt-1.5 flex items-center gap-2 font-body text-body-sm text-ink-soft">
                      {formatPrice(line.unitPrice)}
                      {line.discounted && (
                        <span className="border border-ink bg-red px-1.5 py-0.5 font-display text-[9px] uppercase tracking-widest text-paper">
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
                          className="grid h-8 w-8 place-content-center text-ink transition-colors hover:bg-ink hover:text-paper"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-numeric text-[13px]">
                          {line.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQty(line.key, line.qty + 1)}
                          aria-label={`Increase quantity of ${line.product.fullName}`}
                          className="grid h-8 w-8 place-content-center text-ink transition-colors hover:bg-ink hover:text-paper"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(line.key)}
                        className="label text-ink-faint underline underline-offset-2 transition-colors hover:text-red"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <p
                    className="font-numeric text-[15px] text-ink"
                  >
                    {formatPrice(line.lineTotal)}
                  </p>
                </li>
              ))}
            </ul>
          )}

          {lines.length > 0 && !bundleActive && sacksToBundle > 0 && (
            <p className="mt-5 border-2 border-blue bg-blue px-4 py-3 label leading-[1.7] text-paper">
              Add {sacksToBundle} more sack{sacksToBundle === 1 ? '' : 's'} — every sack drops to{' '}
              {formatPrice(SACK_BUNDLE_PRICE)}
            </p>
          )}
        </div>

        {lines.length > 0 && (
          <footer className="border-t-2 border-ink bg-paper-deep px-5 py-5">
            {/* Packs that formed on their own get a line each, so the total is
                traceable instead of a subtotal that quietly disagrees with the
                sum of the rows above it. */}
            {packs.length > 0 && (
              <ul className="mb-3 flex flex-col gap-1.5">
                {packs.map((pack, i) => (
                  <li
                    key={`${pack.id}-${i}`}
                    className="flex items-center justify-between gap-3 label text-blue-deep"
                  >
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px]" aria-hidden="true">sell</span>
                      {pack.name} applied
                    </span>
                    <span className="font-numeric">−{formatPrice(pack.saving)}</span>
                  </li>
                ))}
              </ul>
            )}

            {savings > 0 && (
              <p className="mb-3 label text-ink-soft">
                You saved {formatPrice(savings)} against buying these one at a time.
              </p>
            )}

            <div className="flex items-baseline justify-between">
              <span className="label text-ink-soft">Subtotal</span>
              <span
                className="font-numeric text-[1.6rem] leading-none text-ink"
              >
                {formatPrice(subtotal)}
              </span>
            </div>
            <p className="mt-1.5 font-body text-body-sm text-ink-soft">
              Shipping and tax calculated at checkout.
            </p>

            {error && (
              <p role="alert" className="mt-3 border-2 border-red bg-red/10 px-3 py-2 font-body text-body-sm text-red-deep">
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
              {!busy && <span aria-hidden="true">→</span>}
            </button>
          </footer>
        )}
      </aside>
    </>
  );
}
