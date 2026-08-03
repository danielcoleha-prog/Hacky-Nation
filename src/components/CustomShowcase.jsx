import DiagonalMarqueeCarousel from './ui/DiagonalMarqueeCarousel';
import { CUSTOM_MOCKUPS } from '../lib/products';

/**
 * Purely visual band — a diagonal wall of past custom builds, no copy or CTA.
 * The custom pitch itself lives in CustomBanner further down the page, so
 * repeating a headline and button here just competed with it.
 *
 * Cards fall back to labelled placeholders until real photos are supplied;
 * pass a `cards` array of { id, url, title } to swap them in.
 */
const CARDS = CUSTOM_MOCKUPS.map((m, i) => ({
  id: `custom-${i + 1}`,
  url: m.src,
  title: m.alt,
  tone: ['#E8DBC3', '#DCE4F2', '#F2DCDC', '#EFE7CF'][i % 4],
}));

export default function CustomShowcase({ cards = CARDS }) {
  return (
    <section
      id="customs"
      aria-label="Custom builds we have made"
      className="relative overflow-hidden bg-paper"
    >
      <div className="relative h-[460px] w-full md:h-[560px]">
        <DiagonalMarqueeCarousel cards={cards} className="absolute inset-0 h-full w-full" />

      </div>
    </section>
  );
}
