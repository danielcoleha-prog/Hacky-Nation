import { useState } from 'react';
import { useCart } from '../lib/CartContext';
import { SHIRTS, SIZES, MYSTERY_BAG, formatPrice } from '../lib/products';

function ShirtCard({ shirt }) {
  const { addItem } = useCart();
  const [size, setSize] = useState(null);
  const [error, setError] = useState(false);

  function onAdd() {
    if (!size) {
      setError(true);
      return;
    }
    setError(false);
    addItem(shirt.id, { size });
  }

  return (
    <article className="flex flex-col border-2 border-ink bg-paper shadow-card">
      <div className="grid place-content-center border-b-2 border-ink bg-paper-deep p-6">
        <img
          src={shirt.image}
          alt={`${shirt.fullName} — front`}
          width={400}
          height={400}
          loading="lazy"
          decoding="async"
          className="h-56 w-full object-contain"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="font-label text-label-caps uppercase text-blue">{shirt.sub}</p>
        <h3 className="mt-2 font-display text-display-md uppercase text-ink">{shirt.name}</h3>
        <p className="mt-1 font-display text-xl text-ink">{formatPrice(shirt.price)}</p>

        <fieldset className="mt-4">
          <legend className="font-label text-label-caps uppercase text-ink-soft">Size</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {SIZES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setSize(s);
                  setError(false);
                }}
                aria-pressed={size === s}
                className={`h-10 min-w-[44px] border-2 px-2 font-label text-label-caps uppercase transition-colors ${
                  size === s
                    ? 'border-blue bg-blue text-paper'
                    : 'border-ink/25 text-ink hover:border-ink'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </fieldset>

        {error && (
          <p role="alert" className="mt-3 font-label text-label-caps uppercase text-red">
            Pick a size first
          </p>
        )}

        <button type="button" onClick={onAdd} className="btn-primary mt-auto w-full pt-4 sm:pt-4">
          Add To Cart
        </button>
      </div>
    </article>
  );
}

export default function Merch() {
  const { addItem } = useCart();

  return (
    <section id="merch" className="paper-grain relative border-b-2 border-ink bg-paper py-16 md:py-24">
      <div className="relative z-10 mx-auto max-w-site px-6 md:px-10">
        <header className="mb-10">
          <p className="font-label text-label-caps uppercase text-blue">Wear It</p>
          <h2 className="mt-2 font-display text-display-xl uppercase text-ink">Sack Merch</h2>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SHIRTS.map((shirt) => (
            <ShirtCard key={shirt.id} shirt={shirt} />
          ))}

          {/* Mystery bag — no size, so it adds straight to the cart. */}
          <article className="flex flex-col border-2 border-ink bg-paper shadow-card">
            <div className="grid place-content-center border-b-2 border-ink bg-yellow/25 p-6">
              <img
                src={MYSTERY_BAG.image}
                alt={MYSTERY_BAG.fullName}
                width={400}
                height={400}
                loading="lazy"
                decoding="async"
                className="h-56 w-full object-contain"
              />
            </div>

            <div className="flex flex-1 flex-col p-5">
              <p className="font-label text-label-caps uppercase text-blue">{MYSTERY_BAG.sub}</p>
              <h3 className="mt-2 font-display text-display-md uppercase text-ink">
                {MYSTERY_BAG.name}
              </h3>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-display text-xl text-ink">
                  {formatPrice(MYSTERY_BAG.price)}
                </span>
                <span className="font-label text-label-caps text-ink-soft line-through">
                  {formatPrice(MYSTERY_BAG.compareAt)}
                </span>
              </div>
              <p className="mt-3 font-body text-body-md text-ink-soft">{MYSTERY_BAG.desc}</p>

              <button
                type="button"
                onClick={() => addItem(MYSTERY_BAG.id)}
                className="btn-primary mt-auto w-full pt-4"
              >
                Add To Cart
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
