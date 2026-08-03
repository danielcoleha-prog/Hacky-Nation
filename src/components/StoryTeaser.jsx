import SectionHeading from './SectionHeading';
import CartoonButton from './ui/CartoonButton';

/**
 * Short story block on the landing page, linking through to /about.
 *
 * Body copy is an explicit placeholder — it occupies the same footprint the
 * real writing will, so replacing it won't move anything around it.
 */
export default function StoryTeaser() {
  return (
    <section id="story" aria-labelledby="story-heading" className="paper-grain relative bg-paper">
      <div className="relative mx-auto max-w-site px-5 py-16 md:px-8 md:py-24">
        <SectionHeading kicker="Our story" title="Where this came from" id="story-heading" mis="blue" />

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="reveal">
            <div className="border-2 border-dashed border-ink/35 bg-paper-deep px-6 py-10 md:px-10 md:py-14">
              <p className="label text-ink-faint">Story placeholder</p>
              <p className="mt-4 max-w-prose font-body text-body-lg text-ink-soft">
                Replace this with the real story — how Hacky Nation started, who
                is behind it, and why the sacks are made the way they are. Two or
                three short paragraphs will fill this block without changing the
                layout around it.
              </p>
              <p className="mt-4 max-w-prose font-body text-body-md text-ink-faint">
                The same copy can carry over to the full About page, with more
                room for detail and photos.
              </p>
            </div>

            <div className="mt-7">
              <CartoonButton to="/about" label="Read the full story" color="bg-blue" />
            </div>
          </div>

          <div className="reveal flex items-center justify-center border-2 border-dashed border-ink/35 bg-paper-deep p-10 text-center">
            <div>
              <span className="material-symbols-outlined text-[34px] text-ink-faint" aria-hidden="true">
                add_a_photo
              </span>
              <p className="mt-3 label text-ink-faint">Story image placeholder</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
