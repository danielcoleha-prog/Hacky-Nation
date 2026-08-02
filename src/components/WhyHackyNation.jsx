import SectionHeading from './SectionHeading';
import Seal from './Seal';

const POINTS = [
  {
    n: '01',
    title: 'Real suede',
    body: 'Premium suede panels, cut and stitched by hand. No plastic shells, no filler, no shortcuts.',
  },
  {
    n: '02',
    title: 'One at a time',
    body: 'Every sack is built individually in small batches, so no two are ever quite identical.',
  },
  {
    n: '03',
    title: 'Weighted right',
    body: 'Balanced fill so it settles on your foot instead of skidding off it. Stalls like it should.',
  },
  {
    n: '04',
    title: 'Built for the circle',
    body: 'Made to be kicked, dropped, pocketed and kicked again. All day, every day.',
  },
];

const STATS = [
  { value: '3K+', label: 'In the nation' },
  { value: '48', label: 'States played' },
  { value: '100%', label: 'Handmade' },
];

export default function WhyHackyNation() {
  return (
    <section
      id="why"
      className="paper-grain relative overflow-hidden border-t-2 border-ink bg-paper py-16 md:py-24"
    >
      <div className="relative z-10 mx-auto max-w-site px-5 md:px-8">
        <SectionHeading
          index="03"
          kicker="Why Hacky Nation"
          title="Made by hand."
          mis="yellow"
          aside="Not stamped out by a machine in a warehouse."
        />

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <ol className="grid gap-x-8 gap-y-9 sm:grid-cols-2">
            {POINTS.map((point) => (
              <li key={point.n} className="reveal border-t-2 border-ink pt-4">
                <span
                  className="font-display text-display-md text-blue"
                  style={{ fontVariationSettings: "'wght' 900, 'wdth' 100" }}
                >
                  {point.n}
                </span>
                <h3 className="mt-2 font-display text-display-md text-ink">{point.title}</h3>
                <p className="mt-2.5 max-w-sm font-body text-body-md text-ink-soft">{point.body}</p>
              </li>
            ))}
          </ol>

          {/* stat block — the seal is a sibling of the padded panel, not a child,
              so it pins to the panel's outer corner instead of landing on the
              numbers */}
          <aside className="reveal relative self-start">
            <div className="relative overflow-hidden border-2 border-ink bg-ink p-7 text-paper shadow-press">
              <div
                aria-hidden="true"
                className="dotfield pointer-events-none absolute inset-0 opacity-[0.14]"
                style={{ '--dot': '#F2E9D8' }}
              />
              <div className="relative">
                <p className="eyebrow text-yellow">By the numbers</p>

                <dl className="mt-6 flex flex-col gap-6">
                  {STATS.map((stat) => (
                    <div key={stat.label} className="border-b border-paper/20 pb-5 last:border-0 last:pb-0">
                      <dd
                        className="font-display text-[3rem] leading-[0.85] text-paper"
                        style={{ fontVariationSettings: "'wght' 900, 'wdth' 88" }}
                      >
                        {stat.value}
                      </dd>
                      <dt className="label mt-2 text-paper/60">{stat.label}</dt>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <Seal
              variant="yellow"
              burst
              size="md"
              lines={['EST.', '2025']}
              className="absolute -right-5 -top-6 rotate-[10deg]"
            />
          </aside>
        </div>
      </div>
    </section>
  );
}
