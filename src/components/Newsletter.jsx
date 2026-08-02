import { useState } from 'react';

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

    const body = new URLSearchParams({
      'form-name': 'newsletter',
      email,
      'bot-field': '',
    });

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
    <section id="newsletter" className="relative overflow-hidden border-b-2 border-ink bg-blue py-16 text-paper md:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-10 aspect-square w-64 rounded-full bg-yellow/25"
      />

      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center md:px-10">
        <h2 className="font-display text-display-xl uppercase">Join The Circle.</h2>
        <p className="mx-auto mt-3 max-w-md font-body text-body-lg text-paper/80">
          Drop alerts, restocks, and the occasional discount code. No spam, ever.
        </p>

        {status === 'done' ? (
          <p
            role="status"
            className="mt-8 inline-block border-2 border-paper bg-paper px-6 py-4 font-label text-label-lg uppercase text-blue"
          >
            You're in. Welcome to the nation.
          </p>
        ) : (
          <form
            onSubmit={onSubmit}
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
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
              className="min-w-0 flex-1 border-2 border-paper bg-paper px-4 py-3.5 font-body text-body-md text-ink placeholder:text-ink-soft/60 focus:outline-none"
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              className="border-2 border-ink bg-ink px-7 py-3.5 font-label text-label-lg uppercase text-paper transition-colors hover:bg-paper hover:text-ink disabled:opacity-60"
            >
              {status === 'sending' ? 'Joining…' : 'Join'}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p role="alert" className="mt-4 font-label text-label-caps uppercase text-yellow">
            Something went wrong — try again, or email buyhackynation@gmail.com
          </p>
        )}
      </div>
    </section>
  );
}
