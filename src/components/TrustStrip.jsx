const ITEMS = [
  { icon: 'public', title: 'Play anywhere', sub: 'Indoors, outdoors, anywhere there is a circle' },
  { icon: 'bolt', title: 'Built to last', sub: 'Premium suede panels, double-stitched' },
  { icon: 'groups', title: 'Join the nation', sub: 'Shipped to 48 states and counting' },
];

export default function TrustStrip() {
  return (
    <section aria-label="Why shop Hacky Nation" className="relative bg-paper">
      {/* Torn rip where the cream meets the ink band. Hidden at lg and up, where
          the hero poster already ends in its own black torn edge — two stacked
          rips read as a mistake. */}
      <div aria-hidden="true" className="torn-top h-6 w-full bg-ink lg:hidden" />

      <div className="relative overflow-hidden bg-ink">
        <div
          aria-hidden="true"
          className="dotfield pointer-events-none absolute inset-0 opacity-[0.14]"
          style={{ '--dot': '#F2E9D8' }}
        />

        <ul className="relative mx-auto grid max-w-site gap-px bg-paper/15 px-0 sm:grid-cols-3">
          {ITEMS.map((item) => (
            <li key={item.title} className="flex items-center gap-4 bg-ink px-5 py-6 md:px-8 md:py-8">
              <span
                className="material-symbols-outlined shrink-0 text-[26px] text-yellow"
                aria-hidden="true"
              >
                {item.icon}
              </span>
              <span>
                <span className="block font-display text-display-sm uppercase text-paper">
                  {item.title}
                </span>
                <span className="mt-1 block font-body text-body-sm text-paper/60">{item.sub}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div aria-hidden="true" className="torn-bottom h-6 w-full bg-ink" />
    </section>
  );
}
