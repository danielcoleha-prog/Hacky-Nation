import { useEffect, useState } from 'react';

/**
 * Cross-fades through a set of images in place. Used to show past custom
 * builds on the landing banner and the custom page.
 *
 * `images` is a list of { src, alt }. With none supplied it renders labelled
 * placeholder panels so the layout is final before the photography is —
 * swap the array for real files and nothing else needs to change.
 *
 * Cycling is driven by an interval rather than staggered CSS animation delays
 * so the count can change without retuning keyframe percentages. It pauses
 * entirely for prefers-reduced-motion, which leaves the first frame showing.
 */
export default function FadingGallery({
  images = [],
  interval = 3200,
  className = '',
  placeholderCount = 4,
  label = 'Custom build',
}) {
  const items = images.length
    ? images
    : Array.from({ length: placeholderCount }, (_, i) => ({
        placeholder: true,
        alt: `${label} ${i + 1}`,
      }));

  const [active, setActive] = useState(0);

  useEffect(() => {
    if (items.length < 2) return undefined;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;

    const id = setInterval(() => setActive((i) => (i + 1) % items.length), interval);
    return () => clearInterval(id);
  }, [items.length, interval]);

  const TONES = ['var(--press-blue)', 'var(--press-red)', '#2F6F4E', '#7A4BC4', '#C4622F'];

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {items.map((item, i) => (
        <div
          key={item.src || i}
          className="absolute inset-0 transition-opacity duration-[900ms] ease-in-out"
          style={{ opacity: i === active ? 1 : 0 }}
          aria-hidden={i !== active}
        >
          {item.placeholder ? (
            <div
              className="flex h-full w-full flex-col items-center justify-center gap-2 px-4 text-center"
              style={{ backgroundColor: TONES[i % TONES.length] }}
            >
              <span className="material-symbols-outlined text-[30px] text-paper/70" aria-hidden="true">
                add_a_photo
              </span>
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.08em] text-paper/85">
                {item.alt}
              </span>
            </div>
          ) : (
            <img
              src={item.src}
              alt={item.alt}
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
              className="h-full w-full object-cover"
            />
          )}
        </div>
      ))}

      {items.length > 1 && (
        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
          {items.map((item, i) => (
            <span
              key={item.src || i}
              aria-hidden="true"
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? 'w-5 bg-paper' : 'w-1.5 bg-paper/45'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
