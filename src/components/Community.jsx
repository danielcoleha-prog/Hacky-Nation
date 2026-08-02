import Seal from './Seal';

/* Stills lifted from the existing hero frame sequence — real photos of the
   product in play, standing in until dedicated lifestyle shots exist. */
const SHOTS = ['f_006', 'f_022', 'f_041', 'f_058', 'f_070'];

export default function Community() {
  return (
    <section id="community" className="border-b-2 border-ink bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-site px-6 md:px-10">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-label text-label-caps uppercase text-blue">The Nation</p>
            <h2 className="mt-2 font-display text-display-xl uppercase text-ink">
              @hacky_nation
            </h2>
          </div>
          <a
            href="https://www.instagram.com/hacky_nation"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Follow
            <span aria-hidden="true">→</span>
          </a>
        </header>
      </div>

      <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 md:px-10">
        {SHOTS.map((shot, i) => (
          <figure
            key={shot}
            className="relative w-64 shrink-0 snap-start border-2 border-ink bg-paper-deep sm:w-80"
          >
            <img
              src={`/lifestyle/${shot}.jpg`}
              alt="Hacky Nation footbags in play"
              width={640}
              height={360}
              loading="lazy"
              decoding="async"
              className="aspect-video w-full object-cover"
            />
            {i === 0 && (
              <Seal
                variant="yellow"
                burst
                lines={['IN THE', 'WILD']}
                className="absolute -bottom-3 -right-3 rotate-[10deg]"
              />
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}
