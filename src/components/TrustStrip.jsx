const ITEMS = [
  { icon: 'public', title: 'Play Anywhere', sub: 'Indoors or out', color: 'text-blue-light' },
  { icon: 'bolt', title: 'Built To Last', sub: 'Premium suede panels', color: 'text-red' },
  { icon: 'groups', title: 'Join The Nation', sub: 'A global community', color: 'text-blue-light' },
];

export default function TrustStrip() {
  return (
    <section aria-label="Why shop Hacky Nation" className="relative bg-paper">
      {/* torn rip where the cream meets the ink band */}
      <div aria-hidden="true" className="torn-top h-6 w-full bg-ink" />

      <div className="bg-ink">
        <ul className="mx-auto grid max-w-site grid-cols-1 gap-6 px-6 pb-8 pt-2 sm:grid-cols-3 md:px-10 md:pb-10">
          {ITEMS.map((item) => (
            <li key={item.title} className="flex items-center gap-3">
              <span
                className={`material-symbols-outlined text-3xl ${item.color}`}
                aria-hidden="true"
              >
                {item.icon}
              </span>
              <span>
                <span className="block font-label text-label-lg uppercase text-yellow">
                  {item.title}
                </span>
                <span className="block font-label text-label-caps uppercase text-paper/70">
                  {item.sub}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
