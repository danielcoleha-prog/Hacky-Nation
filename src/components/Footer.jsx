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
              Handmade suede footbags built for good times.
            </p>

            <ul className="mt-6 flex flex-col gap-2">
              <li>
                <a
                  href="mailto:buyhackynation@gmail.com"
                  className="inline-flex items-center gap-2.5 font-body text-body-md text-paper/75 transition-colors hover:text-paper"
                >
                  <span className="material-symbols-outlined text-[18px] text-red" aria-hidden="true">mail</span>
                  buyhackynation@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+18566569491"
                  className="inline-flex items-center gap-2.5 font-body text-body-md text-paper/75 transition-colors hover:text-paper"
                >
                  <span className="material-symbols-outlined text-[18px] text-red" aria-hidden="true">call</span>
                  856-656-9491
                </a>
              </li>
            </ul>

            <div className="mt-7 flex gap-3">
              {[
                { label: 'Instagram', href: 'https://www.instagram.com/hacky_nation' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-paper/30 px-4 py-2.5 font-display text-label-caps uppercase transition-colors duration-150 hover:border-red hover:text-red"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Shop">
            <h2 className="eyebrow text-red">Shop</h2>
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
            <h2 className="eyebrow text-red">Help</h2>
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

        {/* Oversized wordmark. Sized in cqw against the footer's own width so
            the whole sentence always fits — at a viewport-based clamp the line
            ran past the right edge and "your sack." was cut off. */}
        <div
          aria-hidden="true"
          className="pointer-events-none mt-16 w-full"
          style={{ containerType: 'inline-size' }}
        >
          <p
            className="whitespace-nowrap font-display leading-[0.82] text-paper/[0.07]"
            style={{ fontSize: 'min(9.6cqw, 13rem)' }}
          >
            Play with your sack
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t-2 border-paper/15 pt-6">
          <p className="label text-paper/45">© {new Date().getFullYear()} Hacky Nation</p>
          <p className="label text-paper/45">Secure checkout by Stripe</p>
        </div>
      </div>
    </footer>
  );
}
