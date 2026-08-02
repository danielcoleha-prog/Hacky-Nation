import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { getSack, SACKS, formatPrice, SACK_BUNDLE_PRICE } from '../lib/products';
import { useCart } from '../lib/CartContext';
import { useReveal } from '../lib/useReveal';
import Seal from '../components/Seal';

const SPECS = (sack) => [
  { k: 'Panels', v: sack.panels },
  { k: 'Material', v: 'Premium suede' },
  { k: 'Fill', v: 'Weighted pellet' },
  { k: 'Made', v: 'By hand, USA' },
];

export default function ProductPage() {
  const { id } = useParams();
  const sack = getSack(id);
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  useReveal([id]);

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
      <div className="relative z-10 mx-auto max-w-site px-5 py-8 md:px-8 md:py-12">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 label text-ink-faint">
            <li><Link to="/" className="transition-colors hover:text-blue">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link to="/shop" className="transition-colors hover:text-blue">Sacks</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-ink">{sack.name}</li>
          </ol>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* ---------- gallery ----------
              self-start so the column hugs the image; stretched to the detail
              column's height, the seal's bottom anchor lands far below it. */}
          <div className="relative self-start">
            <div className="relative flex aspect-square items-center justify-center overflow-hidden border-2 border-ink bg-paper-deep shadow-press">
              {sack.cutout !== false && (
                <>
                  <div aria-hidden="true" className="dotfield pointer-events-none absolute inset-0 opacity-[0.13]" />
                  <div
                    aria-hidden="true"
                    className="absolute left-1/2 top-1/2 aspect-square w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{ backgroundColor: sack.accent, opacity: 0.26 }}
                  />
                </>
              )}
              <img
                src={sack.image}
                alt={`${sack.fullName} — ${sack.sub.toLowerCase()}`}
                width={900}
                height={900}
                fetchPriority="high"
                decoding="async"
                className={
                  sack.cutout === false
                    ? 'h-full w-full object-cover'
                    : 'relative z-10 h-[72%] w-auto max-w-[82%] object-contain'
                }
                style={
                  sack.cutout === false
                    ? undefined
                    : { filter: 'drop-shadow(0 26px 30px rgba(20,17,13,0.3))' }
                }
              />
            </div>

            <Seal
              variant={sack.preorder ? 'yellow' : 'blue'}
              burst
              size="lg"
              lines={sack.preorder ? ['PRE', 'ORDER'] : ['IN', 'STOCK']}
              className="absolute -bottom-5 -left-4 rotate-[-9deg]"
            />
          </div>

          {/* ---------- detail ---------- */}
          <div>
            <p className="eyebrow">{sack.sub}</p>

            <h1 className="mt-3 font-display text-display-xl text-ink">
              <span
                className="overprint"
                data-text={sack.fullName}
                style={{ '--mis-color': sack.accent, '--mis-x': '-3px', '--mis-y': '3px' }}
              >
                {sack.fullName}
              </span>
            </h1>

            <div className="mt-5 flex items-baseline gap-3">
              <span
                className="font-display text-[2.6rem] leading-none tabular-nums text-ink"
                style={{ fontVariationSettings: "'wght' 900, 'wdth' 95" }}
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
                <span className="w-11 text-center font-display text-[15px] tabular-nums" aria-live="polite">
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
                onClick={() => addItem(sack.id, { qty })}
                className="btn-primary min-w-[220px] flex-1 py-4"
              >
                Add to cart — {formatPrice(sack.price * qty)}
              </button>
            </div>

            <p className="mt-4 flex items-center gap-2.5 border-2 border-blue bg-blue px-4 py-3 label leading-[1.7] text-paper">
              <span className="material-symbols-outlined text-[17px]" aria-hidden="true">sell</span>
              Buy 2 or more sacks — {formatPrice(SACK_BUNDLE_PRICE)} each
            </p>

            <p className="mt-4 font-body text-body-sm text-ink-soft">
              {sack.preorder ? 'Currently in production · ships in ~3 weeks · ' : 'Ready to ship · '}
              <a href="/pre-order-policy.html" className="underline underline-offset-2 hover:text-blue">
                Images may vary*
              </a>
            </p>
          </div>
        </div>

        {/* ---------- other sacks ---------- */}
        <section aria-labelledby="more-heading" className="mt-20 border-t-2 border-ink pt-6 md:mt-28">
          <div className="flex items-end justify-between gap-4">
            <h2 id="more-heading" className="font-display text-display-lg text-ink">
              More sacks
            </h2>
            <Link to="/shop" className="label text-blue underline underline-offset-4">
              See all
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
            {others.map((other) => (
              <Link
                key={other.id}
                to={`/sacks/${other.id}`}
                className="reveal card card-hover group p-3"
              >
                <div className="relative flex h-[8.5rem] items-center justify-center overflow-hidden border-2 border-ink bg-paper-deep">
                  {other.cutout !== false && (
                    <div aria-hidden="true" className="dotfield pointer-events-none absolute inset-0 opacity-[0.12]" />
                  )}
                  <img
                    src={other.image}
                    alt=""
                    width={200}
                    height={200}
                    loading="lazy"
                    decoding="async"
                    className={
                      other.cutout === false
                        ? 'h-full w-full object-cover transition-transform duration-300 group-hover:scale-110'
                        : 'relative h-24 w-24 object-contain transition-transform duration-300 group-hover:scale-110'
                    }
                  />
                </div>
                <p className="mt-3 font-display text-[14px] uppercase text-ink">{other.name}</p>
                <p className="mt-0.5 font-body text-body-sm text-ink-soft">{formatPrice(other.price)}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
