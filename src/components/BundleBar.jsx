import { useState } from 'react';
import { useCart } from '../lib/CartContext';
import {
  SACKS,
  formatPrice,
  SACK_PRICE,
  SACK_BUNDLE_PRICE,
  BUNDLE_MIN_QTY,
} from '../lib/products';

/**
 * Pick-your-own bundle. Selecting 2+ sacks shows the saving live and adds them
 * in one go. Pricing here is display only — the Netlify function recomputes the
 * bundle rule server-side regardless of what the client sends.
 */
export default function BundleBar({ className = '' }) {
  const { addItem, openCart } = useCart();
  const [picked, setPicked] = useState([]);

  const toggle = (id) =>
    setPicked((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  const qualifies = picked.length >= BUNDLE_MIN_QTY;
  const unit = qualifies ? SACK_BUNDLE_PRICE : SACK_PRICE;
  const total = picked.length * unit;
  const saving = picked.length * (SACK_PRICE - SACK_BUNDLE_PRICE);
  const needed = BUNDLE_MIN_QTY - picked.length;

  function addBundle() {
    if (!picked.length) return;
    picked.forEach((id) => addItem(id));
    setPicked([]);
    openCart();
  }

  return (
    <section
      aria-labelledby="bundle-heading"
      className={`reveal relative overflow-hidden border-2 border-ink bg-ink text-paper shadow-press ${className}`}
    >
      <div
        aria-hidden="true"
        className="dotfield pointer-events-none absolute inset-0 opacity-[0.10]"
        style={{ '--dot': '#F2E9D8' }}
      />

      <div className="relative grid gap-8 p-6 md:p-9 lg:grid-cols-[1fr_20rem] lg:gap-12">
        <div>
          <p className="eyebrow text-yellow">Build a bundle</p>
          <h2 id="bundle-heading" className="mt-3 font-display text-display-lg text-paper">
            Any {BUNDLE_MIN_QTY}, {formatPrice(SACK_BUNDLE_PRICE)} each
          </h2>
          <p className="mt-3 max-w-md font-body text-body-md text-paper/65">
            Mix any colorways. The discount applies automatically — no code, and it
            stacks with whatever else is already in your cart.
          </p>

          <ul className="mt-7 flex flex-wrap gap-3">
            {SACKS.map((sack) => {
              const on = picked.includes(sack.id);
              return (
                <li key={sack.id}>
                  <button
                    type="button"
                    onClick={() => toggle(sack.id)}
                    aria-pressed={on}
                    className={`flex w-[5.5rem] flex-col items-center gap-2 border-2 p-2 transition-all duration-150 ${
                      on
                        ? 'border-yellow bg-paper/10'
                        : 'border-paper/25 hover:border-paper/60'
                    }`}
                  >
                    <span className="relative grid h-14 w-14 place-content-center">
                      <img
                        src={sack.image}
                        alt=""
                        width={112}
                        height={112}
                        loading="lazy"
                        decoding="async"
                        className={`h-14 w-14 object-contain ${sack.cutout === false ? 'rounded-full object-cover' : ''}`}
                      />
                      {on && (
                        <span
                          aria-hidden="true"
                          className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-content-center rounded-full bg-yellow text-ink"
                        >
                          <span className="material-symbols-outlined text-[13px]">check</span>
                        </span>
                      )}
                    </span>
                    <span className="text-center font-body text-[10px] font-bold uppercase leading-tight tracking-[0.04em] text-paper">
                      {sack.name}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ---------- running total ---------- */}
        <aside className="flex flex-col justify-between border-2 border-paper/25 p-5">
          <div>
            <p className="label text-paper/55">Your bundle</p>

            <p
              className="mt-3 font-display text-[2.6rem] leading-none tabular-nums text-paper"
              style={{ fontVariationSettings: "'wght' 900, 'wdth' 92" }}
            >
              {formatPrice(total)}
            </p>

            <p className="mt-2 font-body text-body-sm text-paper/60">
              {picked.length === 0
                ? 'Pick your first sack'
                : `${picked.length} sack${picked.length === 1 ? '' : 's'} · ${formatPrice(unit)} each`}
            </p>

            <div className="mt-5 min-h-[3.25rem]">
              {qualifies ? (
                <p className="flex items-center gap-2 border-2 border-yellow bg-yellow px-3 py-2.5 label text-ink">
                  <span className="material-symbols-outlined text-[16px]" aria-hidden="true">sell</span>
                  Bundle price — saving {formatPrice(saving)}
                </p>
              ) : (
                <p className="border-2 border-paper/25 px-3 py-2.5 label text-paper/70">
                  {picked.length === 0
                    ? `Add ${BUNDLE_MIN_QTY} to unlock ${formatPrice(SACK_BUNDLE_PRICE)} each`
                    : `Add ${needed} more to save ${formatPrice(SACK_PRICE - SACK_BUNDLE_PRICE)} on every sack`}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={addBundle}
            disabled={!picked.length}
            className="btn mt-5 w-full border-paper bg-paper text-ink transition-all hover:-translate-x-[2px] hover:-translate-y-[2px] disabled:cursor-not-allowed disabled:opacity-45"
            style={{ boxShadow: '3px 3px 0 0 var(--press-blue)' }}
          >
            {picked.length ? `Add ${picked.length} to cart` : 'Pick your sacks'}
          </button>
        </aside>
      </div>
    </section>
  );
}
