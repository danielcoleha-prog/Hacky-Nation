const MESSAGES = [
  '★ NEW DROP · USASackLeague × Hacky Nation Pro Sack — $20',
  '⬤ Handmade in the USA',
  '★ 2+ sacks — $15 each',
  '⚡ Secure checkout · Stripe verified',
];

export default function AnnouncementBar() {
  return (
    <div className="overflow-hidden border-b-2 border-ink bg-blue text-paper">
      {/* Duplicated once so the -50% translate loops seamlessly. */}
      <div className="flex w-max animate-marquee gap-12 py-2.5">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex gap-12" aria-hidden={copy === 1}>
            {MESSAGES.map((msg) => (
              <span
                key={msg}
                className="whitespace-nowrap font-label text-label-caps uppercase"
              >
                {msg}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
