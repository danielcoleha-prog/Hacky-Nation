import SectionHeading from './SectionHeading';

const TICKER = [
  'Best sack I’ve ever played with',
  'Feels handmade because it is handmade',
  'My whole crew ordered one',
  'Festival approved. All day.',
  'Zero regrets. Worth every dollar.',
];

const QUOTES = [
  {
    quote: "Best sack I've ever played with. The feel is unreal — it's like it was made for my foot.",
    name: 'Harrison B.',
    place: 'Haddonfield, NJ',
    tilt: '-1.4deg',
  },
  {
    quote: 'All my homies love Hacky Nation knit sacks. They are the best, hands down.',
    name: 'Peter S.',
    place: 'Moorestown, NJ',
    tilt: '0.9deg',
  },
  {
    quote: 'They have the best sack content on all of Instagram, and the product backs it up.',
    name: 'Brian M.',
    place: 'West Chester, PA',
    tilt: '-0.7deg',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="border-t-2 border-ink bg-paper">
      {/* ticker */}
      <div className="overflow-hidden border-b-2 border-ink bg-red text-paper">
        <div className="flex w-max animate-marquee py-2.5">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex" aria-hidden={copy === 1}>
              {TICKER.map((line) => (
                <span key={line} className="flex items-center whitespace-nowrap px-7">
                  <span className="mr-3 text-paper/60" aria-hidden="true">
                    ★
                  </span>
                  <span className="label text-[11px] tracking-[0.18em]">{line}</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="paper-grain relative py-16 md:py-24">
        <div className="relative z-10 mx-auto max-w-site px-5 md:px-8">
          <SectionHeading
            index="05"
            kicker="Reviews"
            title="The circle speaks"
            mis="red"
            aside="4.9 average across 128 reviews."
          />

          <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-3">
            {QUOTES.map((q) => (
              <figure
                key={q.name}
                className="reveal card relative p-6 shadow-press-sm transition-transform duration-200 hover:-translate-y-1 md:[transform:rotate(var(--tilt))]"
                style={{ '--tilt': q.tilt }}
              >
                <div className="flex gap-0.5 text-yellow" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} aria-hidden="true" className="text-[15px]">
                      ★
                    </span>
                  ))}
                </div>

                <blockquote className="mt-4 font-body text-body-lg text-ink">{q.quote}</blockquote>

                <figcaption className="mt-6 flex items-center gap-3 border-t-2 border-ink/12 pt-4">
                  <span
                    className="grid h-9 w-9 shrink-0 place-content-center rounded-full bg-blue font-display text-[13px] text-paper"
                    aria-hidden="true"
                  >
                    {q.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block font-display text-[14px] uppercase text-ink">{q.name}</span>
                    <span className="label block text-ink-faint">{q.place}</span>
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
