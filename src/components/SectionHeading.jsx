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
  /* `as="h1"` for a page's primary heading — sections default to h2 so a page
     that leads with this component isn't left without an h1. */
  as: Tag = 'h2',
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
            >
              {index}
            </span>
          )}

          <div>
            {kicker && <p className="eyebrow mb-2.5">{kicker}</p>}
            <Tag id={id} className="font-display text-display-xl text-ink">
              <span className="overprint" data-text={title} style={{ '--mis-color': misColor }}>
                {title}
              </span>
            </Tag>
          </div>
        </div>

        {aside && (
          <p className="label max-w-[15rem] leading-[1.7] text-ink-soft sm:text-right">{aside}</p>
        )}
      </div>
    </header>
  );
}
