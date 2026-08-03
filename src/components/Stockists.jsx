import SectionHeading from './SectionHeading';

/**
 * Where you can buy the sacks in person. Replaces the old review wall.
 *
 * Slots are placeholders sized for real store logos — drop a `logo` (and
 * optional `href`) onto an entry and it renders the image instead of the
 * lettermark, with nothing else changing.
 */
const STOCKISTS = [
  { id: 's1', name: 'Store name' },
  { id: 's2', name: 'Store name' },
  { id: 's3', name: 'Store name' },
  { id: 's4', name: 'Store name' },
  { id: 's5', name: 'Store name' },
  { id: 's6', name: 'Store name' },
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

        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {STOCKISTS.map((store) => {
            const inner = store.logo ? (
              <img
                src={store.logo}
                alt={store.name}
                loading="lazy"
                decoding="async"
                className="max-h-14 w-auto object-contain"
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
                  <div className="flex aspect-[4/3] items-center justify-center border-2 border-dashed border-ink/35 bg-paper-deep p-4">
                    {inner}
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <p className="mt-8 font-body text-body-sm text-ink-faint">
          Store logos are placeholders — send them over and they'll go straight in.
        </p>
      </div>
    </section>
  );
}
