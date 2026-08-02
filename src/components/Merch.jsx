import { useState } from 'react';
import { useCart } from '../lib/CartContext';
import { SHIRTS, SIZES, MYSTERY_BAG, formatPrice } from '../lib/products';
import SectionHeading from './SectionHeading';
import Seal from './Seal';

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
    <article className="reveal card card-hover flex flex-col">
      <div className="relative grid place-content-center overflow-hidden border-b-2 border-ink bg-paper-deep p-6">
        <div aria-hidden="true" className="dotfield pointer-events-none absolute inset-0 opacity-[0.12]" />
        <img
          src={shirt.image}
          alt={`${shirt.fullName} — front`}
          width={400}
          height={400}
          loading="lazy"
          decoding="async"
          className="relative h-52 w-full object-contain"
        />
        <span
          className="absolute left-3 top-3 h-5 w-5 rounded-full border-2 border-ink"
          style={{ backgroundColor: shirt.swatch }}
          aria-hidden="true"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="eyebrow">{shirt.colorway} · Unisex</p>
        <h3 className="mt-2 font-display text-display-md text-ink">{shirt.name}</h3>
        <p
          className="mt-1.5 font-display text-[1.35rem] leading-none text-ink"
          style={{ fontVariationSettings: "'wght' 900, 'wdth' 100" }}
        >
          {formatPrice(shirt.price)}
        </p>

        <fieldset className="mt-5">
          <legend className="label text-ink-faint">Size</legend>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {SIZES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setSize(s);
                  setError(false);
                }}
                aria-pressed={size === s}
                className={`h-10 min-w-[42px] border-2 px-2 font-display text-label-caps uppercase transition-colors duration-150 ${
                  size === s
                    ? 'border-ink bg-ink text-paper'
                    : 'border-ink/25 text-ink hover:border-ink'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </fieldset>

        <p
          role={error ? 'alert' : undefined}
          className={`mt-2.5 label text-red transition-opacity duration-150 ${
            error ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          Pick a size first
        </p>

        <button type="button" onClick={onAdd} className="btn-primary mt-auto w-full">
          Add to cart
        </button>
      </div>
    </article>
  );
}

export default function Merch() {
  const { addItem } = useCart();

  return (
    <section id="merch" className="relative border-t-2 border-ink bg-paper-deep py-16 md:py-24">
      <div className="relative z-10 mx-auto max-w-site px-5 md:px-8">
        <SectionHeading
          index="02"
          kicker="Wear it"
          title="Sack merch"
          mis="red"
          aside="Heavyweight tees and one-of-one knit bags."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {SHIRTS.map((shirt) => (
            <ShirtCard key={shirt.id} shirt={shirt} />
          ))}

          {/* Mystery bag — no size, so it adds straight to the cart. */}
          <article className="reveal card card-hover flex flex-col">
            <div className="relative grid place-content-center overflow-hidden border-b-2 border-ink bg-yellow/30 p-6">
              <div aria-hidden="true" className="dotfield pointer-events-none absolute inset-0 opacity-[0.12]" />
              <img
                src={MYSTERY_BAG.image}
                alt={MYSTERY_BAG.fullName}
                width={400}
                height={400}
                loading="lazy"
                decoding="async"
                className="relative h-52 w-full object-contain"
              />
              <Seal
                variant="red"
                burst
                size="sm"
                lines={['1 OF 1']}
                className="absolute -right-2 -top-2 rotate-[12deg]"
              />
            </div>

            <div className="flex flex-1 flex-col p-5">
              <p className="eyebrow">Hand knit · Random colorway</p>
              <h3 className="mt-2 font-display text-display-md text-ink">{MYSTERY_BAG.name}</h3>
              <div className="mt-1.5 flex items-baseline gap-2">
                <span
                  className="font-display text-[1.35rem] leading-none text-ink"
                  style={{ fontVariationSettings: "'wght' 900, 'wdth' 100" }}
                >
                  {formatPrice(MYSTERY_BAG.price)}
                </span>
                <span className="font-body text-body-sm text-ink-faint line-through">
                  {formatPrice(MYSTERY_BAG.compareAt)}
                </span>
              </div>
              <p className="mt-4 font-body text-body-md text-ink-soft">{MYSTERY_BAG.desc}</p>

              <button
                type="button"
                onClick={() => addItem(MYSTERY_BAG.id)}
                className="btn-primary mt-auto w-full"
              >
                Add to cart
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
