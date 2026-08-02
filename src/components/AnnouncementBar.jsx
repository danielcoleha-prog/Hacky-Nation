const MESSAGES = [
  { icon: '★', text: 'New drop — USASackLeague × Hacky Nation Pro Sack' },
  { icon: '●', text: 'Handmade in the USA' },
  { icon: '✦', text: '2 or more sacks — $15 each' },
  { icon: '⚡', text: 'Secure checkout · Stripe verified' },
  { icon: '◆', text: 'Free US shipping over $30' },
];

export default function AnnouncementBar() {
  return (
    <div className="relative overflow-hidden border-b-2 border-ink bg-ink text-paper">
      {/* Duplicated once so the -50% translate loops seamlessly. */}
      <div className="flex w-max animate-marquee py-2.5">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex" aria-hidden={copy === 1}>
            {MESSAGES.map((msg) => (
              <span key={msg.text} className="flex items-center whitespace-nowrap px-7">
                <span className="mr-3 text-yellow" aria-hidden="true">
                  {msg.icon}
                </span>
                <span className="label text-[11px] tracking-[0.2em]">{msg.text}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
