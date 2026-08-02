import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * React Router doesn't act on hash fragments by itself. This scrolls to
 * #shop / #faq / etc. after navigation, and to the top when there's no hash.
 */
export default function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    // Wait a frame so the target section has mounted.
    const id = requestAnimationFrame(() => {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    return () => cancelAnimationFrame(id);
  }, [pathname, hash]);

  return null;
}
