import { Link } from 'react-router-dom';
import { useParallax } from '../lib/useParallax';

/**
 * Two heroes, because the desktop art has the headline baked into it.
 *
 *  lg and up — the finished poster (hero-poster-*.webp, 3:2) is the whole hero.
 *              The only HTML over it is the CTA pair; the <h1> is still in the
 *              document for SEO and screen readers, just visually hidden so the
 *              headline doesn't render twice. The hero box keeps the art's exact
 *              aspect ratio so the buttons can be anchored in percentages and
 *              never drift out of the cream against the baked type.
 *
 *  below lg  — the earlier treatment: real HTML headline on flat cream, with the
 *              text-free scene photo (hero-scene-*.webp) full-bleed underneath at
 *              its own ratio, so the hand is never cropped out of frame.
 */
export default function Hero() {
  const stageRef = useParallax();

  const ctas = (
    <>
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
    </>
  );

  return (
    <section
      ref={stageRef}
      className="relative isolate bg-paper"
      aria-labelledby="hero-heading"
    >
      {/* Visible on mobile, screen-reader-only on desktop where the art carries it. */}
      <div className="mx-auto max-w-site px-6 pt-20 md:px-10 lg:px-0 lg:pt-0">
        <h1
          id="hero-heading"
          className="font-display text-display-hero uppercase text-ink lg:sr-only"
        >
          Play
          <br />
          With
          <br />
          Your
          <br />
          <span className="text-blue">Sack.</span>
        </h1>

        <p className="mt-7 max-w-sm font-label text-label-lg uppercase leading-relaxed text-ink-soft lg:hidden">
          Handmade suede footbags
          <br />
          built for <span className="text-blue">good times.</span>
        </p>

        <div className="mt-9 flex flex-col gap-3 pb-10 sm:flex-row sm:gap-4 lg:hidden">{ctas}</div>
      </div>

      {/* ---------- below lg: text-free scene at its own ratio ---------- */}
      <div className="lg:hidden">
        <div className="aspect-[4030/2549] w-full">
          <img
            src="/img/hero-scene-1600.webp"
            srcSet="/img/hero-scene-1000.webp 1000w, /img/hero-scene-1600.webp 1600w"
            sizes="100vw"
            alt="A hand reaching through torn paper holding a handmade Hacky Nation suede footbag"
            width={4030}
            height={2549}
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* ---------- lg and up: the finished poster ---------- */}
      <div className="relative hidden aspect-[3072/2048] w-full lg:block">
        <img
          src="/img/hero-poster-2000.webp"
          srcSet="/img/hero-poster-1400.webp 1400w, /img/hero-poster-2000.webp 2000w, /img/hero-poster-3072.webp 3072w"
          sizes="100vw"
          alt="Play with your sack — a hand reaching through torn paper holding a handmade Hacky Nation suede footbag"
          width={3072}
          height={2048}
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover"
        />

        {/* Anchored in percentages against the art's own box, so the pair always
            lands in the cream below the baked "SACK." lockup. */}
        <div
          className="parallax-layer absolute bottom-[17%] left-[4%] flex gap-4 xl:left-[5%]"
          style={{ '--depth': '4px' }}
        >
          {ctas}
        </div>
      </div>
    </section>
  );
}
