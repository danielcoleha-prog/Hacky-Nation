const TICKER = [
  '⬤ "Best sack I\'ve ever played with" — Jake M., Boulder CO',
  '⬤ "Feels handmade because it IS handmade" — Sara L., Portland OR',
  '⬤ "My whole crew ordered one" — Devon K., Austin TX',
  '⬤ "Festival approved. All day." — Mia T., Asheville NC',
  '⬤ "Zero regrets. Worth every dollar." — Chris B., Denver CO',
];

const QUOTES = [
  {
    quote: "Best sack I've ever played with. The feel is unreal, it's like it was made for my foot.",
    name: 'Harrison B.',
    place: 'Haddonfield, NJ',
    tilt: '-1.5deg',
  },
  {
    quote: 'All my homies love hacky nation knit sacks, they are the best.',
    name: 'Peter S.',
    place: 'Moorestown, NJ',
    tilt: '1deg',
  },
  {
    quote: 'They have the best sack content on all of Instagram!',
    name: 'Brian M.',
    place: 'West Chester, PA',
    tilt: '-0.8deg',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="border-b-2 border-ink bg-paper">
      <div className="overflow-hidden border-b-2 border-ink bg-red text-paper">
        <div className="flex w-max animate-marquee gap-10 py-2.5">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex gap-10" aria-hidden={copy === 1}>
              {TICKER.map((line) => (
                <span key={line} className="whitespace-nowrap font-label text-label-caps uppercase">
                  {line}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="paper-grain relative py-16 md:py-24">
        <div className="relative z-10 mx-auto max-w-site px-6 md:px-10">
          <h2 className="mb-10 font-display text-display-xl uppercase text-ink">
            The Circle Speaks
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {QUOTES.map((q) => (
              <figure
                key={q.name}
                className="border-2 border-ink bg-paper p-6 shadow-card md:[transform:rotate(var(--tilt))]"
                style={{ '--tilt': q.tilt }}
              >
                <p aria-hidden="true" className="font-display text-5xl leading-none text-blue">
                  &ldquo;
                </p>
                <blockquote className="mt-2 font-body text-body-lg text-ink">{q.quote}</blockquote>
                <figcaption className="mt-5 border-t-2 border-ink/10 pt-4">
                  <span className="block font-label text-label-lg uppercase text-ink">{q.name}</span>
                  <span className="block font-label text-label-caps uppercase text-ink-soft">
                    {q.place}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
