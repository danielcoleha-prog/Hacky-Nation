import { useEffect, useRef } from 'react';

/**
 * Pointer-driven parallax. Writes normalised --px / --py (roughly -1..1) onto
 * the returned ref's element; children opt in via `.parallax-layer` plus a
 * `--depth` value.
 *
 * The listener is never attached on coarse pointers or when the user has asked
 * for reduced motion — it's not merely zeroed out.
 */
export function useParallax() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const optingOut = window.matchMedia(
      '(pointer: coarse), (prefers-reduced-motion: reduce)'
    );
    if (optingOut.matches) return;

    let frame = 0;
    let px = 0;
    let py = 0;

    const apply = () => {
      frame = 0;
      el.style.setProperty('--px', px.toFixed(4));
      el.style.setProperty('--py', py.toFixed(4));
    };

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      px = (e.clientX - r.left) / r.width - 0.5;
      py = (e.clientY - r.top) / r.height - 0.5;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      px = 0;
      py = 0;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    el.addEventListener('pointermove', onMove, { passive: true });
    el.addEventListener('pointerleave', onLeave, { passive: true });

    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return ref;
}
