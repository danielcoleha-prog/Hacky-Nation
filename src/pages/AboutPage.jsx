import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../lib/useReveal';
import SectionHeading from '../components/SectionHeading';
import CartoonButton from '../components/ui/CartoonButton';

/**
 * Full story page. Every prose block is an explicit placeholder sized to the
 * real copy, so dropping the wording in later won't reflow the page.
 */
const BLOCKS = [
  { heading: 'How it started', hint: 'The origin — when, where, and what prompted it.' },
  { heading: 'How they are made', hint: 'Materials, panel construction, and what makes the feel right.' },
  { heading: 'Where it is going', hint: 'What is next — new colorways, collabs, the circle.' },
];

export default function AboutPage() {
  useReveal(['about']);

  useEffect(() => {
    window.scrollTo(0, 0);
    const previous = document.title;
    document.title = 'Our story — Hacky Nation';
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

        <SectionHeading as="h1" kicker="About Hacky Nation" title="Our story" mis="blue" />

        <div className="mt-10 border-2 border-dashed border-ink/35 bg-paper-deep px-6 py-10 md:px-12 md:py-16">
          <p className="label text-ink-faint">Story placeholder</p>
          <p className="mt-4 max-w-prose font-body text-body-lg text-ink-soft">
            Replace this with the opening of the real story. This block is sized
            for a few paragraphs of intro before the sections below.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {BLOCKS.map((block) => (
            <section key={block.heading} className="reveal border-2 border-ink bg-paper p-6 shadow-press-sm">
              <h2 className="font-display text-display-md text-ink">{block.heading}</h2>
              <p className="mt-3 font-body text-body-md text-ink-soft">{block.hint}</p>
              <p className="mt-4 label text-ink-faint">Placeholder</p>
            </section>
          ))}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="reveal flex aspect-[4/3] items-center justify-center border-2 border-dashed border-ink/35 bg-paper-deep text-center"
            >
              <div>
                <span className="material-symbols-outlined text-[30px] text-ink-faint" aria-hidden="true">
                  add_a_photo
                </span>
                <p className="mt-2 label text-ink-faint">Photo placeholder</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-4">
          <CartoonButton to="/shop" label="Shop the lineup" color="bg-blue" />
          <Link to="/custom" className="btn-secondary">Build your own</Link>
        </div>
      </div>
    </main>
  );
}
