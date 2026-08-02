import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Seal from '../components/Seal';

const PATTERNS = [
  { id: 'flower', label: 'Flower', panels: 32 },
  { id: 'classic', label: 'Classic', panels: 14 },
  { id: 'wave', label: 'Wave', panels: 32 },
  { id: 'pinwheel', label: 'Pinwheel', panels: 14 },
];

const COLORS = [
  { id: 'blue', label: 'Blue', hex: '#1B4FC4' },
  { id: 'red', label: 'Red', hex: '#D23C2B' },
  { id: 'yellow', label: 'Yellow', hex: '#F0A81B' },
  { id: 'black', label: 'Black', hex: '#16130E' },
  { id: 'green', label: 'Green', hex: '#2E7D4F' },
  { id: 'sky', label: 'Sky', hex: '#6FB7E8' },
  { id: 'pink', label: 'Pink', hex: '#E07BA8' },
  { id: 'cream', label: 'Cream', hex: '#F1E8DA' },
];

const PATCHES = [
  { id: 'hacky-nation', label: 'Hacky Nation' },
  { id: 'custom-text', label: 'Custom Text' },
  { id: 'none', label: 'No Patch' },
];

export default function CustomPage() {
  const [pattern, setPattern] = useState(PATTERNS[0].id);
  const [colors, setColors] = useState(['blue', 'red']);
  const [patch, setPatch] = useState(PATCHES[0].id);
  const [text, setText] = useState('');
  const [qty, setQty] = useState('1-5');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    window.scrollTo(0, 0);
    const previous = document.title;
    document.title = 'Build Your Own Sack — Hacky Nation';
    return () => {
      document.title = previous;
    };
  }, []);

  function toggleColor(id) {
    setColors((current) =>
      current.includes(id)
        ? current.filter((c) => c !== id)
        : current.length >= 3
          ? current
          : [...current, id]
    );
  }

  const activePattern = PATTERNS.find((p) => p.id === pattern);
  const swatches = colors.map((id) => COLORS.find((c) => c.id === id)).filter(Boolean);

  async function onSubmit(e) {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');

    const body = new URLSearchParams({
      'form-name': 'custom-sack',
      'bot-field': '',
      email,
      pattern: activePattern.label,
      panels: String(activePattern.panels),
      colors: swatches.map((c) => c.label).join(', '),
      patch: PATCHES.find((p) => p.id === patch).label,
      'patch-text': patch === 'custom-text' ? text : '',
      quantity: qty,
      notes,
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
    <main className="paper-grain relative bg-paper">
      <div className="relative z-10 mx-auto max-w-site px-6 py-10 md:px-10 md:py-16">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 font-label text-label-caps uppercase text-ink-soft">
            <li>
              <Link to="/" className="hover:text-blue">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-ink">Build Your Own</li>
          </ol>
        </nav>

        <header className="mb-12 max-w-2xl">
          <p className="font-label text-label-caps uppercase text-blue">Custom Orders</p>
          <h1 className="mt-3 font-display text-display-xl uppercase text-ink">
            Build Your Own
          </h1>
          <p className="mt-4 font-body text-body-lg text-ink-soft">
            Spec your sack below and we'll come back with a quote and a timeline.
            Customs are quoted by hand — pricing depends on panel count, colors, and
            how many you need.
          </p>
        </header>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* ---------- preview ---------- */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative grid aspect-square place-content-center overflow-hidden border-2 border-ink bg-paper-deep">
              <div
                aria-hidden="true"
                className="absolute aspect-square w-[64%] rounded-full transition-colors duration-300"
                style={{ backgroundColor: swatches[0]?.hex || '#1B4FC4', opacity: 0.3 }}
              />
              <img
                src="/img/products/patriot-sack.webp"
                alt="Reference photo of a Hacky Nation suede footbag"
                width={700}
                height={700}
                decoding="async"
                className="relative z-10 h-auto w-[74%] justify-self-center object-contain drop-shadow-cut"
              />
              <Seal
                variant="red"
                burst
                lines={['MAKE IT', 'YOURS']}
                className="absolute bottom-4 left-4 rotate-[-10deg]"
              />
            </div>

            {/* The photo is a reference, not a render — say so plainly. */}
            <p className="mt-3 font-body text-body-md text-ink-soft">
              Reference photo. Your spec is summarised below — we'll send a real mockup
              with your quote.
            </p>

            <dl className="mt-5 border-2 border-ink bg-paper p-5">
              <div className="flex justify-between gap-4 border-b-2 border-ink/10 pb-2">
                <dt className="font-label text-label-caps uppercase text-ink-soft">Pattern</dt>
                <dd className="font-label text-label-lg uppercase text-ink">
                  {activePattern.label} · {activePattern.panels} panels
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-b-2 border-ink/10 py-2">
                <dt className="font-label text-label-caps uppercase text-ink-soft">Colors</dt>
                <dd className="flex gap-1.5">
                  {swatches.length ? (
                    swatches.map((c) => (
                      <span
                        key={c.id}
                        title={c.label}
                        className="h-6 w-6 border-2 border-ink"
                        style={{ backgroundColor: c.hex }}
                      />
                    ))
                  ) : (
                    <span className="font-label text-label-caps uppercase text-ink-soft">
                      Pick up to 3
                    </span>
                  )}
                </dd>
              </div>
              <div className="flex justify-between gap-4 pt-2">
                <dt className="font-label text-label-caps uppercase text-ink-soft">Patch</dt>
                <dd className="font-label text-label-lg uppercase text-ink">
                  {patch === 'custom-text' && text ? `“${text}”` : PATCHES.find((p) => p.id === patch).label}
                </dd>
              </div>
            </dl>
          </div>

          {/* ---------- configurator ---------- */}
          {status === 'done' ? (
            <div className="border-2 border-ink bg-blue p-8 text-paper">
              <h2 className="font-display text-display-lg uppercase">Request sent.</h2>
              <p className="mt-3 font-body text-body-lg text-paper/85">
                We'll get back to you at {email} with a quote and a mockup, usually
                within a couple of days.
              </p>
              <Link to="/" className="btn mt-6 border-paper bg-paper text-ink hover:bg-ink hover:text-paper hover:border-ink">
                Back To Shop
              </Link>
            </div>
          ) : (
            <form onSubmit={onSubmit} name="custom-sack" className="flex flex-col gap-8">
              <fieldset>
                <legend className="font-display text-display-md uppercase text-ink">
                  1. Choose your pattern
                </legend>
                <div className="mt-3 flex flex-wrap gap-3">
                  {PATTERNS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPattern(p.id)}
                      aria-pressed={pattern === p.id}
                      className={`border-2 px-4 py-3 text-left transition-colors ${
                        pattern === p.id
                          ? 'border-blue bg-blue text-paper'
                          : 'border-ink/25 text-ink hover:border-ink'
                      }`}
                    >
                      <span className="block font-label text-label-lg uppercase">{p.label}</span>
                      <span className="block font-label text-label-caps uppercase opacity-70">
                        {p.panels} panels
                      </span>
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="font-display text-display-md uppercase text-ink">
                  2. Choose your colors
                </legend>
                <p className="mt-1 font-body text-body-md text-ink-soft">Pick up to three.</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  {COLORS.map((c) => {
                    const on = colors.includes(c.id);
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => toggleColor(c.id)}
                        aria-pressed={on}
                        aria-label={c.label}
                        title={c.label}
                        className={`h-11 w-11 rounded-full border-2 transition-all ${
                          on
                            ? 'border-ink ring-2 ring-blue ring-offset-2 ring-offset-paper'
                            : 'border-ink/25 hover:border-ink'
                        }`}
                        style={{ backgroundColor: c.hex }}
                      />
                    );
                  })}
                </div>
              </fieldset>

              <fieldset>
                <legend className="font-display text-display-md uppercase text-ink">
                  3. Center patch
                </legend>
                <div className="mt-3 flex flex-wrap gap-3">
                  {PATCHES.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPatch(p.id)}
                      aria-pressed={patch === p.id}
                      className={`border-2 px-5 py-3 font-label text-label-lg uppercase transition-colors ${
                        patch === p.id
                          ? 'border-blue bg-blue text-paper'
                          : 'border-ink/25 text-ink hover:border-ink'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                {patch === 'custom-text' && (
                  <div className="mt-4">
                    <label
                      htmlFor="patch-text"
                      className="font-label text-label-caps uppercase text-ink-soft"
                    >
                      Patch text
                    </label>
                    <input
                      id="patch-text"
                      type="text"
                      maxLength={18}
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="YOUR TEXT"
                      className="mt-2 w-full max-w-sm border-2 border-ink bg-paper px-4 py-3 font-body text-body-md text-ink focus:outline-none"
                    />
                  </div>
                )}
              </fieldset>

              <fieldset>
                <legend className="font-display text-display-md uppercase text-ink">
                  4. How many?
                </legend>
                <div className="mt-3 flex flex-wrap gap-3">
                  {['1-5', '6-25', '26-100', '100+'].map((range) => (
                    <button
                      key={range}
                      type="button"
                      onClick={() => setQty(range)}
                      aria-pressed={qty === range}
                      className={`border-2 px-5 py-3 font-label text-label-lg uppercase transition-colors ${
                        qty === range
                          ? 'border-blue bg-blue text-paper'
                          : 'border-ink/25 text-ink hover:border-ink'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="font-display text-display-md uppercase text-ink">
                  5. Your details
                </legend>

                <label htmlFor="custom-email" className="mt-3 block font-label text-label-caps uppercase text-ink-soft">
                  Email
                </label>
                <input
                  id="custom-email"
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="mt-2 w-full max-w-md border-2 border-ink bg-paper px-4 py-3 font-body text-body-md text-ink focus:outline-none"
                />

                <label htmlFor="custom-notes" className="mt-4 block font-label text-label-caps uppercase text-ink-soft">
                  Anything else?
                </label>
                <textarea
                  id="custom-notes"
                  name="notes"
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Team name, deadline, logo files…"
                  className="mt-2 w-full border-2 border-ink bg-paper px-4 py-3 font-body text-body-md text-ink focus:outline-none"
                />
              </fieldset>

              {status === 'error' && (
                <p role="alert" className="border-2 border-red bg-red/10 px-4 py-3 font-body text-body-md text-red-deep">
                  Couldn't send that — try again, or email buyhackynation@gmail.com directly.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending' || !colors.length}
                className="btn-blue w-full disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'sending' ? 'Sending…' : 'Request A Quote'}
              </button>

              <p className="font-body text-body-md text-ink-soft">
                Customs are quoted individually, so this sends a request rather than
                charging you now.
              </p>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
