import { useParallax } from '../lib/useParallax';
import Seal from './Seal';
import CartoonButton from './ui/CartoonButton';

/**
 * Two posters, swapped by breakpoint — both bake the "Play With Your Sack."
 * headline into the art, so the <h1> stays in the document for SEO and screen
 * readers but is visually sr-only at every size; it never renders twice.
 *
 * Neither image leaves a top margin the way the previous poster did, so a
 * fixed-nav floating straight over row 0 would sit on top of the headline
 * letters. `heroClear` below is a flat-cream strip, sized to the nav, that
 * runs before the art at every breakpoint to give the nav somewhere to float.
 *
 * The desktop poster (3072×1643) has an open cream band under "SACK." for the
 * CTAs to sit in, same as before. The mobile poster (2000×3134) doesn't — the
 * hand-and-sack cluster runs close to full width near the bottom — so on
 * mobile the CTAs sit below the image instead, on the section's own cream,
 * which matches the art's cream exactly and reads as one continuous surface.
 */
export default function Hero() {
  const stageRef = useParallax();

  const ctas = <CartoonButton to="/shop" label="Shop the lineup" color="bg-blue" />;

  {/* Matches the nav's actual rendered height (h-11 logo + py-3 + border) —
      not a round number, and 2px narrower below lg than at lg because the
      nav's own box is 2px taller there. Anything taller leaves a visible
      cream sliver between the nav and the art; anything shorter and the nav
      clips into the headline. */}
  const heroClear = <div aria-hidden="true" className="h-[72px] w-full bg-paper lg:h-[70px]" />;

  return (
    <section ref={stageRef} className="relative isolate bg-paper" aria-labelledby="hero-heading">
      <h1 id="hero-heading" className="sr-only">
        Play With Your Sack.
      </h1>

      {/* ---------- below lg: mobile poster, full bleed ---------- */}
      <div className="lg:hidden">
        {heroClear}
        <div className="relative aspect-[2000/3134] w-full">
          <img
            src="/img/hero-mobile-1400.webp"
            srcSet="/img/hero-mobile-900.webp 900w, /img/hero-mobile-1400.webp 1400w, /img/hero-mobile-2000.webp 2000w"
            sizes="100vw"
            alt="Play with your sack — a hand reaching through torn paper holding a handmade Hacky Nation suede footbag"
            width={2000}
            height={3134}
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="paper-grain relative bg-paper px-5 pb-10 pt-7 md:px-8">
          {/* Strapline, blurb and the two stamps are desktop-only now — on a
              phone the poster already says all of it, and stacking the copy
              under it pushed the buttons below the fold. */}
          <div className="flex animate-rise-in flex-col gap-3 sm:flex-row [animation-delay:160ms]">
            {ctas}
          </div>
        </div>
      </div>

      {/* ---------- lg and up: desktop poster, full bleed ---------- */}
      <div className="hidden lg:block">
        {heroClear}
        <div className="relative aspect-[3072/1643] w-full">
          <img
            src="/img/hero-poster-2000.webp"
            srcSet="/img/hero-poster-1400.webp 1400w, /img/hero-poster-2000.webp 2000w, /img/hero-poster-3072.webp 3072w"
            sizes="100vw"
            alt="Play with your sack — a hand reaching through torn paper holding a handmade Hacky Nation suede footbag"
            width={3072}
            height={1643}
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover"
          />

          {/* Anchored in percentages against the art's own box, so the pair
              lands in the open cream below the baked "SACK." lockup. */}
          {/* One flex row — CTAs plus the guarantee stamp, which only joins at
              xl. Letting flexbox lay them out left-to-right (instead of two
              separately-anchored absolute blocks) means they can't overlap no
              matter how the cream band's width shifts with the art. */}
          <div
            className="parallax-layer absolute bottom-[19%] left-[4%] flex flex-wrap items-center gap-4 animate-rise-in [animation-delay:200ms] xl:left-[5%]"
            style={{ '--depth': '4px' }}
          >
            {ctas}
            <Seal
              variant="paper"
              size="md"
              lines={['PREMIUM', 'SUEDE', '2025']}
              className="hidden rotate-[-6deg] shadow-press-sm xl:grid"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
