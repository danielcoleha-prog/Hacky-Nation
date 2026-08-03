import React from 'react';

/**
 * Diagonal marquee wall — rotated rows of cards scrolling in alternating
 * directions, with the top and bottom feathered out.
 *
 * Adapted from the supplied Great UI component (MIT) for this codebase: JSX
 * rather than TSX, no `cn()` helper, and the fades use the site's paper cream
 * instead of white/neutral-950 so the band dissolves into the page.
 *
 * `cards` entries are { id, url, title }. Placeholder cards render as flat
 * tinted panels with their title, so the layout is real before the photos are.
 */

const PLACEHOLDER_CARDS = [
  { id: 'p1', title: 'Custom · Team colors', tone: 'var(--press-blue)' },
  { id: 'p2', title: 'Custom · Split panel', tone: 'var(--press-red)' },
  { id: 'p3', title: 'Custom · Two-tone', tone: '#2F6F4E' },
  { id: 'p4', title: 'Custom · Monogram', tone: 'var(--press-ink)' },
  { id: 'p5', title: 'Custom · Fade', tone: '#7A4BC4' },
  { id: 'p6', title: 'Custom · Stripe', tone: '#C4622F' },
];

function Card({ card, cardClassName = '' }) {
  const isPlaceholder = !card.url;

  return (
    <div
      className={`group relative h-[190px] w-[260px] shrink-0 overflow-hidden rounded-xl border-2 border-ink shadow-press-sm md:h-[230px] md:w-[320px] ${cardClassName}`}
      style={isPlaceholder ? { backgroundColor: card.tone || 'var(--press-ink)' } : undefined}
    >
      {isPlaceholder ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-4 text-center">
          <span className="material-symbols-outlined text-[26px] text-paper/70" aria-hidden="true">
            add_a_photo
          </span>
          <span className="font-body text-[11px] font-semibold uppercase tracking-[0.08em] text-paper/85">
            {card.title}
          </span>
        </div>
      ) : (
        <>
          <img src={card.url} alt={card.title} loading="lazy" decoding="async" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-ink/25" />
        </>
      )}
    </div>
  );
}

function MarqueeRow({ cards, speed, direction, cardClassName }) {
  const animationClass = direction === -1 ? 'animate-marquee-left' : 'animate-marquee-right';

  return (
    <div className="flex w-full overflow-hidden">
      <div
        className={`flex shrink-0 hover:[animation-play-state:paused] ${animationClass}`}
        style={{ '--speed': `${speed}s` }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
            {cards.map((card, idx) => (
              <div key={`${card.id}-${idx}-${copy}`} className="shrink-0 pr-6">
                <Card card={card} cardClassName={cardClassName} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DiagonalMarqueeCarousel({
  cards = PLACEHOLDER_CARDS,
  angle = -25,
  baseSpeed = 120,
  alternateDirections = true,
  className = '',
  cardClassName = '',
  fadeClassName = '',
}) {
  const rowCards = [...cards, ...cards];
  const rowCardsReverse = [...rowCards].reverse();

  const rows = [
    { cards: rowCards, speed: baseSpeed, dir: -1 },
    { cards: rowCardsReverse, speed: Math.max(baseSpeed - 15, 30), dir: alternateDirections ? 1 : -1 },
    { cards: rowCards, speed: baseSpeed + 15, dir: -1 },
    { cards: rowCardsReverse, speed: Math.max(baseSpeed - 6, 35), dir: alternateDirections ? 1 : -1 },
  ];

  return (
    <div className={`relative flex w-full items-center justify-center overflow-hidden ${className}`}>
      <div
        className="absolute z-0 flex w-[220vw] flex-col gap-6"
        style={{ transform: `rotate(${angle}deg)` }}
      >
        {rows.map((row, i) => (
          <MarqueeRow
            key={i}
            cards={row.cards}
            speed={row.speed}
            direction={row.dir}
            cardClassName={cardClassName}
          />
        ))}
      </div>

      <div
        className={`pointer-events-none absolute inset-x-0 top-0 z-10 h-1/4 bg-gradient-to-b from-paper to-transparent ${fadeClassName}`}
      />
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/4 bg-gradient-to-t from-paper to-transparent ${fadeClassName}`}
      />
    </div>
  );
}
