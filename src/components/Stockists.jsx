import SectionHeading from './SectionHeading';

/**
 * Where you can buy the sacks in person.
 *
 * Logos sit directly on the paper at a good size — no frames. They are flat
 * black marks on transparent backgrounds, so boxing each one just added a
 * competing rectangle and shrank the artwork inside it.
 */
const STOCKISTS = [
  { id: 's1', name: "Shriver's", logo: '/img/stockists/logo-1.webp' },
  { id: 's2', name: 'The Mod Hatter', logo: '/img/stockists/logo-2.webp' },
  { id: 's3', name: 'Surf Shack LBI South', logo: '/img/stockists/logo-3.webp' },
  { id: 's4', name: "Fisherman's Cove", logo: '/img/stockists/logo-4.webp' },
  { id: 's5', name: 'Air Circus', logo: '/img/stockists/logo-5.webp' },
  { id: 's6', name: 'Alpine', logo: '/img/stockists/logo-6.webp' },
];

export default function Stockists() {
  return (
    <section id="stockists" aria-labelledby="stockists-heading" className="paper-grain relative bg-paper">
      <div className="relative mx-auto max-w-site px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          kicker="Stocked at"
          title="Find us in store"
          id="stockists-heading"
          aside="Carrying Hacky Nation? Get in touch and we'll add you here."
        />

        <ul className="mt-12 grid grid-cols-2 items-center gap-x-10 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
          {STOCKISTS.map((store) => {
            const logo = (
              <img
                src={store.logo}
                alt={store.name}
                loading="lazy"
                decoding="async"
                /* Bounded on both axes: after trimming, these run from square
                   badges to 3:1 wordmarks, so a fixed height alone would make
                   the wide ones tower over the round ones. */
                className="max-h-full max-w-full object-contain"
              />
            );

            return (
              <li key={store.id} className="reveal flex h-20 items-center justify-center md:h-24">
                {store.href ? (
                  <a
                    href={store.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-full w-full items-center justify-center transition-transform duration-200 hover:-translate-y-1"
                  >
                    {logo}
                  </a>
                ) : (
                  logo
                )}
              </li>
            );
          })}

          {/* We sell through other shops too — this closes the list rather than
              implying it is exhaustive. */}
          <li className="reveal flex h-20 items-center justify-center md:h-24">
            <span className="font-body text-[1.6rem] font-semibold text-ink-soft md:text-[1.9rem]">And more!</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
