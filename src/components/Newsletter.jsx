import { useState } from 'react';
import Seal from './Seal';

/**
 * Netlify Forms under an SPA: Netlify only detects forms in static HTML at
 * build time, so the real declaration lives in public/__forms.html and this
 * component posts urlencoded to that path. Field names must match it exactly.
 */
export default function Newsletter() {
  const [status, setStatus] = useState('idle'); // idle | sending | done | error
  const [email, setEmail] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');

    const body = new URLSearchParams({ 'form-name': 'newsletter', email, 'bot-field': '' });

    try {
      const res = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      setStatus(res.ok ? 'done' : 'error');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section
      id="newsletter"
      className="relative overflow-hidden border-t-2 border-ink bg-blue py-16 text-paper md:py-24"
    >
      <div
        aria-hidden="true"
        className="dotfield pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{ '--dot': '#F2E9D8' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 aspect-square w-72 rounded-full border-2 border-paper/25"
      />

      {/* Anchored to the section, not the narrow centred column — inside the
          column it floated into the middle of the blue. */}
      <Seal
        variant="yellow"
        burst
        size="md"
        lines={['NO', 'SPAM']}
        className="absolute bottom-8 right-6 rotate-[-14deg] md:bottom-12 md:right-16"
      />

      <div className="relative z-10 mx-auto max-w-2xl px-5 text-center md:px-8">
        <p className="eyebrow text-yellow">Newsletter</p>

        <h2 className="mt-4 font-display text-display-xl text-paper">
          <span
            className="overprint"
            data-text="Join the circle."
            style={{ '--mis-color': 'var(--press-ink)', '--mis-x': '4px', '--mis-y': '4px' }}
          >
            Join the circle.
          </span>
        </h2>

        <p className="mx-auto mt-5 max-w-md font-body text-body-lg text-paper/75">
          Drop alerts, restocks and the occasional discount code. No spam, ever.
        </p>

        {status === 'done' ? (
          <p
            role="status"
            className="mt-9 inline-flex items-center gap-3 border-2 border-ink bg-paper px-6 py-4 font-display text-display-sm uppercase text-blue shadow-press"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              check_circle
            </span>
            You're in. Welcome to the nation.
          </p>
        ) : (
          <form
            onSubmit={onSubmit}
            className="mx-auto mt-9 flex max-w-lg flex-col gap-3 sm:flex-row"
            name="newsletter"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              autoComplete="email"
              className="min-w-0 flex-1 border-2 border-ink bg-paper px-4 py-3.5 font-body text-body-md text-ink placeholder:text-ink-faint focus:outline-none focus:ring-0"
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn border-ink bg-ink text-paper shadow-[3px_3px_0_0_#F2E9D8] transition-all hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[5px_5px_0_0_#F2E9D8] disabled:opacity-60"
            >
              {status === 'sending' ? 'Joining…' : 'Join'}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p role="alert" className="mt-4 label text-yellow">
            Something went wrong — try again, or email buyhackynation@gmail.com
          </p>
        )}
      </div>
    </section>
  );
}
