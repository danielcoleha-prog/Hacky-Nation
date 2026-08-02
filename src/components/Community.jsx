import SectionHeading from './SectionHeading';
import Seal from './Seal';

/**
 * There is exactly one real lifestyle shot available (a frame from the hero
 * sequence), so this is built around it rather than tiling five crops of the
 * same image into a fake UGC wall — that reads as filler immediately. One
 * honest photograph plus a real invitation to post does more.
 */
const STATS = [
  { value: '3K+', label: 'Followers' },
  { value: '48', label: 'States' },
  { value: '1000s', label: 'Kicks daily' },
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

        <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-[1.35fr_0.65fr]">
          {/* the one real photo, framed at close to native resolution */}
          <figure className="reveal relative border-2 border-ink bg-ink shadow-press">
            <img
              src="/lifestyle/beach-lineup.webp"
              alt="Four Hacky Nation suede footbags lined up on the sand at the beach"
              width={1000}
              height={562}
              loading="lazy"
              decoding="async"
              className="aspect-[16/9] w-full object-cover"
            />
            <figcaption className="flex items-center justify-between gap-4 border-t-2 border-ink bg-paper px-5 py-3.5">
              <span className="label text-ink">The lineup, in the wild</span>
              <span className="label text-ink-faint">Haddonfield, NJ</span>
            </figcaption>

            <Seal
              variant="yellow"
              burst
              size="md"
              lines={['IN THE', 'WILD']}
              className="absolute -right-4 -top-5 rotate-[12deg]"
            />
          </figure>

          {/* invitation panel */}
          <div className="reveal flex flex-col justify-between border-2 border-ink bg-ink p-7 text-paper shadow-press">
            <div className="relative">
              <div
                aria-hidden="true"
                className="dotfield pointer-events-none absolute -inset-7 opacity-[0.12]"
                style={{ '--dot': '#F2E9D8' }}
              />
              <div className="relative">
                <p className="eyebrow text-yellow">Get featured</p>
                <p className="mt-4 font-display text-display-md text-paper">
                  Post your circle. Tag us.
                </p>
                <p className="mt-3 font-body text-body-md text-paper/65">
                  We repost the best ones every week — sessions, stalls, festival
                  circles, wherever your sack ends up.
                </p>
              </div>
            </div>

            <dl className="my-7 grid grid-cols-3 gap-px border-2 border-paper/25 bg-paper/25">
              {STATS.map((s) => (
                <div key={s.label} className="bg-ink px-2 py-3 text-center">
                  <dd
                    className="font-display text-[1.35rem] leading-none text-paper"
                    style={{ fontVariationSettings: "'wght' 900, 'wdth' 92" }}
                  >
                    {s.value}
                  </dd>
                  <dt className="label mt-1.5 text-[10px] text-paper/55">{s.label}</dt>
                </div>
              ))}
            </dl>

            <a
              href="https://www.instagram.com/hacky_nation"
              target="_blank"
              rel="noopener noreferrer"
              className="btn w-full border-paper bg-paper text-ink transition-all hover:-translate-x-[2px] hover:-translate-y-[2px]"
              style={{ boxShadow: '3px 3px 0 0 var(--press-blue)' }}
            >
              Follow @hacky_nation
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
