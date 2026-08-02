import SectionHeading from './SectionHeading';
import Seal from './Seal';

/* Stills lifted from the existing hero frame sequence — real photos of the
   product in play, standing in until dedicated lifestyle shots exist. */
const SHOTS = [
  { file: 'f_006', caption: 'Sunset circle' },
  { file: 'f_022', caption: 'First stall' },
  { file: 'f_041', caption: 'Beach session' },
  { file: 'f_058', caption: 'Kick it around' },
  { file: 'f_070', caption: 'Golden hour' },
];

export default function Community() {
  return (
    <section
      id="community"
      className="relative overflow-hidden border-t-2 border-ink bg-paper-deep py-16 md:py-24"
    >
      <div className="mx-auto max-w-site px-5 md:px-8">
        <SectionHeading
          index="04"
          kicker="The nation"
          title="@hacky_nation"
          mis="blue"
          aside="Tag us and you might end up on the wall."
        />
      </div>

      <div className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 md:px-8 lg:mt-16">
        {SHOTS.map((shot, i) => (
          <figure
            key={shot.file}
            className="reveal group relative w-[16rem] shrink-0 snap-start border-2 border-ink bg-paper transition-transform duration-200 hover:-translate-y-1 sm:w-[21rem]"
            style={{ transform: `rotate(${i % 2 ? 0.8 : -0.9}deg)` }}
          >
            <div className="overflow-hidden border-b-2 border-ink">
              <img
                src={`/lifestyle/${shot.file}.jpg`}
                alt="Hacky Nation footbags in play"
                width={640}
                height={360}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
              />
            </div>
            <figcaption className="flex items-center justify-between gap-3 px-4 py-3">
              <span className="label text-ink">{shot.caption}</span>
              <span className="material-symbols-outlined text-[18px] text-blue" aria-hidden="true">
                favorite
              </span>
            </figcaption>

            {i === 0 && (
              <Seal
                variant="yellow"
                burst
                size="sm"
                lines={['IN THE', 'WILD']}
                className="absolute -right-3 -top-3 rotate-[12deg]"
              />
            )}
          </figure>
        ))}

        {/* follow card closes the rail */}
        <a
          href="https://www.instagram.com/hacky_nation"
          target="_blank"
          rel="noopener noreferrer"
          className="reveal grid w-[16rem] shrink-0 snap-start place-content-center border-2 border-ink bg-blue px-6 text-center text-paper transition-transform duration-200 hover:-translate-y-1 sm:w-[21rem]"
        >
          <span className="material-symbols-outlined mx-auto text-[34px]" aria-hidden="true">
            photo_camera
          </span>
          <span className="mt-3 block font-display text-display-md">Follow along</span>
          <span className="mt-1.5 block font-body text-body-sm text-paper/75">
            @hacky_nation on Instagram
          </span>
        </a>
      </div>
    </section>
  );
}
