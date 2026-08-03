import DiagonalMarqueeCarousel from './ui/DiagonalMarqueeCarousel';
import CartoonButton from './ui/CartoonButton';

/**
 * Diagonal wall of past custom builds. Replaces the old bundle builder —
 * cross-selling now lives on the product page, where you are already looking
 * at a sack, rather than as a standalone configurator on the landing page.
 *
 * Cards fall back to labelled placeholders until real photos are supplied;
 * pass a `cards` array of { id, url, title } to swap them in.
 */
export default function CustomShowcase({ cards }) {
  return (
    <section
      id="customs"
      aria-labelledby="customs-heading"
      className="relative overflow-hidden bg-paper"
    >
      <div className="relative h-[460px] w-full md:h-[560px]">
        <DiagonalMarqueeCarousel cards={cards} className="absolute inset-0 h-full w-full" />

        {/* Centre plate keeps the headline legible over the moving cards. */}
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-5">
          <div className="pointer-events-auto max-w-lg border-2 border-ink bg-paper/95 px-7 py-8 text-center shadow-press backdrop-blur-sm md:px-10 md:py-10">
            <p className="eyebrow">Made to order</p>
            <h2 id="customs-heading" className="mt-3 font-display text-display-lg text-ink">
              <span
                className="overprint"
                data-text="Customs we have made"
                style={{ '--mis-color': 'var(--press-red)' }}
              >
                Customs we have made
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-sm font-body text-body-md text-ink-soft">
              Your colors, your panels, your patch. Send us what you want and we
              will build it.
            </p>
            <div className="mt-7 flex justify-center">
              <CartoonButton to="/custom" label="Build your own" color="bg-blue" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
