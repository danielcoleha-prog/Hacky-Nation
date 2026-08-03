import SectionHeading from './SectionHeading';

/**
 * Where you can buy the sacks in person. Replaces the old review wall.
 *
 * Entries with a `logo` render the image in a solid frame; any without one
 * fall back to a dashed placeholder slot. Add `href` to make a card clickable.
 * The trailing "And more!" tile keeps the list from reading as exhaustive.
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
          mis="blue"
          aside="Carrying Hacky Nation? Get in touch and we'll add you here."
        />

        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
          {STOCKISTS.map((store) => {
            const inner = store.logo ? (
              <img
                src={store.logo}
                alt={store.name}
                loading="lazy"
                decoding="async"
                className="max-h-16 w-auto max-w-full object-contain"
              />
            ) : (
              <div className="text-center">
                <span className="material-symbols-outlined text-[26px] text-ink-faint" aria-hidden="true">
                  storefront
                </span>
                <span className="mt-1.5 block label text-ink-faint">{store.name}</span>
              </div>
            );

            return (
              <li key={store.id} className="reveal">
                {store.href ? (
                  <a
                    href={store.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex aspect-[4/3] items-center justify-center border-2 border-ink bg-paper p-4 transition-all duration-150 hover:-translate-y-1 hover:shadow-press-sm"
                  >
                    {inner}
                  </a>
                ) : (
                  <div
                    className={`flex aspect-[4/3] items-center justify-center bg-paper-deep p-4 ${
                      store.logo ? 'border-2 border-ink' : 'border-2 border-dashed border-ink/35'
                    }`}
                  >
                    {inner}
                  </div>
                )}
              </li>
            );
          })}

          {/* We sell through other shops too — this closes the grid rather than
              implying the list is exhaustive. */}
          <li className="reveal">
            <div className="flex aspect-[4/3] items-center justify-center border-2 border-dashed border-ink/35 bg-paper-deep p-4">
              <span className="font-display text-display-sm text-ink-soft">And more!</span>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
