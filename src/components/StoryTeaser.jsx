import SectionHeading from './SectionHeading';
import CartoonButton from './ui/CartoonButton';

/** Short story block on the landing page, linking through to /about. */
export default function StoryTeaser() {
  return (
    <section id="story" aria-labelledby="story-heading" className="paper-grain relative bg-paper">
      <div className="relative mx-auto max-w-site px-5 py-16 md:px-8 md:py-24">
        <SectionHeading title="The Hacky Nation story" id="story-heading" />

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div className="reveal">
            <p className="max-w-prose font-body text-body-lg text-ink-soft">
              Harrison and Pete started Hacky Nation in April of 2026, right as
              circles began to form all over the US in high schools and colleges.
              They built Hacky Nation with the goal of bringing together people
              from all over, and came up with their motto:{' '}
              <span className="font-semibold text-ink">Play with your sack.</span>
            </p>

            <div className="mt-7">
              <CartoonButton to="/about" label="Read the full story" color="bg-blue" />
            </div>
          </div>

          <figure className="reveal relative">
            <img
              src="/img/story/founders.webp"
              alt="Harrison and Pete, the founders of Hacky Nation"
              width={1400}
              height={1400}
              loading="lazy"
              decoding="async"
              className="w-full border-2 border-ink object-cover shadow-press"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
