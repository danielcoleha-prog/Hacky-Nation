import { Link } from 'react-router-dom';
import { SACKS } from '../lib/products';

const HELP = [
  { label: 'Returns', href: '/returns.html' },
  { label: 'Pre-order policy', href: '/pre-order-policy.html' },
  { label: 'Wholesale', href: '/wholesale-catalog.html' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contact', href: 'mailto:buyhackynation@gmail.com' },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t-2 border-ink bg-ink text-paper">
      <div
        aria-hidden="true"
        className="dotfield pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{ '--dot': '#F2E9D8' }}
      />

      <div className="relative mx-auto max-w-site px-5 py-14 md:px-8 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.8fr_0.8fr]">
          <div>
            <Link to="/" className="inline-flex items-center gap-3" aria-label="Hacky Nation — home">
              <span className="grid h-12 w-12 place-content-center rounded-full bg-paper">
                <img src="/img/logo.webp" alt="" width={40} height={40} className="h-10 w-10 object-contain invert" />
              </span>
              <span className="font-display text-display-md text-paper">Hacky Nation</span>
            </Link>

            <p className="mt-6 max-w-sm font-body text-body-md text-paper/60">
              Handmade suede footbags built for good times. Cut, stitched and packed
              one at a time in Haddonfield, New Jersey.
            </p>

            <div className="mt-7 flex gap-3">
              {[
                { label: 'Instagram', href: 'https://www.instagram.com/hacky_nation' },
                { label: 'Pinterest', href: 'https://www.pinterest.com/hackynation' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-paper/30 px-4 py-2.5 font-display text-label-caps uppercase transition-colors duration-150 hover:border-yellow hover:text-yellow"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Shop">
            <h2 className="eyebrow text-yellow">Shop</h2>
            <ul className="mt-5 flex flex-col gap-3">
              {SACKS.map((sack) => (
                <li key={sack.id}>
                  <Link
                    to={`/sacks/${sack.id}`}
                    className="group inline-flex items-center gap-2 font-body text-body-md text-paper/65 transition-colors hover:text-paper"
                  >
                    {sack.name}
                    <span className="opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/custom"
                  className="group inline-flex items-center gap-2 font-body text-body-md text-paper/65 transition-colors hover:text-paper"
                >
                  Build your own
                  <span className="opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Help">
            <h2 className="eyebrow text-yellow">Help</h2>
            <ul className="mt-5 flex flex-col gap-3">
              {HELP.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="font-body text-body-md text-paper/65 transition-colors hover:text-paper"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* oversized wordmark, cropped by the footer edge */}
        <div aria-hidden="true" className="pointer-events-none mt-16 overflow-hidden">
          <p
            className="whitespace-nowrap font-display leading-[0.78] text-paper/[0.07]"
            style={{ fontSize: 'clamp(4rem, 16vw, 13rem)', fontVariationSettings: "'wght' 900, 'wdth' 88" }}
          >
            Play with your sack.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t-2 border-paper/15 pt-6">
          <p className="label text-paper/45">© {new Date().getFullYear()} Hacky Nation</p>
          <p className="label text-paper/45">Handmade in the USA · Secure checkout by Stripe</p>
        </div>
      </div>
    </footer>
  );
}
