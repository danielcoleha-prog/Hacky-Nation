import { Link } from 'react-router-dom';
import { useParallax } from '../lib/useParallax';

/**
 * Hero built on the composed scene photo (public/img/hero-scene-*.webp), which
 * already contains the cream stock, halftone edges, yellow circle, red strip and
 * the hand coming through torn paper. Nothing here re-draws those in CSS.
 *
 * Two layouts, because the art is 1.58:1 and a phone viewport is ~0.45:1:
 *  - lg and up  — the photo fills the hero and the copy sits over the empty
 *                 cream on its left.
 *  - below lg   — the copy sits on flat cream and the photo runs full-bleed
 *                 underneath at its true aspect ratio, so the hand is never
 *                 cropped out of frame.
 */
export default function Hero() {
  const stageRef = useParallax();

  const scene = (
    <img
      src="/img/hero-scene-1600.webp"
      srcSet="/img/hero-scene-1000.webp 1000w, /img/hero-scene-1600.webp 1600w, /img/hero-scene-2400.webp 2400w"
      sizes="100vw"
      alt="A hand reaching through torn paper holding a handmade Hacky Nation suede footbag"
      width={4030}
      height={2549}
      fetchPriority="high"
      decoding="async"
      className="h-full w-full object-cover"
    />
  );

  return (
    <section
      ref={stageRef}
      className="relative isolate overflow-hidden bg-paper"
      aria-labelledby="hero-heading"
    >
      {/* ---------- desktop: photo fills the hero ---------- */}
      <div className="absolute inset-0 z-0 hidden lg:block" aria-hidden="true">
        {/* Slightly overscaled so the parallax nudge can't expose an edge. */}
        <div
          className="parallax-layer h-full w-full scale-[1.04]"
          style={{ '--depth': '6px' }}
        >
          {scene}
        </div>

        {/* The art carries a blue halftone band on its left edge, and object-cover
            always shows the full width — so the copy would land on dark dots.
            This cream fade puts paper back under the text at any viewport ratio
            instead of fighting the crop. */}
        <div className="absolute inset-y-0 left-0 w-[62%] bg-gradient-to-r from-paper via-paper/92 to-transparent" />
      </div>

      {/* ---------- copy ---------- */}
      <div className="relative z-10 mx-auto grid max-w-site grid-cols-1 px-6 pb-10 pt-20 md:px-10 lg:min-h-[760px] lg:grid-cols-[minmax(0,46%)_1fr] lg:items-center lg:pb-24 lg:pt-28">
        <div className="max-w-xl">
          <h1 id="hero-heading" className="font-display text-display-hero uppercase text-ink">
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
      </div>

      {/* ---------- below lg: photo runs full width at its own ratio ---------- */}
      <div className="relative z-0 lg:hidden">
        <div className="aspect-[4030/2549] w-full">{scene}</div>
      </div>
    </section>
  );
}
