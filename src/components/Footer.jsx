import { Link } from 'react-router-dom';
import { SACKS } from '../lib/products';

export default function Footer() {
  return (
    <footer className="relative border-t-2 border-ink bg-ink text-paper">
      <div className="mx-auto max-w-site px-6 py-14 md:px-10 md:py-20">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-display text-display-lg uppercase leading-none">
              Play With Your <span className="text-blue-light">Sack.</span>
            </p>
            <p className="mt-4 max-w-sm font-body text-body-md text-paper/70">
              Handmade suede footbags built for good times. Made one at a time in
              Haddonfield, New Jersey.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://www.instagram.com/hacky_nation"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-paper/30 px-4 py-2 font-label text-label-caps uppercase transition-colors hover:border-blue-light hover:text-blue-light"
              >
                Instagram
              </a>
              <a
                href="https://www.pinterest.com/hackynation"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-paper/30 px-4 py-2 font-label text-label-caps uppercase transition-colors hover:border-blue-light hover:text-blue-light"
              >
                Pinterest
              </a>
            </div>
          </div>

          <nav aria-label="Shop">
            <h2 className="font-label text-label-caps uppercase text-yellow">Shop</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {SACKS.map((sack) => (
                <li key={sack.id}>
                  <Link
                    to={`/sacks/${sack.id}`}
                    className="font-body text-body-md text-paper/70 transition-colors hover:text-paper"
                  >
                    {sack.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/custom" className="font-body text-body-md text-paper/70 transition-colors hover:text-paper">
                  Build Your Own
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Help">
            <h2 className="font-label text-label-caps uppercase text-yellow">Help</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              <li>
                <a href="/returns.html" className="font-body text-body-md text-paper/70 transition-colors hover:text-paper">
                  Returns
                </a>
              </li>
              <li>
                <a href="/pre-order-policy.html" className="font-body text-body-md text-paper/70 transition-colors hover:text-paper">
                  Pre-order Policy
                </a>
              </li>
              <li>
                <a href="/wholesale-catalog.html" className="font-body text-body-md text-paper/70 transition-colors hover:text-paper">
                  Wholesale
                </a>
              </li>
              <li>
                <a href="/#faq" className="font-body text-body-md text-paper/70 transition-colors hover:text-paper">
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="mailto:buyhackynation@gmail.com"
                  className="font-body text-body-md text-paper/70 transition-colors hover:text-paper"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t-2 border-paper/15 pt-6">
          <p className="font-label text-label-caps uppercase text-paper/50">
            © {new Date().getFullYear()} Hacky Nation
          </p>
          <p className="font-label text-label-caps uppercase text-paper/50">
            Handmade in the USA · Secure checkout by Stripe
          </p>
        </div>
      </div>
    </footer>
  );
}
