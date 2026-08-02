/* Keep this list in sync with the FAQPage JSON-LD in index.html. */
const FAQS = [
  {
    q: 'What is a hacky sack?',
    a: "A hacky sack — also called a foot bag or footbag — is a small round bag kicked and kept in the air using only your feet. Played solo or in a circle with friends, it's one of the most social outdoor sports around. No stadium required.",
  },
  {
    q: "What's the best hacky sack to buy?",
    a: 'Hacky Nation hand knit foot bags are handcrafted one at a time with unique patterns and colors — no two are exactly alike. They\'re durable, balanced, and built for real players.',
  },
  {
    q: 'What is the difference between a hacky sack and a footbag?',
    a: 'Two names for the same thing. Footbag is the official sport term, hacky sack is the popular slang name. Both refer to the small bag you kick to keep in the air.',
  },
  {
    q: 'How do you play hacky sack?',
    a: 'Stand in a circle with friends and take turns kicking the foot bag to keep it off the ground using only your feet. The goal is to keep it in the air as long as possible without using your hands.',
  },
  {
    q: 'Where can I buy a hacky sack online?',
    a: 'Right here. Hacky Nation sells hand knit foot bags and limited edition hacky sack drops shipped across the US.',
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="border-b-2 border-ink bg-paper-deep py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <header className="mb-10 text-center">
          <p className="font-label text-label-caps uppercase text-blue">Questions</p>
          <h2 className="mt-2 font-display text-display-xl uppercase text-ink">
            Frequently Asked
          </h2>
        </header>

        <div className="flex flex-col gap-3">
          {FAQS.map((item) => (
            <details
              key={item.q}
              className="group border-2 border-ink bg-paper px-5 py-4 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <span className="font-label text-label-lg uppercase text-ink">{item.q}</span>
                <span
                  className="material-symbols-outlined shrink-0 text-blue transition-transform group-open:rotate-45"
                  aria-hidden="true"
                >
                  add
                </span>
              </summary>
              <p className="mt-3 font-body text-body-md text-ink-soft">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
