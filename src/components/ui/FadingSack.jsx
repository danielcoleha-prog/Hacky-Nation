import { useEffect, useState } from 'react';
import { CUSTOM_MOCKUPS } from '../../lib/products';

/**
 * Cross-fades between past custom builds in place, keeping the floating-cutout
 * treatment (drop shadow, bobble) rather than framing them in a box.
 *
 * All frames are stacked absolutely inside a square so the container never
 * resizes between images; the first one is duplicated as a static, invisible
 * spacer to give that square its intrinsic height without a fixed pixel value.
 *
 * Holds on the first frame under prefers-reduced-motion.
 */
export default function FadingSack({
  images = CUSTOM_MOCKUPS,
  interval = 2800,
  className = '',
  imgClassName = '',
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (images.length < 2) return undefined;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = setInterval(() => setActive((i) => (i + 1) % images.length), interval);
    return () => clearInterval(id);
  }, [images.length, interval]);

  const shadow = { filter: 'drop-shadow(0 26px 30px rgba(0,0,0,0.5))' };

  return (
    <div className={`relative ${className}`}>
      {/* spacer — establishes the box, never seen */}
      <img
        src={images[0].src}
        alt=""
        aria-hidden="true"
        width={900}
        height={900}
        className={`invisible h-auto w-full ${imgClassName}`}
      />

      {images.map((img, i) => (
        <img
          key={img.src}
          src={img.src}
          alt={i === active ? img.alt : ''}
          width={900}
          height={900}
          loading={i === 0 ? 'eager' : 'lazy'}
          decoding="async"
          aria-hidden={i !== active}
          className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-[900ms] ease-in-out ${imgClassName}`}
          style={{ ...shadow, opacity: i === active ? 1 : 0 }}
        />
      ))}
    </div>
  );
}
