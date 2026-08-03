import SectionHeading from './SectionHeading';

/* Keep this list in sync with the FAQPage JSON-LD in index.html. */
const FAQS = [
  {
    q: 'What is a hacky sack?',
    a: "A hacky sack — also called a foot bag or footbag — is a small round bag kicked and kept in the air using only your feet. Played solo or in a circle with friends, it's one of the most social outdoor sports around. No stadium required.",
  },
  {
    q: "What's the best hacky sack to buy?",
    a: "Hacky Nation foot bags are handcrafted one at a time with unique patterns and colors — no two are exactly alike. They're durable, balanced, and built for real players.",
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
    a: 'Right here. Hacky Nation sells handmade suede foot bags and limited edition drops shipped across the US.',
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="relative border-t-2 border-ink bg-paper-deep py-16 md:py-24">
      <div className="mx-auto max-w-site px-5 md:px-8">
        <SectionHeading
          kicker="Questions"
          title="Frequently asked"
          mis="blue"
          aside="Still stuck? buyhackynation@gmail.com"
        />

        <div className="mx-auto mt-12 max-w-3xl lg:mt-16">
          {FAQS.map((item, i) => (
            <details
              key={item.q}
              className="reveal group border-b-2 border-ink first:border-t-2 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-center gap-5 py-5">
                <span
                  className="font-display text-label-caps text-blue"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="flex-1 font-display text-display-md text-ink">{item.q}</span>
                <span
                  className="material-symbols-outlined shrink-0 text-ink transition-transform duration-300 group-open:rotate-45"
                  aria-hidden="true"
                >
                  add
                </span>
              </summary>
              <p className="max-w-2xl pb-6 pl-[3.1rem] font-body text-body-md text-ink-soft">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
