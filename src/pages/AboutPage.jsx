import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../lib/useReveal';
import SectionHeading from '../components/SectionHeading';
import CartoonButton from '../components/ui/CartoonButton';

/* Each chapter pairs a photo with the moment it documents. Images alternate
   sides at lg so the page reads as a sequence rather than a grid. */
const CHAPTERS = [
  {
    heading: 'How it started',
    image: '/img/story/started.webp',
    alt: 'Early custom Hacky Nation sacks made for our school',
    body: [
      'We started by making custom sacks for our own school — a few at a time, by hand, for the people already standing in the circle with us.',
      'Word travelled the way it always does at that age: someone sees yours, asks where you got it, and suddenly you are taking orders at lunch.',
    ],
  },
  {
    heading: 'How they are made',
    image: '/img/story/orders.webp',
    alt: 'Packing Hacky Nation orders after launching the website',
    body: [
      'We then built a website and got orders. Demand took off faster than we expected, and we leveled up from a first run of knit sacks to a full line of hand-stitched suede footbags.',
      'Patriot. Sunset. Sky. Bulldawgs. Each one built to get kicked around for years, not tossed in a drawer after a week.',
    ],
  },
  {
    heading: 'Where it is going',
    image: '/img/story/going.webp',
    alt: 'A Hacky Nation circle in the wild',
    body: [
      'Along the way we linked up with players, affiliates, and creators who believed the same thing we did — that this is bigger than a trend.',
      'It is a way to bring people together, in person, off their phones, into a circle.',
    ],
  },
];

export default function AboutPage() {
  useReveal(['about']);

  useEffect(() => {
    window.scrollTo(0, 0);
    const previous = document.title;
    document.title = 'The Hacky Nation story';
    return () => { document.title = previous; };
  }, []);

  return (
    <main className="paper-grain relative bg-paper">
      <div className="relative z-10 mx-auto max-w-site px-5 py-10 md:px-8 md:py-14">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 label text-ink-faint">
            <li><Link to="/" className="transition-colors hover:text-blue">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-ink">Story</li>
          </ol>
        </nav>

        <SectionHeading as="h1" title="The Hacky Nation story" />

        {/* ---------- opening ---------- */}
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div className="reveal">
            <p className="font-display text-display-lg text-ink">It started with a circle</p>

            <div className="mt-5 space-y-4 font-body text-body-lg text-ink-soft">
              <p>
                In April of 2026, something was happening in parking lots, quads,
                and courtyards all over the country. Somewhere between classes, at
                lunch, after practice — kids were standing in circles again,
                kicking a little bag back and forth and losing track of time.
              </p>
              <p>
                Hacky sack was back. Not as a throwback, but as something brand new
                to a whole generation discovering it for the first time.
              </p>
              <p>
                Harrison and Pete were right in the middle of it. Two friends who
                saw the circles forming in their own high schools and colleges,
                spreading from one group to the next, city to city, campus to
                campus. It wasn't about being the best. It was about the crew that
                showed up — the stranger who got pulled in for a few kicks and left
                as a friend, the way a single sack could turn a boring afternoon
                into the best part of the day.
              </p>
              <p className="font-semibold text-ink">So they decided to build something around it.</p>
            </div>
          </div>

          <figure className="reveal">
            <img
              src="/img/story/founders.webp"
              alt="Harrison and Pete, the founders of Hacky Nation"
              width={1400}
              height={1400}
              fetchPriority="high"
              decoding="async"
              className="w-full border-2 border-ink object-cover shadow-press"
            />
          </figure>
        </div>

        {/* ---------- chapters ---------- */}
        <div className="mt-16 flex flex-col gap-14 md:mt-24 md:gap-20">
          {CHAPTERS.map((chapter, i) => (
            <section
              key={chapter.heading}
              className="reveal grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-14"
            >
              <figure className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <img
                  src={chapter.image}
                  alt={chapter.alt}
                  width={1400}
                  height={1050}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full border-2 border-ink object-cover shadow-press"
                />
              </figure>

              <div>
                <h2 className="font-display text-display-lg text-ink">{chapter.heading}</h2>
                <div className="mt-4 space-y-3 font-body text-body-lg text-ink-soft">
                  {chapter.body.map((para) => (
                    <p key={para.slice(0, 24)}>{para}</p>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* ---------- why ---------- */}
        <section className="reveal mt-16 border-t-2 border-ink pt-10 md:mt-24">
          <h2 className="font-display text-display-lg text-ink">Why we made Hacky Nation</h2>
          <div className="mt-5 max-w-prose space-y-4 font-body text-body-lg text-ink-soft">
            <p>
              The name came before almost anything else, because it said exactly
              what we were after: not a brand, a nation. A community of players from
              everywhere — every school, every town, every skill level — connected
              by the same simple thing kicked around the same kind of circle.
            </p>
          </div>
        </section>

        {/* ---------- motto ---------- */}
        <section className="reveal relative mt-14 overflow-hidden border-2 border-ink bg-ink px-6 py-12 text-center shadow-press md:px-12 md:py-16">
          <div
            aria-hidden="true"
            className="dotfield pointer-events-none absolute inset-0 opacity-[0.10]"
            style={{ '--dot': '#F2E9D8' }}
          />
          <div className="relative">
            <h2 className="font-display text-display-xl text-paper">
              <span
                className="overprint"
                data-text="Play with your sack"
                style={{ '--mis-color': 'var(--press-red)', '--mis-x': '-4px', '--mis-y': '4px' }}
              >
                Play with your sack
              </span>
            </h2>
            <div className="mx-auto mt-6 max-w-xl space-y-4 font-body text-body-lg text-paper/70">
              <p>
                That's our motto, and yeah, we know it makes you smile — that's the
                point. Hacky sack was never supposed to be serious. It's supposed to
                be fun, a little goofy, and open to anyone willing to give it a kick.
              </p>
              <p>
                So whether you're draining stalls like a pro or just trying to get
                one clean touch before it hits the ground, you're one of us now.
                Grab a sack. Find your circle.
              </p>
              <p className="font-semibold text-paper">Welcome to Hacky Nation.</p>
            </div>
          </div>
        </section>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <CartoonButton to="/shop" label="Shop the lineup" color="bg-blue" />
          <Link to="/custom" className="btn-secondary">Build your own</Link>
        </div>
      </div>
    </main>
  );
}
