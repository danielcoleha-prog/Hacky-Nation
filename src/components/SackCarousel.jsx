import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { SACKS, formatPrice } from '../lib/products';
import SectionHeading from './SectionHeading';
import Seal from './Seal';

/**
 * Selectable sack carousel. Arrows, ← / → keys and swipe step through the
 * lineup; the active sack's spec sits in a printed card alongside, and the whole
 * stage links through to that sack's product page.
 */
export default function SackCarousel() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const touchStartX = useRef(null);
  const count = SACKS.length;
  const active = SACKS[index];

  const step = useCallback(
    (delta) => {
      setDir(delta);
      setIndex((i) => (i + delta + count) % count);
    },
    [count]
  );

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

  /* Preload neighbours so stepping never flashes. */
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
      className="paper-grain relative overflow-hidden bg-paper py-16 md:py-24"
      onKeyDown={onKeyDown}
    >
      <div className="relative z-10 mx-auto max-w-site px-5 md:px-8">
        <SectionHeading
          index="01"
          kicker="The lineup"
          title="Shop sacks"
          id="carousel-heading"
          mis="blue"
          aside="Premium suede. Handmade one at a time. Built to last."
        />

        <div className="mt-12 grid items-start gap-8 lg:mt-16 lg:grid-cols-[1.25fr_0.75fr] lg:gap-12">
          {/* ---------- stage ---------- */}
          <div className="reveal relative" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <div className="relative overflow-hidden border-2 border-ink bg-paper-deep">
              <div
                aria-hidden="true"
                className="dotfield pointer-events-none absolute inset-0 opacity-[0.13]"
              />

              {/* colour wash keyed to the active sack — sits behind the product
                  and stays smaller than it, so the sack reads as the subject.
                  Hidden for photo products, which fill the frame themselves. */}
              {active.cutout !== false && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-500"
                  style={{ backgroundColor: active.accent, opacity: 0.26 }}
                />
              )}

              <div className="relative flex aspect-[5/4] items-center justify-center">
                {SACKS.map((sack, i) => (
                  <Link
                    key={sack.id}
                    to={`/sacks/${sack.id}`}
                    aria-hidden={i !== index}
                    tabIndex={i === index ? 0 : -1}
                    className={`group absolute inset-0 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      sack.cutout === false ? '' : 'p-8'
                    } ${
                      i === index
                        ? 'pointer-events-auto translate-x-0 opacity-100'
                        : 'pointer-events-none opacity-0'
                    }`}
                    style={
                      i === index
                        ? undefined
                        : { transform: `translateX(${dir > 0 ? '-8%' : '8%'}) scale(0.92)` }
                    }
                  >
                    {/* Cutouts are sized off the box height — a percentage width
                        against an auto-sized track collapses to the image's
                        natural size. Photo products fill the frame instead. */}
                    <img
                      src={sack.image}
                      alt={`${sack.fullName} — ${sack.sub.toLowerCase()}`}
                      width={900}
                      height={900}
                      loading={i === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                      className={
                        sack.cutout === false
                          ? 'h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]'
                          : 'h-full w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.04]'
                      }
                      style={
                        sack.cutout === false
                          ? undefined
                          : { filter: 'drop-shadow(0 22px 26px rgba(20,17,13,0.28))' }
                      }
                    />
                  </Link>
                ))}
              </div>

              {active.badge && (
                <Seal
                  variant="red"
                  burst
                  size="md"
                  lines={[active.badge]}
                  className="absolute right-4 top-4 rotate-[9deg]"
                />
              )}
            </div>

            {/* ---------- controls ---------- */}
            <div className="mt-5 flex items-center justify-between gap-4 border-t-2 border-ink pt-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous sack"
                  className="grid h-11 w-11 place-content-center border-2 border-ink bg-paper transition-all duration-150 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-press-sm active:translate-x-0 active:translate-y-0 active:shadow-none"
                >
                  <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                    arrow_back
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next sack"
                  className="grid h-11 w-11 place-content-center border-2 border-ink bg-paper transition-all duration-150 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-press-sm active:translate-x-0 active:translate-y-0 active:shadow-none"
                >
                  <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                    arrow_forward
                  </span>
                </button>
              </div>

              {/* segmented progress, doubles as a picker */}
              <ul className="flex flex-1 items-center gap-1.5" aria-label="Choose a sack">
                {SACKS.map((sack, i) => (
                  <li key={sack.id} className="flex-1">
                    <button
                      type="button"
                      onClick={() => {
                        setDir(i > index ? 1 : -1);
                        setIndex(i);
                      }}
                      aria-current={i === index}
                      aria-label={sack.fullName}
                      className={`h-2 w-full border-2 border-ink transition-colors duration-200 ${
                        i === index ? 'bg-blue' : 'bg-paper hover:bg-ink/15'
                      }`}
                    />
                  </li>
                ))}
              </ul>

              <p
                aria-live="polite"
                className="font-display text-label-caps tabular-nums text-ink-soft"
                style={{ fontVariationSettings: "'wght' 700, 'wdth' 100" }}
              >
                <span className="text-ink">{String(index + 1).padStart(2, '0')}</span>
                <span className="mx-1">/</span>
                {String(count).padStart(2, '0')}
              </p>
            </div>
          </div>

          {/* ---------- detail card ---------- */}
          <div className="reveal card relative p-6 shadow-press md:p-7">
            <p className="eyebrow">{active.sub}</p>

            <h3 className="mt-3 font-display text-display-lg text-ink">{active.name}</h3>

            <div className="mt-3 flex items-baseline gap-3">
              <span
                className="font-display text-[2rem] leading-none text-ink"
                style={{ fontVariationSettings: "'wght' 900, 'wdth' 100" }}
              >
                {formatPrice(active.price)}
              </span>
              {active.compareAt > active.price && (
                <span className="font-body text-body-md text-ink-faint line-through">
                  {formatPrice(active.compareAt)}
                </span>
              )}
            </div>

            <p className="mt-4 font-body text-body-md text-ink-soft">{active.desc}</p>

            <dl className="mt-5 grid grid-cols-2 gap-px border-2 border-ink bg-ink/15">
              <div className="bg-paper px-3 py-2.5">
                <dt className="label text-[10px] text-ink-faint">Panels</dt>
                <dd
                  className="mt-1 font-display text-display-sm text-ink"
                  style={{ fontVariationSettings: "'wght' 900, 'wdth' 100" }}
                >
                  {active.panels}
                </dd>
              </div>
              <div className="bg-paper px-3 py-2.5">
                <dt className="label text-[10px] text-ink-faint">Status</dt>
                <dd className="mt-1 font-display text-[13px] uppercase leading-tight text-ink">
                  {active.preorder ? 'Pre-order' : 'In stock'}
                </dd>
              </div>
            </dl>

            <div className="mt-5 flex items-center gap-2">
              {active.colors.map((c) => (
                <span
                  key={c}
                  className="h-6 w-6 rounded-full border-2 border-ink"
                  style={{ backgroundColor: c }}
                  aria-hidden="true"
                />
              ))}
              <span className="label ml-1 text-ink-faint">Colorway</span>
            </div>

            <Link to={`/sacks/${active.id}`} className="btn-blue mt-6 w-full">
              View product
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
