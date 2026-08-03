import { Link } from 'react-router-dom';
import { SHIRTS, MYSTERY_BAG, formatPrice } from '../lib/products';
import SectionHeading from './SectionHeading';

/**
 * Tees and the mystery bag.
 *
 * Shirts show the BACK first — that's the side with the PLAY WITH YOUR SACK.
 * print, and the reason to want one — then flip to the front on hover/focus.
 * Until back photography exists, `imageBack: null` renders a labelled
 * placeholder in its slot rather than silently showing the front twice, which
 * would make the flip look broken.
 *
 * Size selection moved to each product page, so the card stays a card and the
 * whole grid links somewhere rather than half of it being a mini form.
 */
function ShirtCard({ shirt }) {
  const back = shirt.imageBack;
  const front = shirt.imageFront || shirt.image;

  return (
    <article className="reveal card card-hover group flex flex-col">
      <Link
        to={`/sacks/${shirt.id}`}
        className="relative block aspect-square overflow-hidden border-b-2 border-ink bg-paper-deep"
        aria-label={`${shirt.fullName}, ${formatPrice(shirt.price)}`}
      >
        <span aria-hidden="true" className="dotfield pointer-events-none absolute inset-0 opacity-[0.12]" />

        {/* back — the default view */}
        <span className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0 group-focus-within:opacity-0">
          {back ? (
            <img
              src={back}
              alt={`${shirt.fullName}, back`}
              width={600}
              height={600}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-contain p-5"
            />
          ) : (
            <span className="flex h-full w-full flex-col items-center justify-center gap-2 px-6 text-center">
              <span className="material-symbols-outlined text-[30px] text-ink-faint" aria-hidden="true">
                add_a_photo
              </span>
              <span className="label text-ink-faint">Back photo placeholder</span>
              <span className="font-body text-[11px] text-ink-faint">PLAY WITH YOUR SACK.</span>
            </span>
          )}
        </span>

        {/* front — hover / keyboard focus */}
        <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
          <img
            src={front}
            alt={`${shirt.fullName}, front`}
            width={600}
            height={600}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain p-5"
          />
        </span>

        <span className="absolute bottom-3 left-3 z-10 border-2 border-ink bg-paper px-2 py-1 font-body text-[10px] font-bold uppercase tracking-[0.06em] text-ink">
          Hover for front
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2">
          <span
            className="h-4 w-4 shrink-0 rounded-full border-2 border-ink"
            style={{ backgroundColor: shirt.swatch }}
            aria-hidden="true"
          />
          <span className="label text-ink-faint">{shirt.colorway}</span>
        </div>

        <h3 className="mt-2 font-display text-display-md text-ink">
          <Link to={`/sacks/${shirt.id}`} className="hover:text-blue">{shirt.name}</Link>
        </h3>

        <p className="mt-2 font-numeric text-[1.35rem] leading-none text-ink">
          {formatPrice(shirt.price)}
        </p>

        <p className="mt-3 font-body text-body-sm text-ink-soft">{shirt.desc}</p>

        <Link to={`/sacks/${shirt.id}`} className="btn-primary mt-5">
          Pick a size
        </Link>
      </div>
    </article>
  );
}

export default function Merch() {
  return (
    <section id="merch" aria-labelledby="merch-heading" className="paper-grain relative bg-paper">
      <div className="relative mx-auto max-w-site px-5 py-16 md:px-8 md:py-24">
        <SectionHeading title="Merch" id="merch-heading" mis="blue" />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {SHIRTS.map((shirt) => (
            <ShirtCard key={shirt.id} shirt={shirt} />
          ))}

          <article className="reveal card card-hover group flex flex-col">
            <Link
              to={`/sacks/${MYSTERY_BAG.id}`}
              className="relative block aspect-square overflow-hidden border-b-2 border-ink bg-red/20"
              aria-label={`${MYSTERY_BAG.fullName}, ${formatPrice(MYSTERY_BAG.price)}`}
            >
              <span aria-hidden="true" className="dotfield pointer-events-none absolute inset-0 opacity-[0.12]" />
              <img
                src={MYSTERY_BAG.image}
                alt={MYSTERY_BAG.fullName}
                width={600}
                height={600}
                loading="lazy"
                decoding="async"
                className="relative h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
              />
            </Link>

            <div className="flex flex-1 flex-col p-5">
              <p className="label text-ink-faint">{MYSTERY_BAG.sub}</p>

              <h3 className="mt-2 font-display text-display-md text-ink">
                <Link to={`/sacks/${MYSTERY_BAG.id}`} className="hover:text-blue">
                  {MYSTERY_BAG.name}
                </Link>
              </h3>

              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-numeric text-[1.35rem] leading-none text-ink">
                  {formatPrice(MYSTERY_BAG.price)}
                </span>
                {MYSTERY_BAG.compareAt > MYSTERY_BAG.price && (
                  <span className="font-body text-body-sm text-ink-faint line-through">
                    {formatPrice(MYSTERY_BAG.compareAt)}
                  </span>
                )}
              </div>

              <p className="mt-3 font-body text-body-sm text-ink-soft">{MYSTERY_BAG.desc}</p>

              <Link to={`/sacks/${MYSTERY_BAG.id}`} className="btn-primary mt-5">
                View details
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
