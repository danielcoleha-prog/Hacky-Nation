import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../lib/CartContext';

const LINKS = [
  { label: 'Shop', to: '/#shop' },
  { label: 'Custom', to: '/custom' },
  { label: 'Story', to: '/#why' },
  { label: 'Community', to: '/#community' },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count, openCart } = useCart();
  const { pathname, hash } = useLocation();

  useEffect(() => setMenuOpen(false), [pathname, hash]);

  /* The bar gains its rule and shadow only once you've left the top, so the
     hero meets the nav cleanly on first paint. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 bg-paper/95 backdrop-blur-sm transition-shadow duration-200 ${
        scrolled ? 'border-b-2 border-ink shadow-[0_4px_0_0_rgba(20,17,13,0.08)]' : 'border-b-2 border-ink/0'
      }`}
    >
      <div className="mx-auto flex max-w-site items-center justify-between gap-6 px-5 py-3 md:px-8">
        <Link to="/" className="group flex items-center gap-3" aria-label="Hacky Nation — home">
          <span className="grid h-11 w-11 place-content-center rounded-full bg-ink transition-transform duration-200 group-hover:-rotate-6">
            <img src="/img/logo.webp" alt="" width={38} height={38} className="h-[38px] w-[38px] object-contain" />
          </span>
          <span
            className="font-display text-[15px] uppercase leading-none text-ink"
            style={{ fontVariationSettings: "'wght' 900, 'wdth' 92", letterSpacing: '-0.01em' }}
          >
            Hacky
            <br />
            Nation
          </span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="group relative block py-1 font-display text-label-caps uppercase text-ink"
                  style={{ fontVariationSettings: "'wght' 700, 'wdth' 105" }}
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 h-[2px] w-0 bg-blue transition-all duration-200 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openCart}
            className="group relative flex h-11 items-center gap-2 border-2 border-ink bg-paper px-3.5 transition-all duration-150 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-press-sm"
            aria-label={`Open cart, ${count} item${count === 1 ? '' : 's'}`}
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              shopping_bag
            </span>
            <span
              className="font-display text-label-caps tabular-nums"
              style={{ fontVariationSettings: "'wght' 800, 'wdth' 100" }}
            >
              {count}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="grid h-11 w-11 place-content-center border-2 border-ink bg-paper lg:hidden"
            aria-label="Menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              {menuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Mobile"
        className={`overflow-hidden border-t-2 border-ink bg-paper transition-[max-height] duration-300 lg:hidden ${
          menuOpen ? 'max-h-96' : 'max-h-0 border-t-0'
        }`}
      >
        <ul className="flex flex-col px-5 py-2">
          {LINKS.map((link, i) => (
            <li key={link.label} className={i ? 'border-t border-ink/12' : ''}>
              <Link
                to={link.to}
                className="flex items-center justify-between py-3.5 font-display text-display-sm uppercase text-ink"
              >
                {link.label}
                <span className="material-symbols-outlined text-blue" aria-hidden="true">
                  arrow_outward
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
