import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { SACKS, formatPrice } from '../lib/products';
import Seal from './Seal';

/**
 * Selectable sack carousel. Arrows (and ← / → keys, and swipe) step through the
 * lineup; the active sack's title and price sit under the stage, and the whole
 * stage links to that sack's product page.
 */
export default function SackCarousel() {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef(null);
  const count = SACKS.length;
  const active = SACKS[index];

  const step = useCallback(
    (delta) => setIndex((i) => (i + delta + count) % count),
    [count]
  );

  /* Arrow keys drive the carousel while it has focus within. */
  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      step(-1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      step(1);
    }
  };

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 45) step(dx < 0 ? 1 : -1);
    touchStartX.current = null;
  };

  /* Preload neighbours so stepping doesn't flash. */
  useEffect(() => {
    [(index + 1) % count, (index - 1 + count) % count].forEach((i) => {
      const img = new Image();
      img.src = SACKS[i].image;
    });
  }, [index, count]);

  return (
    <section
      id="shop"
      aria-labelledby="carousel-heading"
      className="paper-grain relative overflow-hidden border-y-2 border-ink bg-paper-deep py-16 md:py-24"
      onKeyDown={onKeyDown}
    >
      {/* faint halftone wash on the left */}
      <div
        aria-hidden="true"
        className="halftone pointer-events-none absolute inset-y-0 left-0 w-[30%] rotate-180 opacity-25"
      />

      <div className="relative z-10 mx-auto max-w-site px-6 md:px-10">
        <header className="mb-10 flex flex-wrap items-end justify-between gap-4 md:mb-14">
          <div>
            <p className="font-label text-label-caps uppercase text-blue">The Lineup</p>
            <h2
              id="carousel-heading"
              className="mt-2 font-display text-display-xl uppercase text-ink"
            >
              Shop Sacks
            </h2>
          </div>
          <p className="max-w-xs font-label text-label-caps uppercase leading-relaxed text-ink-soft">
            Premium suede. Handmade.
            <br />
            Built to last.
          </p>
        </header>

        <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
          {/* ---------- stage ---------- */}
          <div
            className="relative"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div className="relative mx-auto flex aspect-[4/3] max-w-[620px] items-center justify-center">
              {/* colour halo keyed to the active sack */}
              <div
                aria-hidden="true"
                className="absolute aspect-square w-[62%] rounded-full transition-colors duration-500"
                style={{ backgroundColor: active.accent, opacity: 0.28 }}
              />
              <div
                aria-hidden="true"
                className="absolute bottom-[14%] left-[8%] h-[8%] w-[46%] -rotate-[4deg] bg-red/85"
              />

              {SACKS.map((sack, i) => (
                <Link
                  key={sack.id}
                  to={`/sacks/${sack.id}`}
                  aria-hidden={i !== index}
                  tabIndex={i === index ? 0 : -1}
                  className={`absolute inset-0 grid place-content-center transition-all duration-500 ${
                    i === index
                      ? 'pointer-events-auto scale-100 opacity-100'
                      : 'pointer-events-none scale-90 opacity-0'
                  }`}
                >
                  <img
                    src={sack.image}
                    alt={`${sack.fullName} — ${sack.sub.toLowerCase()}`}
                    width={900}
                    height={900}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="h-auto w-[78%] max-w-[420px] justify-self-center object-contain drop-shadow-cut transition-transform duration-300 hover:scale-[1.03]"
                  />
                </Link>
              ))}

              {active.badge && (
                <Seal
                  variant="red"
                  burst
                  lines={[active.badge]}
                  className="absolute -top-2 right-[6%] rotate-[8deg]"
                />
              )}
            </div>

            {/* ---------- arrows + counter ---------- */}
            <div className="mt-8 flex items-center justify-center gap-6">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous sack"
                className="grid h-12 w-12 place-content-center border-2 border-ink bg-paper text-ink transition-colors hover:bg-ink hover:text-paper"
              >
                <span className="material-symbols-outlined" aria-hidden="true">
                  arrow_back
                </span>
              </button>

              <p aria-live="polite" className="font-label text-label-caps uppercase text-ink-soft">
                <span className="text-ink">{String(index + 1).padStart(2, '0')}</span>
                {' / '}
                {String(count).padStart(2, '0')}
              </p>

              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next sack"
                className="grid h-12 w-12 place-content-center border-2 border-ink bg-paper text-ink transition-colors hover:bg-ink hover:text-paper"
              >
                <span className="material-symbols-outlined" aria-hidden="true">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>

          {/* ---------- detail rail ---------- */}
          <div className="lg:w-[300px]">
            <div className="border-2 border-ink bg-paper p-6 shadow-card">
              <p className="font-label text-label-caps uppercase text-blue">{active.sub}</p>

              <h3 className="mt-3 font-display text-display-lg uppercase text-ink">
                {active.name}
              </h3>

              <div className="mt-3 flex items-baseline gap-3">
                <span className="font-display text-3xl text-ink">{formatPrice(active.price)}</span>
                {active.compareAt > active.price && (
                  <span className="font-label text-label-lg text-ink-soft line-through">
                    {formatPrice(active.compareAt)}
                  </span>
                )}
              </div>

              <p className="mt-4 font-body text-body-md text-ink-soft">{active.desc}</p>

              <p
                className={`mt-5 inline-block px-2 py-1 font-label text-label-caps uppercase ${
                  active.preorder ? 'bg-yellow text-ink' : 'bg-blue text-paper'
                }`}
              >
                {active.preorder ? 'Pre-order · ships ~3 weeks' : 'In stock · ships fast'}
              </p>

              <Link
                to={`/sacks/${active.id}`}
                className="btn-primary mt-6 w-full"
              >
                View Product
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            {/* thumbnail selector */}
            <ul className="mt-6 flex flex-wrap gap-3" aria-label="Choose a sack">
              {SACKS.map((sack, i) => (
                <li key={sack.id}>
                  <button
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-current={i === index}
                    aria-label={sack.fullName}
                    className={`grid h-14 w-14 place-content-center border-2 bg-paper transition-all ${
                      i === index
                        ? 'border-blue ring-2 ring-blue ring-offset-2 ring-offset-paper-deep'
                        : 'border-ink/25 hover:border-ink'
                    }`}
                  >
                    <img
                      src={sack.image}
                      alt=""
                      width={56}
                      height={56}
                      loading="lazy"
                      decoding="async"
                      className="h-11 w-11 object-contain"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
