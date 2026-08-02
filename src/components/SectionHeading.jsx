/**
 * Catalog-style section header: a numeral and kicker sitting on a hard rule,
 * with the heading set in the display cut and a misregistered colour ghost
 * behind it. Used by every section so the page reads as one printed object.
 */
export default function SectionHeading({
  index,
  kicker,
  title,
  aside,
  id,
  mis = 'red',
  className = '',
}) {
  const misColor = {
    red: 'var(--press-red)',
    blue: 'var(--press-blue)',
    yellow: 'var(--press-yellow)',
  }[mis];

  return (
    <header className={`reveal rule pt-5 ${className}`}>
      <div className="flex flex-wrap items-start justify-between gap-x-8 gap-y-4">
        <div className="flex items-start gap-4 sm:gap-6">
          {index && (
            <span
              aria-hidden="true"
              className="font-display text-display-sm text-blue"
              style={{ fontVariationSettings: "'wght' 800, 'wdth' 100" }}
            >
              {index}
            </span>
          )}

          <div>
            {kicker && <p className="eyebrow mb-2.5">{kicker}</p>}
            <h2 id={id} className="font-display text-display-xl text-ink">
              <span className="overprint" data-text={title} style={{ '--mis-color': misColor }}>
                {title}
              </span>
            </h2>
          </div>
        </div>

        {aside && (
          <p className="label max-w-[15rem] leading-[1.7] text-ink-soft sm:text-right">{aside}</p>
        )}
      </div>
    </header>
  );
}
