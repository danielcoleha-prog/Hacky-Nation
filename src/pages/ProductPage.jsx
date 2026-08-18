import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { getProduct, isSack, isBundle, SACKS, SIZES, formatPrice, SACK_BUNDLE_PRICE } from '../lib/products';
import { useCart } from '../lib/CartContext';
import { useReveal } from '../lib/useReveal';
import { trackViewContent } from '../lib/pixel';
import Seal from '../components/Seal';

const SPECS = (sack) => [
  { k: 'Panels', v: sack.panels },
  { k: 'Material', v: 'Premium suede' },
  { k: 'Fill', v: 'Weighted pellet' },
  { k: 'Made', v: 'By hand' },
];

export default function ProductPage() {
  const { id } = useParams();
  /* Resolves any sellable product, not just sacks — the tees and mystery bag
     have their own pages now and share this template. */
  const sack = getProduct(id);
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(null);
  const [sizeError, setSizeError] = useState(false);
  /* Tees lead with the back (the PLAY WITH YOUR SACK. print); everything else
     has a single view. */
  const [showFront, setShowFront] = useState(false);
  const [active, setActive] = useState(0);
  useReveal([id]);

  /* The cut-out hero first, then the lifestyle shots. Tees never build a
     rail — they have their own front/back toggle. Declared above the
     not-found guard so the hook order stays stable between renders. */
  const views = useMemo(() => {
    if (!sack) return [];
    const hero = {
      src: sack.image,
      thumb: sack.image,
      alt: `${sack.fullName} — ${sack.sub.toLowerCase()}`,
      cutout: sack.cutout !== false,
    };
    const isTee = Array.isArray(sack.sizes) || sack.id.startsWith('shirt');
    if (isTee) return [hero];
    return [hero, ...(sack.gallery || []).map((g) => ({ ...g, cutout: false }))];
  }, [sack]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setQty(1);
    setSize(Array.isArray(sack?.sizes) && sack.sizes.length === 1 ? sack.sizes[0] : null);
    setSizeError(false);
    setShowFront(false);
    setActive(0);
  }, [id, sack]);

  /* Feeds Meta's product-level retargeting — the audience of people who looked
     at a specific sack and didn't buy it. */
  useEffect(() => {
    trackViewContent(sack);
  }, [sack]);

  useEffect(() => {
    if (!sack) return;
    const previous = document.title;
    document.title = `${sack.fullName} — Hacky Nation`;
    return () => {
      document.title = previous;
    };
  }, [sack]);

  /* Packs are sold from the shop grid, not a product page of their own. */
  if (!sack || isBundle(id)) return <Navigate to={isBundle(id) ? '/shop' : '/'} replace />;

  const others = SACKS.filter((s) => s.id !== sack.id).slice(0, 4);
  const needsSize = Array.isArray(sack.sizes) || sack.id.startsWith('shirt');
  /* A product can narrow the run — the tees are XL-only right now, so offering
     the full S–XXL would let people order sizes that don't exist. */
  const sizeOptions = Array.isArray(sack.sizes) ? sack.sizes : SIZES;
  const isASack = isSack(sack.id);
  /* Clamped: a stale index from the previous product would read undefined. */
  const current = views[Math.min(active, views.length - 1)];

  function handleAdd() {
    if (needsSize && !size) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addItem(sack.id, needsSize ? { qty, size } : { qty });
  }

  return (
    <main className="paper-grain relative bg-paper">
      <div className="relative z-10 mx-auto max-w-site px-5 py-8 md:px-8 md:py-12">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 label text-ink-faint">
            <li><Link to="/" className="transition-colors hover:text-blue">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link to="/shop" className="transition-colors hover:text-blue">Shop</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-ink">{sack.name}</li>
          </ol>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* ---------- gallery ----------
              self-start so the column hugs the image; stretched to the detail
              column's height, the seal's bottom anchor lands far below it. */}
          <div className="self-start">
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:gap-4">
              {/* Thumbnail rail — a vertical strip beside the image on desktop,
                  a horizontal scroller under it on phones, where a left column
                  would eat a third of the width. */}
              {views.length > 1 && (
                <div
                  role="group"
                  aria-label="Product images"
                  className="no-scrollbar flex gap-3 overflow-x-auto sm:w-[74px] sm:shrink-0 sm:flex-col sm:overflow-visible"
                >
                  {views.map((view, i) => (
                    <button
                      key={view.src}
                      type="button"
                      onClick={() => setActive(i)}
                      aria-pressed={i === active}
                      aria-label={view.alt}
                      className={`relative aspect-square w-[66px] shrink-0 overflow-hidden border-2 bg-paper-deep transition-colors sm:w-full ${
                        i === active ? 'border-blue' : 'border-ink/30 hover:border-ink'
                      }`}
                    >
                      <img
                        src={view.thumb}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className={
                          view.cutout ? 'h-full w-full object-contain p-1' : 'h-full w-full object-cover'
                        }
                      />
                    </button>
                  ))}
                </div>
              )}

              <div className="relative flex-1">
                <div className="relative flex aspect-square items-center justify-center overflow-hidden border-2 border-ink bg-paper-deep shadow-press">
                  {/* The disc and dot field sit behind the cut-out hero only —
                      under a full-bleed photo they would never be seen. */}
                  {current.cutout && (
                    <>
                      <div aria-hidden="true" className="dotfield pointer-events-none absolute inset-0 opacity-[0.13]" />
                      <div
                        aria-hidden="true"
                        className="absolute left-1/2 top-1/2 aspect-square w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full"
                        style={{ backgroundColor: sack.accent, opacity: 0.26 }}
                      />
                    </>
                  )}
                  {needsSize && !showFront && !sack.imageBack ? (
                    <div className="relative z-10 flex flex-col items-center gap-3 px-8 text-center">
                      <span className="material-symbols-outlined text-[38px] text-ink-faint" aria-hidden="true">
                        add_a_photo
                      </span>
                      <span className="label text-ink-faint">Back photo placeholder</span>
                      <span className="font-body text-body-sm text-ink-faint">PLAY WITH YOUR SACK.</span>
                    </div>
                  ) : (
                    <img
                      src={needsSize ? (showFront ? sack.imageFront || sack.image : sack.imageBack || sack.image) : current.src}
                      alt={needsSize ? `${sack.fullName} — ${showFront ? 'front' : 'back'}` : current.alt}
                      width={900}
                      height={900}
                      fetchPriority={active === 0 ? 'high' : 'auto'}
                      decoding="async"
                      className={
                        current.cutout
                          ? 'relative z-10 h-[72%] w-auto max-w-[82%] object-contain'
                          : 'relative z-10 h-full w-full object-cover'
                      }
                      style={current.cutout ? { filter: 'drop-shadow(0 26px 30px rgba(16,26,46,0.3))' } : undefined}
                    />
                  )}
                </div>

                <Seal
                  variant={sack.preorder ? 'red' : 'blue'}
                  burst
                  size="lg"
                  lines={sack.preorder ? ['PRE', 'ORDER'] : ['IN', 'STOCK']}
                  /* Tees add a Back/Front toggle under the image, which the
                     bottom-left anchor would collide with — sit above it there. */
                  className={`absolute rotate-[-9deg] ${needsSize ? '-left-4 -top-5' : '-bottom-5 -left-4'}`}
                />
              </div>
            </div>

            {/* Tees only — a real toggle rather than hover, since this is the
                page where you decide, and hover is unavailable on touch. */}
            {needsSize && (
              <div className="mt-4 flex gap-2" role="group" aria-label="Choose view">
                {[
                  { key: 'back', label: 'Back', on: !showFront },
                  { key: 'front', label: 'Front', on: showFront },
                ].map((view) => (
                  <button
                    key={view.key}
                    type="button"
                    onClick={() => setShowFront(view.key === 'front')}
                    aria-pressed={view.on}
                    className={`flex-1 border-2 border-ink px-4 py-2.5 label transition-colors ${
                      view.on ? 'bg-ink text-paper' : 'bg-paper text-ink hover:bg-paper-deep'
                    }`}
                  >
                    {view.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ---------- detail ---------- */}
          <div>
            <p className="eyebrow">{sack.sub}</p>

            <h1 className="mt-3 font-display text-display-xl text-ink">
              {sack.fullName}
            </h1>

            <div className="mt-5 flex items-baseline gap-3">
              <span
                className="font-numeric text-[2.6rem] leading-none text-ink"
              >
                {formatPrice(sack.price)}
              </span>
              {sack.compareAt > sack.price && (
                <span className="font-body text-body-md text-ink-faint line-through">
                  {formatPrice(sack.compareAt)}
                </span>
              )}
            </div>

            <p className="mt-5 max-w-md font-body text-body-lg text-ink-soft">{sack.desc}</p>

            {isASack && (
            <dl className="mt-7 grid grid-cols-2 gap-px border-2 border-ink bg-ink/15 sm:grid-cols-4">
              {SPECS(sack).map((spec) => (
                <div key={spec.k} className="bg-paper px-3 py-3">
                  <dt className="label text-[10px] text-ink-faint">{spec.k}</dt>
                  <dd className="mt-1.5 font-display text-[13px] uppercase leading-tight text-ink">
                    {spec.v}
                  </dd>
                </div>
              ))}
            </dl>
            )}

            {sack.colors && (
            <div className="mt-6">
              <p className="label text-ink-faint">Colorway</p>
              <div className="mt-2.5 flex gap-2">
                {sack.colors.map((c) => (
                  <span
                    key={c}
                    className="h-9 w-9 rounded-full border-2 border-ink"
                    style={{ backgroundColor: c }}
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>
            )}

            {/* size picker — tees only, and required before adding */}
            {needsSize && (
              <div className="mt-6">
                <p className="label text-ink-faint">Size</p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {sizeOptions.map((s2) => (
                    <button
                      key={s2}
                      type="button"
                      onClick={() => { setSize(s2); setSizeError(false); }}
                      aria-pressed={size === s2}
                      className={`h-11 min-w-[3rem] border-2 border-ink px-3 label transition-colors ${
                        size === s2 ? 'bg-ink text-paper' : 'bg-paper text-ink hover:bg-paper-deep'
                      }`}
                    >
                      {s2}
                    </button>
                  ))}
                </div>
                {sizeError && (
                  <p role="alert" className="mt-2.5 label text-red">Pick a size first</p>
                )}
              </div>
            )}

            <div className="mt-8 flex flex-wrap items-stretch gap-3">
              <div className="flex items-center border-2 border-ink bg-paper">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="grid h-[52px] w-12 place-content-center text-ink transition-colors hover:bg-ink hover:text-paper"
                >
                  −
                </button>
                <span className="w-11 text-center font-numeric text-[15px]" aria-live="polite">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.min(20, q + 1))}
                  aria-label="Increase quantity"
                  className="grid h-[52px] w-12 place-content-center text-ink transition-colors hover:bg-ink hover:text-paper"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="btn-primary min-w-[220px] flex-1 py-4"
              >
                Add to cart — {formatPrice(sack.price * qty)}
              </button>
            </div>

            {isASack && (
            <p className="mt-4 flex items-center gap-2.5 border-2 border-blue bg-blue px-4 py-3 label leading-[1.7] text-paper">
              <span className="material-symbols-outlined text-[17px]" aria-hidden="true">sell</span>
              Buy 2 or more sacks — {formatPrice(SACK_BUNDLE_PRICE)} each
            </p>
            )}

            <p className="mt-4 font-body text-body-sm text-ink-soft">
              {sack.preorder ? 'Currently in production · ships in ~3 weeks · ' : 'Ready to ship · '}
              <a href="/pre-order-policy.html" className="underline underline-offset-2 hover:text-blue">
                Images may vary*
              </a>
            </p>
          </div>
        </div>

        {/* ---------- add another sack ----------
            The cross-sell that replaced the old standalone bundle builder.
            Each card adds straight to the cart without leaving this page, so
            reaching the 2-sack price never costs you the product you were
            already looking at. The name still links through for anyone who
            wants the full page instead. */}
        <section aria-labelledby="more-heading" className="mt-20 border-t-2 border-ink pt-6 md:mt-28">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="more-heading" className="font-display text-display-lg text-ink">
                Add another sack
              </h2>
              <p className="mt-2 font-body text-body-md text-ink-soft">
                Any 2 sacks drop to {formatPrice(SACK_BUNDLE_PRICE)} each — mix any colorways.
              </p>
            </div>
            <Link to="/shop" className="label text-blue underline underline-offset-4">
              Shop all
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
            {others.map((other) => (
              <article key={other.id} className="reveal card group flex flex-col p-3">
                <Link
                  to={`/sacks/${other.id}`}
                  className="relative flex h-[8.5rem] items-center justify-center overflow-hidden border-2 border-ink bg-paper-deep"
                >
                  <div aria-hidden="true" className="dotfield pointer-events-none absolute inset-0 opacity-[0.12]" />
                  <img
                    src={other.image}
                    alt={other.fullName}
                    width={200}
                    height={200}
                    loading="lazy"
                    decoding="async"
                    className="relative h-24 w-24 object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </Link>

                <Link
                  to={`/sacks/${other.id}`}
                  className="mt-3 font-display text-[14px] uppercase text-ink hover:text-blue"
                >
                  {other.name}
                </Link>
                <p className="mt-0.5 font-numeric text-body-sm text-ink-soft">{formatPrice(other.price)}</p>

                <button
                  type="button"
                  onClick={() => addItem(other.id)}
                  className="btn mt-3 w-full border-ink bg-paper px-3 py-2.5 text-[11px] hover:bg-ink hover:text-paper"
                >
                  Add to cart
                </button>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
