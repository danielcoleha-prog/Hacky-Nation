import { Link } from 'react-router-dom';
import { useParallax } from '../lib/useParallax';
import Seal from './Seal';

/**
 * Two heroes, because the desktop art has the headline baked into it.
 *
 *  lg and up — the finished poster (hero-poster-*.webp, 3:2) is the whole hero.
 *              The only HTML over it is the CTA pair; the <h1> stays in the
 *              document for SEO and screen readers, just visually hidden so the
 *              headline never renders twice. The hero box keeps the art's exact
 *              aspect ratio so the buttons can be anchored in percentages and
 *              never drift off the cream onto the baked type.
 *
 *  below lg  — real HTML headline on flat cream, with the text-free scene photo
 *              full-bleed underneath at its own ratio, so the hand is never
 *              cropped out of frame.
 */
export default function Hero() {
  const stageRef = useParallax();

  const ctas = (
    <>
      <Link to="/shop" className="btn-primary group">
        Shop the lineup
        <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      </Link>
      <Link to="/custom" className="btn-secondary group">
        Build your own
        <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      </Link>
    </>
  );

  return (
    <section ref={stageRef} className="relative isolate bg-paper" aria-labelledby="hero-heading">
      {/* ---------- below lg: HTML headline on cream ----------
          `lg:contents` dissolves these wrappers at desktop so the <h1> can go
          sr-only on its own — it must stay in the accessibility tree and the
          crawlable markup even though the poster art carries the words. */}
      {/* pt clears the fixed nav, which floats over the art on this page */}
      <div className="paper-grain relative mx-auto max-w-site px-5 pt-28 md:px-8 lg:contents">
        <div className="relative z-10 lg:contents">
          <p className="eyebrow animate-rise-in lg:hidden">Handmade suede footbags</p>

          <h1
            id="hero-heading"
            className="mt-5 animate-rise-in font-display text-display-hero text-ink [animation-delay:80ms] lg:sr-only lg:mt-0"
          >
            <span className="overprint block" data-text="Play" style={{ '--mis-color': 'var(--press-red)' }}>
              Play
            </span>
            <span className="overprint block" data-text="With" style={{ '--mis-color': 'var(--press-yellow)' }}>
              With
            </span>
            <span className="overprint block" data-text="Your" style={{ '--mis-color': 'var(--press-red)' }}>
              Your
            </span>
            <span
              className="overprint block text-blue"
              data-text="Sack."
              style={{ '--mis-color': 'var(--press-ink)', '--mis-x': '4px', '--mis-y': '4px' }}
            >
              Sack.
            </span>
          </h1>

          <p className="mt-6 max-w-xs animate-rise-in font-body text-body-lg text-ink-soft [animation-delay:160ms] lg:hidden">
            Premium suede, stitched one at a time. Built for the circle.
          </p>

          <div className="mt-8 flex animate-rise-in flex-col gap-3 pb-9 sm:flex-row [animation-delay:240ms] lg:hidden">
            {ctas}
          </div>
        </div>
      </div>

      {/* ---------- below lg: collage rebuilt in CSS ----------
          The scene photo is gone here — at a phone's aspect ratio it had to be
          letterboxed or cropped, and either way the composition fought the
          layout. These are the same elements as real layers: halftone field,
          yellow circle, red strip, then the hand-and-sack cutout on top. */}
      <div className="relative isolate w-full overflow-hidden lg:hidden">
        <div className="relative aspect-[5/6] w-full sm:aspect-[4/3]">
          {/* halftone field, right edge */}
          <div
            aria-hidden="true"
            className="halftone-coarse parallax-layer absolute inset-y-0 right-0 w-[52%] opacity-70"
            style={{ '--depth': '2px' }}
          />
          <div
            aria-hidden="true"
            className="halftone parallax-layer absolute inset-y-0 right-0 w-[46%]"
            style={{ '--depth': '2px' }}
          />
          {/* solid blue bleed at the far edge */}
          <div aria-hidden="true" className="absolute inset-y-0 right-0 w-[7%] bg-blue" />

          {/* yellow circle, behind the sack */}
          <div
            aria-hidden="true"
            className="parallax-layer absolute right-[26%] top-[10%] aspect-square w-[42%] rounded-full bg-yellow sm:w-[32%]"
            style={{ '--depth': '3px' }}
          />

          {/* red angled strip, under the hand */}
          <div
            aria-hidden="true"
            className="parallax-layer absolute bottom-[16%] left-[8%] h-[9%] w-[62%] -rotate-[5deg] bg-red sm:h-[10%] sm:w-[48%]"
            style={{ '--depth': '4px' }}
          />

          <img
            src="/img/hero-hand-800.webp"
            srcSet="/img/hero-hand-800.webp 800w, /img/hero-hand-1200.webp 1200w"
            sizes="(min-width: 640px) 70vw, 96vw"
            alt="A hand reaching through torn paper holding a handmade Hacky Nation suede footbag"
            width={2000}
            height={2000}
            fetchPriority="high"
            decoding="async"
            className="parallax-layer absolute left-1/2 top-1/2 h-auto w-[96%] max-w-[480px] -translate-x-1/2 -translate-y-1/2 object-contain sm:w-[74%]"
            style={{ '--depth': '6px', filter: 'drop-shadow(0 26px 30px rgba(20,17,13,0.32))' }}
          />

          {/* seals, tucked into the cream at bottom-left */}
          <div className="absolute bottom-3 left-4 z-10 flex items-end gap-2">
            <Seal variant="paper" size="sm" lines={['PREMIUM', 'SUEDE']} className="shadow-press-sm" />
            <Seal variant="red" burst size="sm" lines={['EST.', '2025']} className="rotate-[-10deg]" />
          </div>
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
          className="parallax-layer absolute bottom-[16.5%] left-[4%] flex animate-rise-in gap-4 [animation-delay:300ms] xl:left-[5%]"
          style={{ '--depth': '4px' }}
        >
          {ctas}
        </div>

        {/* Rotating guarantee stamp, tucked into the cream under the CTAs. */}
        <div
          className="parallax-layer absolute bottom-[6%] right-[6%] hidden xl:block"
          style={{ '--depth': '7px' }}
        >
          <Seal variant="paper" size="lg" lines={['PREMIUM', 'SUEDE', '· 2025 ·']} className="rotate-[-8deg] shadow-press-sm" />
        </div>
      </div>
    </section>
  );
}
