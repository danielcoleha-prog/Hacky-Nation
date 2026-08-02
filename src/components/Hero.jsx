import { Link } from 'react-router-dom';
import { useParallax } from '../lib/useParallax';
import Seal from './Seal';

/**
 * Layered paper-collage hero.
 *
 * Everything behind the cutout is CSS — no halftone/circle/strip image assets.
 * The cutout PNG bakes hand + torn paper + sack into one layer, so those three
 * move together; the circle and halftone drift behind it at shallower depths.
 */
export default function Hero() {
  const stageRef = useParallax();

  return (
    <section
      ref={stageRef}
      className="paper-grain relative isolate overflow-hidden bg-paper"
      aria-labelledby="hero-heading"
    >
      {/* ---------- background collage ----------
          On narrow screens the copy stacks above the artwork, so the halftone
          is kept narrow and the yellow circle drops down behind the product —
          otherwise both crowd the headline. */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        {/* halftone field, right edge */}
        <div
          className="parallax-layer halftone-coarse absolute inset-y-0 right-0 w-[34%] opacity-70 sm:w-[46%] md:w-[52%]"
          style={{ '--depth': '2px' }}
        />
        <div
          className="parallax-layer halftone absolute inset-y-0 right-0 w-[30%] sm:w-[42%] md:w-[46%]"
          style={{ '--depth': '2px' }}
        />
        {/* solid blue bleed at the far edge */}
        <div className="absolute inset-y-0 right-0 w-[6%] bg-blue" />

        {/* yellow circle */}
        <div
          className="parallax-layer absolute right-[24%] top-[58%] aspect-square w-[42%] rounded-full bg-yellow sm:right-[28%] sm:top-[52%] sm:w-[32%] lg:right-[30%] lg:top-[14%] lg:w-[22%]"
          style={{ '--depth': '3px' }}
        />

        {/* red angled strip */}
        <div
          className="parallax-layer absolute bottom-[8%] right-[6%] h-[6%] w-[58%] -rotate-[4deg] bg-red lg:bottom-[16%] lg:h-[9%] lg:w-[36%]"
          style={{ '--depth': '4px' }}
        />
      </div>

      {/* ---------- content ---------- */}
      <div className="relative z-10 mx-auto grid max-w-site grid-cols-1 items-center gap-8 px-6 pb-16 pt-28 md:px-10 lg:min-h-[760px] lg:grid-cols-[1.05fr_1fr] lg:gap-4 lg:pb-24 lg:pt-32">
        {/* copy */}
        <div className="max-w-xl">
          <h1
            id="hero-heading"
            className="font-display text-display-hero uppercase text-ink"
          >
            Play
            <br />
            With
            <br />
            Your
            <br />
            <span className="text-blue">Sack.</span>
          </h1>

          <p className="mt-7 max-w-sm font-label text-label-lg uppercase leading-relaxed text-ink-soft">
            Handmade suede footbags
            <br />
            built for <span className="text-blue">good times.</span>
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <a href="#shop" className="btn-primary group">
              Shop Collection
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
            <Link to="/custom" className="btn-secondary group">
              Build Your Own
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>

        {/* artwork */}
        <div className="relative flex min-h-[320px] items-center justify-center sm:min-h-[420px] lg:min-h-[560px]">
          <img
            src="/img/hero-hand-sack.png"
            alt="A hand holding a handmade Hacky Nation suede footbag, reaching through torn paper"
            width={1000}
            height={1000}
            fetchPriority="high"
            decoding="async"
            className="parallax-layer relative z-10 h-auto w-[86%] max-w-[560px] object-contain drop-shadow-cut"
            style={{ '--depth': '6px' }}
          />

          {/* seals */}
          <div className="absolute bottom-0 right-0 z-20 flex items-end gap-2 sm:gap-3">
            <Seal variant="yellow" lines={['PREMIUM', 'SUEDE']} />
            <Seal variant="blue" lines={['HAND', 'MADE']} />
            <Seal variant="red" lines={['EST.', '2025']} />
          </div>
        </div>
      </div>
    </section>
  );
}
