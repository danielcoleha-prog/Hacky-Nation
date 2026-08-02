import { useEffect } from 'react';

/**
 * Adds `.in` to every `.reveal` as it scrolls into view, once.
 * Runs page-wide from the app root and re-scans when the route changes, so
 * sections mounted later still animate.
 *
 * Under prefers-reduced-motion the CSS already renders `.reveal` at rest, so
 * this quietly does nothing.
 */
export function useReveal(deps = []) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const targets = document.querySelectorAll('.reveal:not(.in)');
    if (!targets.length) return;

    /* Only now is it safe to hide anything — see the .reveals-armed rules. */
    document.documentElement.classList.add('reveals-armed');

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 }
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
