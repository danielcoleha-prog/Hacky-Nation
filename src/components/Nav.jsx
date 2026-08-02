import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../lib/CartContext';

const LINKS = [
  { label: 'Shop', to: '/#shop' },
  { label: 'Custom', to: '/custom' },
  { label: 'About', to: '/#why' },
  { label: 'Community', to: '/#community' },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, openCart } = useCart();
  const { pathname, hash } = useLocation();

  /* Close the drawer whenever the route changes. */
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname, hash]);

  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-site items-center justify-between gap-4 px-6 py-3 md:px-10">
        {/* The logo art is white-on-transparent, so it rides on an ink badge —
            which is also how the mark appears in the brand reference. */}
        <Link to="/" className="flex items-center gap-2" aria-label="Hacky Nation — home">
          <span className="grid h-12 w-12 place-content-center rounded-full bg-ink">
            <img
              src="/img/logo.webp"
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
          </span>
          <span className="sr-only">Hacky Nation</span>
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-9">
            {LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="font-label text-label-caps uppercase text-ink transition-colors hover:text-blue"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={openCart}
            className="relative grid h-11 w-11 place-content-center text-ink transition-colors hover:text-blue"
            aria-label={`Open cart, ${count} item${count === 1 ? '' : 's'}`}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              shopping_bag
            </span>
            {count > 0 && (
              <span className="absolute right-1 top-1 grid h-5 w-5 place-content-center rounded-full bg-red font-label text-[10px] font-bold text-paper">
                {count}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="grid h-11 w-11 place-content-center text-ink md:hidden"
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

      {/* mobile drawer */}
      <nav
        id="mobile-nav"
        aria-label="Mobile"
        className={`overflow-hidden border-t-2 border-ink transition-[max-height] duration-300 md:hidden ${
          menuOpen ? 'max-h-96' : 'max-h-0 border-t-0'
        }`}
      >
        <ul className="flex flex-col px-6 py-2">
          {LINKS.map((link) => (
            <li key={link.label}>
              <Link
                to={link.to}
                className="block py-3 font-label text-label-lg uppercase text-ink"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
