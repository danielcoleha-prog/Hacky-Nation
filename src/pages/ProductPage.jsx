import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { getSack, SACKS, formatPrice, SACK_BUNDLE_PRICE } from '../lib/products';
import { useCart } from '../lib/CartContext';
import Seal from './../components/Seal';

export default function ProductPage() {
  const { id } = useParams();
  const sack = getSack(id);
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  /* New product, fresh scroll position and quantity. */
  useEffect(() => {
    window.scrollTo(0, 0);
    setQty(1);
  }, [id]);

  useEffect(() => {
    if (!sack) return;
    const previous = document.title;
    document.title = `${sack.fullName} — Hacky Nation`;
    return () => {
      document.title = previous;
    };
  }, [sack]);

  if (!sack) return <Navigate to="/" replace />;

  const others = SACKS.filter((s) => s.id !== sack.id);

  return (
    <main className="paper-grain relative bg-paper">
      <div className="relative z-10 mx-auto max-w-site px-6 py-10 md:px-10 md:py-16">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 font-label text-label-caps uppercase text-ink-soft">
            <li>
              <Link to="/" className="hover:text-blue">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link to="/#shop" className="hover:text-blue">Sacks</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-ink">{sack.name}</li>
          </ol>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* ---------- gallery ---------- */}
          <div className="relative">
            <div className="relative grid aspect-square place-content-center overflow-hidden border-2 border-ink bg-paper-deep">
              <div
                aria-hidden="true"
                className="absolute aspect-square w-[62%] rounded-full"
                style={{ backgroundColor: sack.accent, opacity: 0.28 }}
              />
              <div
                aria-hidden="true"
                className="halftone absolute inset-y-0 right-0 w-1/3 opacity-40"
              />
              <img
                src={sack.image}
                alt={`${sack.fullName} — ${sack.sub.toLowerCase()}`}
                width={900}
                height={900}
                fetchPriority="high"
                decoding="async"
                className="relative z-10 h-auto w-[76%] justify-self-center object-contain drop-shadow-cut"
              />
            </div>

            <Seal
              variant={sack.preorder ? 'yellow' : 'blue'}
              burst
              lines={sack.preorder ? ['PRE', 'ORDER'] : ['IN', 'STOCK']}
              className="absolute -bottom-4 -left-4 rotate-[-8deg]"
            />
          </div>

          {/* ---------- detail ---------- */}
          <div>
            <p className="font-label text-label-caps uppercase text-blue">{sack.sub}</p>
            <h1 className="mt-3 font-display text-display-xl uppercase text-ink">
              {sack.fullName}
            </h1>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-display text-4xl text-ink">{formatPrice(sack.price)}</span>
              {sack.compareAt > sack.price && (
                <span className="font-label text-label-lg text-ink-soft line-through">
                  {formatPrice(sack.compareAt)}
                </span>
              )}
            </div>

            <p className="mt-5 max-w-md font-body text-body-lg text-ink-soft">{sack.desc}</p>

            <ul className="mt-6 flex flex-col gap-2">
              {[
                `${sack.panels} suede panels`,
                'Handmade one at a time',
                'Weighted for a true kick',
              ].map((spec) => (
                <li key={spec} className="flex items-center gap-2 font-body text-body-md text-ink">
                  <span className="material-symbols-outlined text-lg text-blue" aria-hidden="true">
                    check
                  </span>
                  {spec}
                </li>
              ))}
            </ul>

            {/* colourway */}
            <div className="mt-6">
              <p className="font-label text-label-caps uppercase text-ink-soft">Colorway</p>
              <div className="mt-2 flex gap-2">
                {sack.colors.map((c) => (
                  <span
                    key={c}
                    className="h-8 w-8 border-2 border-ink"
                    style={{ backgroundColor: c }}
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>

            {/* qty + add */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex items-center border-2 border-ink">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="grid h-12 w-12 place-content-center text-ink hover:bg-ink hover:text-paper"
                >
                  −
                </button>
                <span className="w-12 text-center font-label text-label-lg" aria-live="polite">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.min(20, q + 1))}
                  aria-label="Increase quantity"
                  className="grid h-12 w-12 place-content-center text-ink hover:bg-ink hover:text-paper"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={() => addItem(sack.id, { qty })}
                className="btn-primary flex-1 min-w-[200px]"
              >
                Add To Cart — {formatPrice(sack.price * qty)}
              </button>
            </div>

            <p className="mt-4 border-2 border-blue bg-blue/10 px-4 py-3 font-label text-label-caps uppercase leading-relaxed text-blue-deep">
              Buy 2 or more sacks — {formatPrice(SACK_BUNDLE_PRICE)} each
            </p>

            <p className="mt-4 font-body text-body-md text-ink-soft">
              {sack.preorder ? 'Currently in production · ships in ~3 weeks · ' : 'Ready to ship · '}
              <a href="/pre-order-policy.html" className="underline hover:text-blue">
                Images may vary*
              </a>
            </p>
          </div>
        </div>

        {/* ---------- other sacks ---------- */}
        <section aria-labelledby="more-heading" className="mt-20">
          <h2 id="more-heading" className="font-display text-display-lg uppercase text-ink">
            More Sacks
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {others.map((other) => (
              <Link
                key={other.id}
                to={`/sacks/${other.id}`}
                className="group border-2 border-ink bg-paper p-4 shadow-card transition-transform hover:-translate-y-1"
              >
                <div className="grid place-content-center bg-paper-deep py-4">
                  <img
                    src={other.image}
                    alt=""
                    width={200}
                    height={200}
                    loading="lazy"
                    decoding="async"
                    className="h-24 w-24 object-contain transition-transform group-hover:scale-105"
                  />
                </div>
                <p className="mt-3 font-label text-label-lg uppercase text-ink">{other.name}</p>
                <p className="font-body text-body-md text-ink-soft">{formatPrice(other.price)}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
