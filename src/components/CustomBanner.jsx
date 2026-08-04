import { Link } from 'react-router-dom';
import Seal from './Seal';
import FadingSack from './ui/FadingSack';

const STEPS = [
  { n: '01', label: 'Pick a pattern' },
  { n: '02', label: 'Pick your colors' },
  { n: '03', label: 'Add your patch' },
];

export default function CustomBanner() {
  return (
    <section id="custom" className="relative overflow-hidden bg-ink py-16 text-paper md:py-24">
      {/* Narrow on small screens — the copy runs full width there, and the dots
          crossing behind it wreck legibility. */}
      <div
        aria-hidden="true"
        className="halftone pointer-events-none absolute inset-y-0 right-0 w-[20%] opacity-50 md:w-[46%] md:opacity-70"
        style={{ '--dot': '#F2E9D8' }}
      />
      {/* A translucent yellow disc over near-black just reads as olive sludge —
          a thin outlined ring keeps the geometry without muddying the ink. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -left-16 aspect-square w-72 rounded-full border-2 border-red/30"
      />

      <div className="relative z-10 mx-auto grid max-w-site items-center gap-12 px-5 md:px-8 lg:grid-cols-[1fr_0.85fr]">
        <div className="reveal">
          <p className="eyebrow text-red">Custom orders</p>

          <h2 className="mt-4 font-display text-display-xl text-paper">
            <span
              className="overprint block"
              data-text="Build your"
              style={{ '--mis-color': 'var(--press-blue)' }}
            >
              Build your
            </span>
            <span
              className="overprint block text-red"
              data-text="own sack"
              style={{ '--mis-color': 'var(--press-red)' }}
            >
              own sack
            </span>
          </h2>

          <p className="mt-6 max-w-md font-body text-body-lg text-paper/70">
            Team orders, event drops, one-offs. Pick your panels, colors and center
            patch — we'll quote it by hand and send a mockup before anything is made.
          </p>

          <ol className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
            {STEPS.map((step) => (
              <li key={step.n} className="flex items-baseline gap-2.5">
                <span
                  className="font-display text-display-sm text-blue-light"
                >
                  {step.n}
                </span>
                <span className="label text-paper/80">{step.label}</span>
              </li>
            ))}
          </ol>

          <Link
            to="/custom"
            className="btn mt-9 border-paper bg-paper text-ink hover:-translate-x-[2px] hover:-translate-y-[2px]"
            style={{ boxShadow: '3px 3px 0 0 var(--press-blue)' }}
          >
            Start a custom
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="reveal relative grid place-content-center">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 aspect-square w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-paper/25"
          />
          {/* The sack itself is the obvious thing to click here, so it is a
              real link to the builder rather than decoration. */}
          <Link
            to="/custom"
            aria-label="Build your own custom sack"
            className="group relative mx-auto block w-full max-w-[340px]"
          >
            <FadingSack className="animate-bobble transition-transform duration-300 group-hover:scale-[1.04]" />
          </Link>
          <Seal
            variant="red"
            burst
            size="lg"
            lines={['MAKE IT', 'YOURS']}
            className="absolute -bottom-2 left-0 rotate-[-12deg]"
          />
        </div>
      </div>
    </section>
  );
}
