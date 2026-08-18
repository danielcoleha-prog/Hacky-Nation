import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SACKS, SHIRTS, MYSTERY_BAG, BUNDLES, formatPrice, SACK_PRICE, SACK_BUNDLE_PRICE, BUNDLE_MIN_QTY } from '../lib/products';
import { useCart } from '../lib/CartContext';
import { useReveal } from '../lib/useReveal';
import SectionHeading from '../components/SectionHeading';
import Seal from '../components/Seal';

function BundleCard({ bundle }) {
  const { addItem } = useCart();
  const saving = bundle.compareAt - bundle.price;

  return (
    <article className="reveal card card-hover flex flex-col">
      <div className="relative border-b-2 border-ink bg-paper-deep">
        <img
          src={bundle.image}
          alt={bundle.fullName}
          width={1100}
          height={1100}
          loading="lazy"
          decoding="async"
          className="block aspect-square w-full object-cover"
        />
        {saving > 0 && (
          <Seal
            variant="red"
            burst
            size="sm"
            lines={['SAVE', `$${saving}`]}
            className="absolute -right-2 -top-2 rotate-[12deg]"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="eyebrow">{bundle.sub}</p>
        <h3 className="font-display text-display-md text-ink">{bundle.fullName}</h3>
        <p className="font-body text-body-sm text-ink-soft">{bundle.desc}</p>

        <div className="mt-auto flex items-baseline gap-3 pt-2">
          <span className="font-numeric text-[1.8rem] leading-none text-ink">
            {formatPrice(bundle.price)}
          </span>
          <span className="font-body text-body-sm text-ink-faint line-through">
            {formatPrice(bundle.compareAt)}
          </span>
        </div>

        <button type="button" onClick={() => addItem(bundle.id)} className="btn-primary w-full">
          Add to cart
        </button>
      </div>
    </article>
  );
}

function SackCard({ sack }) {
  const { addItem } = useCart();

  return (
    <article className="reveal card card-hover group flex flex-col">
      <Link to={`/sacks/${sack.id}`} className="relative block overflow-hidden border-b-2 border-ink bg-paper-deep">
        {sack.cutout !== false && (
          <>
            <span aria-hidden="true" className="dotfield pointer-events-none absolute inset-0 opacity-[0.12]" />
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 aspect-square w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundColor: sack.accent, opacity: 0.26 }}
            />
          </>
        )}
        <div className="relative flex aspect-square items-center justify-center p-6">
          <img
            src={sack.image}
            alt={`${sack.fullName} — ${sack.sub.toLowerCase()}`}
            width={600}
            height={600}
            loading="lazy"
            decoding="async"
            className={
              sack.cutout === false
                ? 'absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
                : 'relative h-[74%] w-auto object-contain transition-transform duration-500 group-hover:scale-105'
            }
            style={sack.cutout === false ? undefined : { filter: 'drop-shadow(0 18px 22px rgba(20,17,13,0.28))' }}
          />
        </div>

        <span
          className={`absolute left-3 top-3 border-2 border-ink px-2 py-1 font-body text-[10px] font-bold uppercase tracking-[0.06em] ${
            sack.preorder ? 'bg-red text-paper' : 'bg-blue text-paper'
          }`}
        >
          {sack.preorder ? 'Pre-order' : 'In stock'}
        </span>

        {sack.badge && (
          <Seal variant="red" burst size="sm" lines={[sack.badge]} className="absolute -right-2 -top-2 rotate-[12deg]" />
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="eyebrow">{sack.sub}</p>

        <h3 className="mt-2 font-display text-display-md text-ink">
          <Link to={`/sacks/${sack.id}`} className="hover:text-blue">{sack.name}</Link>
        </h3>

        <div className="mt-2 flex items-baseline gap-2">
          <span
            className="font-numeric text-[1.35rem] leading-none text-ink"
          >
            {formatPrice(sack.price)}
          </span>
          {sack.compareAt > sack.price && (
            <span className="font-body text-body-sm text-ink-faint line-through">
              {formatPrice(sack.compareAt)}
            </span>
          )}
          <span className="ml-auto flex gap-1" aria-hidden="true">
            {sack.colors.map((c) => (
              <span key={c} className="h-4 w-4 rounded-full border border-ink" style={{ backgroundColor: c }} />
            ))}
          </span>
        </div>

        <p className="mt-3 font-body text-body-sm text-ink-soft">{sack.desc}</p>

        <div className="mt-auto flex gap-2 pt-5">
          <button type="button" onClick={() => addItem(sack.id)} className="btn-primary flex-1">
            Add to cart
          </button>
          <Link
            to={`/sacks/${sack.id}`}
            aria-label={`View ${sack.fullName}`}
            className="grid h-[50px] w-[50px] shrink-0 place-content-center border-2 border-ink bg-paper transition-all hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-press-sm"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">arrow_outward</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function ShopPage() {
  useReveal(['shop']);

  useEffect(() => {
    window.scrollTo(0, 0);
    const previous = document.title;
    document.title = 'Shop all sacks — Hacky Nation';
    return () => { document.title = previous; };
  }, []);

  return (
    <main className="paper-grain relative bg-paper">
      <div className="relative z-10 mx-auto max-w-site px-5 py-10 md:px-8 md:py-14">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 label text-ink-faint">
            <li><Link to="/" className="transition-colors hover:text-blue">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-ink">Shop</li>
          </ol>
        </nav>

        <SectionHeading
          as="h1"
          kicker={`${SACKS.length} suede sacks · handmade to order`}
          title="Shop all sacks"
          mis="blue"
          aside={`Any 2 sacks — ${formatPrice(SACK_BUNDLE_PRICE)} each. Mix any colorways.`}
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SACKS.map((sack) => (
            <SackCard key={sack.id} sack={sack} />
          ))}
        </div>

        {/* ---------- packs ---------- */}
        <section aria-labelledby="packs-heading" className="mt-16 border-t-2 border-ink pt-6 md:mt-24">
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
            <h2 id="packs-heading" className="font-display text-display-lg text-ink">
              Packs
            </h2>
            <p className="label text-ink-soft">Fixed sets · one price · shipped together</p>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {BUNDLES.map((bundle) => (
              <BundleCard key={bundle.id} bundle={bundle} />
            ))}
          </div>
        </section>

        {/* ---------- everything else ---------- */}
        <section aria-labelledby="more-heading" className="mt-16 border-t-2 border-ink pt-6 md:mt-24">
          <h2 id="more-heading" className="font-display text-display-lg text-ink">
            Also in the shop
          </h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[MYSTERY_BAG, ...SHIRTS].map((p) => (
              <article key={p.id} className="reveal card card-hover flex items-center gap-4 p-4">
                <div className="grid h-24 w-24 shrink-0 place-content-center border-2 border-ink bg-paper-deep">
                  <img
                    src={p.image}
                    alt={p.fullName}
                    width={160}
                    height={160}
                    loading="lazy"
                    decoding="async"
                    className="h-20 w-20 object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <span
                    className={`mb-2 inline-block border-2 border-ink px-2 py-0.5 font-body text-[10px] font-bold uppercase tracking-[0.06em] ${
                      p.preorder ? 'bg-red text-paper' : 'bg-blue text-paper'
                    }`}
                  >
                    {p.preorder ? 'Pre-order' : 'In stock'}
                  </span>
                  <p className="eyebrow">{p.sub}</p>
                  <h3 className="mt-1.5 font-display text-display-sm text-ink">{p.name}</h3>
                  <p className="mt-1 font-body text-body-md text-ink-soft">{formatPrice(p.price)}</p>
                  <Link to={`/sacks/${p.id}`} className="mt-2 inline-block label text-blue underline underline-offset-4">
                    {p.id.startsWith('shirt') ? 'Pick a size' : 'View details'}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <p className="mt-12 border-2 border-ink bg-paper-deep px-5 py-4 font-body text-body-sm text-ink-soft">
          Most sacks are {formatPrice(SACK_PRICE)} each, or {formatPrice(SACK_BUNDLE_PRICE)} each once
          you have {BUNDLE_MIN_QTY} or more in the cart — that discount applies automatically at
          checkout, no code needed. The Magical Sack and Star Burst are specialty builds at $18 and
          sit outside it; their deal is the Specialty Duo above.
        </p>
      </div>
    </main>
  );
}
