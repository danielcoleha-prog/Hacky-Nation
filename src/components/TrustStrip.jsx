/**
 * Short ink band bridging the hero and the lineup.
 *
 * The three claim blurbs are gone — the section is now purely a colour
 * transition, fading the hero's cream down into the ink the lineup sits on.
 * It also no longer draws a torn bottom edge: the lineup begins on the same
 * ink, so any rip here would just reintroduce a cream seam between two black
 * sections.
 */
export default function TrustStrip() {
  return (
    <section aria-hidden="true" className="relative bg-paper">
      {/* Only below lg — at lg and up the hero poster already ends in its own
          black torn edge, and two stacked rips read as a mistake. */}
      <div className="torn-top h-6 w-full lg:hidden" style={{ backgroundColor: '#0B0C0E' }} />

      {/* The hero poster's torn edge is baked-in neutral black (#0B0C0E), but
          the site's ink is midnight navy — butting them together shows a hard
          seam. This band is the transition: it starts on the art's exact black
          and resolves into navy before the lineup begins. */}
      <div
        className="relative h-20 w-full overflow-hidden md:h-24"
        style={{ backgroundImage: 'linear-gradient(to bottom, #0B0C0E 0%, #0D1119 45%, var(--press-ink) 100%)' }}
      >
        <div
          className="dotfield pointer-events-none absolute inset-0 opacity-[0.14]"
          style={{ '--dot': '#F2E9D8' }}
        />
      </div>
    </section>
  );
}
