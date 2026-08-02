import Seal from './Seal';

const POINTS = [
  {
    n: '01',
    title: 'Real Suede',
    body: 'Premium suede panels, cut and stitched by hand. No plastic shells, no filler.',
  },
  {
    n: '02',
    title: 'Made One At A Time',
    body: 'Every sack is built individually. Small batches mean no two are identical.',
  },
  {
    n: '03',
    title: 'Weighted Right',
    body: 'Balanced fill so it sits on your foot instead of skidding off it.',
  },
  {
    n: '04',
    title: 'Built For The Circle',
    body: 'Made to be kicked, dropped, pocketed, and kicked again. All day.',
  },
];

export default function WhyHackyNation() {
  return (
    <section id="why" className="relative overflow-hidden border-b-2 border-ink bg-paper-deep py-16 md:py-24">
      <div
        aria-hidden="true"
        className="halftone pointer-events-none absolute inset-y-0 right-0 w-[34%] opacity-40"
      />

      <div className="relative z-10 mx-auto max-w-site px-6 md:px-10">
        <header className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-label text-label-caps uppercase text-blue">Why Hacky Nation</p>
            <h2 className="mt-2 max-w-xl font-display text-display-xl uppercase text-ink">
              Made by hand.
              <br />
              <span className="text-blue">Not by machine.</span>
            </h2>
          </div>
          <Seal variant="yellow" burst lines={['SINCE', '2025']} className="rotate-[-8deg]" />
        </header>

        <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
          {POINTS.map((point) => (
            <li key={point.n} className="border-t-2 border-ink pt-5">
              <p className="font-display text-3xl text-blue">{point.n}</p>
              <h3 className="mt-2 font-display text-display-md uppercase text-ink">
                {point.title}
              </h3>
              <p className="mt-2 max-w-sm font-body text-body-md text-ink-soft">{point.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
