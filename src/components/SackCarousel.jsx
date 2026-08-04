import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SACKS, formatPrice } from '../lib/products';
import DotGridShader from './ui/DotGridShader';
import CartoonButton from './ui/CartoonButton';

/**
 * Coverflow lineup: every sack is on screen at once, the active one enlarged
 * over a colour disc, arrows either side.
 *
 * Clicking a side sack brings it to the centre; clicking the one already
 * centred opens its product page — so a second click on what you're looking at
 * always goes to buy it, and no click is ever a dead end.
 *
 * The band sits directly on the ink the TrustStrip ends on, with no torn edge
 * between them: a rip there would put a cream seam between two black sections.
 */
export default function SackCarousel() {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef(null);
  const navigate = useNavigate();
  const count = SACKS.length;
  const active = SACKS[index];

  const step = useCallback((d) => setIndex((i) => (i + d + count) % count), [count]);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
  };

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 45) step(dx < 0 ? 1 : -1);
    touchStartX.current = null;
  };

  useEffect(() => {
    [(index + 1) % count, (index - 1 + count) % count].forEach((i) => {
      const img = new Image();
      img.src = SACKS[i].image;
    });
  }, [index, count]);

  /* Render the row rotated around the active slide so the active one is always
     the middle child — in plain DOM order the first sack would sit hard left. */
  const half = Math.floor(count / 2);
  const ordered = Array.from({ length: count }, (_, k) => {
    const offset = k - half;
    return { sack: SACKS[(index + offset + count * 2) % count], offset };
  });

  return (
    <section id="shop" aria-labelledby="carousel-heading" className="relative bg-ink" onKeyDown={onKeyDown}>
      <div className="relative overflow-hidden bg-ink py-12 md:py-16">
        {/* Animated dot-grid shader, sat well back so the products stay the
            brightest thing in the section. */}
        <DotGridShader className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.30]" />
        {/* Static fallback for reduced-motion / no-WebGL, under the canvas. */}
        <div
          aria-hidden="true"
          className="dotfield pointer-events-none absolute inset-0 -z-10 opacity-[0.10]"
          style={{ '--dot': '#F2E9D8' }}
        />

        <div className="relative mx-auto max-w-site px-5 md:px-8">
          <header className="reveal text-center">
            <p className="eyebrow text-red">The lineup</p>
            <h2 id="carousel-heading" className="mt-3 font-display text-display-xl text-paper">
              <span
                className="overprint"
                data-text="Not your average sack"
                style={{ '--mis-color': 'var(--press-blue)', '--mis-x': '-4px', '--mis-y': '4px' }}
              >
                Not your average sack
              </span>
            </h2>
          </header>

          {/* ---------- stage ---------- */}
          <div
            className="relative mt-10 md:mt-14"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* the row is inset so the arrows sit outside it, never over a product */}
            <ul className="mx-auto flex h-[175px] w-[72%] items-center justify-center [--w-active:52%] [--w-near:24%] sm:h-[250px] sm:w-[78%] sm:[--w-active:32%] sm:[--w-near:19%] md:h-[300px] md:w-[80%]">
              {ordered.map(({ sack, offset }) => {
                const isActive = offset === 0;
                const far = Math.abs(offset) >= 2;
                return (
                  <li
                    key={sack.id}
                    /* On a phone the outermost pair shrinks to ~45px and reads as
                       lint, so they drop out and the remaining three grow. */
                    className={`flex shrink-0 items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      far ? 'hidden sm:flex' : ''
                    }`}
                    style={{
                      width: isActive ? 'var(--w-active)' : far ? '15%' : 'var(--w-near)',
                      opacity: isActive ? 1 : far ? 0.45 : 0.7,
                    }}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        isActive ? navigate(`/sacks/${sack.id}`) : setIndex(SACKS.indexOf(sack))
                      }
                      aria-current={isActive}
                      aria-label={
                        isActive
                          ? `Shop ${sack.fullName}, ${formatPrice(sack.price)}`
                          : `Show ${sack.fullName}`
                      }
                      className="group relative flex w-full items-center justify-center focus-visible:outline-none"
                    >
                      {isActive && (
                        <>
                          {/* expanding ring, only while hovering the centre sack */}
                          <span
                            aria-hidden="true"
                            className="absolute hidden aspect-square w-[88%] rounded-full border-2 opacity-0 group-hover:block group-hover:animate-ring-pulse motion-reduce:group-hover:animate-none"
                            style={{ borderColor: sack.accent }}
                          />
                          <span
                            aria-hidden="true"
                            className="absolute aspect-square w-[88%] rounded-full transition-colors duration-500"
                            style={{ backgroundColor: sack.accent, opacity: 0.9 }}
                          />
                        </>
                      )}
                      <img
                        src={sack.image}
                        alt=""
                        width={900}
                        height={900}
                        loading="lazy"
                        decoding="async"
                        className={`relative w-full object-contain transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          isActive
                            ? 'scale-100 group-hover:animate-sack-float motion-reduce:group-hover:animate-none'
                            : 'scale-[0.86] group-hover:scale-95'
                        }`}
                        style={{ filter: 'drop-shadow(0 18px 22px rgba(0,0,0,0.45))' }}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* arrows flank the row, clear of the artwork */}
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous sack"
              className="absolute left-0 top-1/2 grid h-12 w-12 -translate-y-1/2 place-content-center border-2 border-paper/35 text-paper transition-colors hover:border-paper hover:bg-paper hover:text-ink"
            >
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">arrow_back</span>
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next sack"
              className="absolute right-0 top-1/2 grid h-12 w-12 -translate-y-1/2 place-content-center border-2 border-paper/35 text-paper transition-colors hover:border-paper hover:bg-paper hover:text-ink"
            >
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">arrow_forward</span>
            </button>
          </div>

          {/* ---------- active detail ---------- */}
          <div className="mt-9 text-center" aria-live="polite">
            <h3 className="font-display text-display-lg text-paper">
              {active.name}
              <span
                className="mx-3 inline-block h-2.5 w-2.5 translate-y-[-4px] rounded-full"
                style={{ backgroundColor: active.accent }}
                aria-hidden="true"
              />
              <span className="font-numeric text-paper/55">{formatPrice(active.price)}</span>
            </h3>
            <p className="mx-auto mt-3 max-w-md font-body text-body-md text-paper/65">{active.desc}</p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <CartoonButton to={`/sacks/${active.id}`} label={`Shop ${active.name}`} color="bg-blue" />
              <Link
                to="/shop"
                className="btn border-paper/40 bg-transparent text-paper hover:border-paper hover:bg-paper hover:text-ink"
              >
                Shop all
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="torn-bottom h-6 w-full bg-ink" />
    </section>
  );
}
