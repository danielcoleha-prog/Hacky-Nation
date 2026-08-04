import DiagonalMarqueeCarousel from './ui/DiagonalMarqueeCarousel';

/**
 * Purely visual band — a diagonal wall of Hacky Nation photography, no copy or
 * CTA. The custom pitch itself lives in CustomBanner further down the page, so
 * repeating a headline and button here just competed with it.
 *
 * Order matters: the six studio shots have pale backgrounds, so they are spaced
 * out through the darker lifestyle frames rather than listed together — a run
 * of cream cards side by side reads as a gap in the wall.
 */
const CARDS = [
  { id: 'w01', url: '/img/wild/wild-01.webp' },
  { id: 'w02', url: '/img/wild/wild-02.webp' },
  { id: 'w03', url: '/img/wild/wild-03.webp' },
  { id: 'w04', url: '/img/wild/wild-04.webp' },
  { id: 'w05', url: '/img/wild/wild-05.webp' },
  { id: 'w06', url: '/img/wild/wild-06.webp' },
  { id: 'w07', url: '/img/wild/wild-07.webp' },
  { id: 'w08', url: '/img/wild/wild-08.webp' },
  { id: 'w09', url: '/img/wild/wild-09.webp' },
  { id: 'w10', url: '/img/wild/wild-10.webp' },
  { id: 'w11', url: '/img/wild/wild-11.webp' },
  { id: 'w12', url: '/img/wild/wild-12.webp' },
  { id: 'w13', url: '/img/wild/wild-13.webp' },
  { id: 'w14', url: '/img/wild/wild-14.webp' },
  { id: 'w15', url: '/img/wild/wild-15.webp' },
  { id: 'w16', url: '/img/wild/wild-16.webp' },
  { id: 'w17', url: '/img/wild/wild-17.webp' },
  { id: 'w18', url: '/img/wild/wild-18.webp' },
  { id: 'w19', url: '/img/wild/wild-19.webp' },
  { id: 'w20', url: '/img/wild/wild-20.webp' },
  { id: 'w21', url: '/img/wild/wild-21.webp' },
  { id: 'w22', url: '/img/wild/wild-22.webp' },
  { id: 'w23', url: '/img/wild/wild-23.webp' },
  { id: 'w24', url: '/img/wild/wild-24.webp' },
];

export default function CustomShowcase({ cards = CARDS }) {
  return (
    <section
      id="customs"
      aria-label="Hacky Nation in the wild"
      className="relative overflow-hidden bg-paper"
    >
      <div className="relative h-[460px] w-full md:h-[560px]">
        <DiagonalMarqueeCarousel cards={cards} className="absolute inset-0 h-full w-full" />
      </div>
    </section>
  );
}
