import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Seal from '../components/Seal';
import FadingSack from '../components/ui/FadingSack';

/* Panel count is the only construction choice — the old "pattern" names were
   really just panel counts wearing different labels. */
const PANEL_OPTIONS = [
  { id: '14', label: '14 panels', panels: 14, hint: 'Softer, easier to stall' },
  { id: '32', label: '32 panels', panels: 32, hint: 'Rounder and tighter, more responsive' },
];

const COLORS = [
  { id: 'blue', label: 'Blue', hex: '#1B4FC4' },
  { id: 'red', label: 'Red', hex: '#D23C2B' },
  { id: 'yellow', label: 'Yellow', hex: '#F0A81B' },
  { id: 'orange', label: 'Orange', hex: '#D2661B' },
  { id: 'purple', label: 'Purple', hex: '#7A4BC4' },
  { id: 'teal', label: 'Teal', hex: '#1F8A8A' },
  { id: 'maroon', label: 'Maroon', hex: '#8C2233' },
  { id: 'navy', label: 'Navy', hex: '#152452' },
  { id: 'black', label: 'Black', hex: '#16130E' },
  { id: 'green', label: 'Green', hex: '#2E7D4F' },
  { id: 'sky', label: 'Sky', hex: '#6FB7E8' },
  { id: 'pink', label: 'Pink', hex: '#E07BA8' },
  { id: 'cream', label: 'Cream', hex: '#F1E8DA' },
];

/* Customs run in batches, so the smallest order we can quote is 10. */
export const CUSTOM_MIN_QTY = 10;
const QTY_RANGES = ['10-25', '26-50', '51-100', '100+'];

const PATCHES = [
  { id: 'hacky-nation', label: 'Hacky Nation' },
  { id: 'custom-logo', label: 'Your Logo' },
  { id: 'none', label: 'No Patch' },
];

const LOGO_TYPES = 'image/png,image/jpeg,image/svg+xml';
const LOGO_MAX_BYTES = 5 * 1024 * 1024;

export default function CustomPage() {
  const [panelChoice, setPanelChoice] = useState(PANEL_OPTIONS[1].id);
  const [colors, setColors] = useState(['blue', 'red']);
  const [patch, setPatch] = useState(PATCHES[0].id);
  const [logo, setLogo] = useState(null);
  const [logoError, setLogoError] = useState('');
  const [qty, setQty] = useState(QTY_RANGES[0]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
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

  const activePanels = PANEL_OPTIONS.find((p) => p.id === panelChoice);
  const swatches = colors.map((id) => COLORS.find((c) => c.id === id)).filter(Boolean);

  async function onSubmit(e) {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');

    const body = new URLSearchParams({
      'form-name': 'custom-sack',
      'bot-field': '',
      name,
      email,
      phone,
      pattern: activePanels.label,
      panels: String(activePanels.panels),
      colors: swatches.map((c) => c.label).join(', '),
      patch: PATCHES.find((p) => p.id === patch).label,
      'patch-logo': patch === 'custom-logo' && logo ? logo.name : '',
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
          <ol className="flex items-center gap-2 label text-ink-soft">
            <li>
              <Link to="/" className="hover:text-blue">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-ink">Build Your Own</li>
          </ol>
        </nav>

        <header className="mb-12 max-w-2xl">
          <p className="eyebrow">Custom Orders</p>
          <h1 className="mt-3 font-display text-display-xl text-ink">
            Build your own
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
            <div className="relative flex aspect-square items-center justify-center overflow-hidden border-2 border-ink bg-paper-deep shadow-press">
              <div aria-hidden="true" className="dotfield pointer-events-none absolute inset-0 opacity-[0.13]" />
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 aspect-square w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-300"
                style={{ backgroundColor: swatches[0]?.hex || '#1B4FC4', opacity: 0.26 }}
              />
              <FadingSack className="relative z-10 mx-auto w-[74%]" />
              <Seal
                variant="red"
                burst
                size="md"
                lines={['MAKE IT', 'YOURS']}
                className="absolute bottom-5 left-5 rotate-[-10deg]"
              />
            </div>

            {/* These are real builds, not a render of the current spec. */}
            <p className="mt-3 font-body text-body-md text-ink-soft">
              Customs we have made. Your spec is summarised below — we'll send a real
              mockup with your quote.
            </p>

            <dl className="mt-5 card p-5">
              <div className="flex justify-between gap-4 border-b-2 border-ink/10 pb-2">
                <dt className="label text-ink-soft">Panels</dt>
                <dd className="font-display text-label-lg uppercase text-ink">
                  {activePanels.label}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-b-2 border-ink/10 py-2">
                <dt className="label text-ink-soft">Colors</dt>
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
                    <span className="label text-ink-soft">
                      Pick up to 3
                    </span>
                  )}
                </dd>
              </div>
              <div className="flex justify-between gap-4 pt-2">
                <dt className="label text-ink-soft">Patch</dt>
                <dd className="font-display text-label-lg uppercase text-ink">
                  {patch === 'custom-logo' && logo ? logo.name : PATCHES.find((p) => p.id === patch).label}
                </dd>
              </div>
            </dl>
          </div>

          {/* ---------- configurator ---------- */}
          {status === 'done' ? (
            <div className="border-2 border-ink bg-blue p-8 text-paper">
              <h2 className="font-display text-display-lg">Request sent</h2>
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
                <legend className="font-display text-display-md text-ink">
                  Choose your panels
                </legend>
                <div className="mt-3 flex flex-wrap gap-3">
                  {PANEL_OPTIONS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPanelChoice(p.id)}
                      aria-pressed={panelChoice === p.id}
                      className={`border-2 px-5 py-3 text-left transition-colors ${
                        panelChoice === p.id
                          ? 'border-blue bg-blue text-paper'
                          : 'border-ink/30 text-ink hover:border-ink'
                      }`}
                    >
                      <span className="block font-display text-label-lg uppercase">{p.label}</span>
                      <span className="block label opacity-70">{p.hint}</span>
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="font-display text-display-md text-ink">
                  Choose your colors
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
                            : 'border-ink/30 hover:border-ink'
                        }`}
                        style={{ backgroundColor: c.hex }}
                      />
                    );
                  })}
                </div>
              </fieldset>

              <fieldset>
                <legend className="font-display text-display-md text-ink">
                  Center patch
                </legend>
                <div className="mt-3 flex flex-wrap gap-3">
                  {PATCHES.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPatch(p.id)}
                      aria-pressed={patch === p.id}
                      className={`border-2 px-5 py-3 font-display text-label-lg uppercase transition-colors ${
                        patch === p.id
                          ? 'border-blue bg-blue text-paper'
                          : 'border-ink/30 text-ink hover:border-ink'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                {patch === 'custom-logo' && (
                  <div className="mt-4">
                    <label htmlFor="patch-logo" className="label text-ink-soft">
                      Upload your logo
                    </label>

                    <input
                      id="patch-logo"
                      type="file"
                      accept={LOGO_TYPES}
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        if (!file) { setLogo(null); setLogoError(''); return; }
                        if (file.size > LOGO_MAX_BYTES) {
                          setLogo(null);
                          setLogoError('That file is over 5MB — send a smaller one.');
                          return;
                        }
                        setLogo(file);
                        setLogoError('');
                      }}
                      className="mt-2 block w-full max-w-sm cursor-pointer border-2 border-ink bg-paper px-4 py-3 font-body text-body-md text-ink file:mr-4 file:cursor-pointer file:border-0 file:bg-ink file:px-3 file:py-1.5 file:font-body file:text-[12px] file:font-bold file:uppercase file:tracking-[0.06em] file:text-paper focus:outline-none"
                    />

                    <p className="mt-2 font-body text-body-sm text-ink-faint">
                      PNG, JPG or SVG, up to 5MB. A transparent PNG works best.
                    </p>

                    {logoError && (
                      <p role="alert" className="mt-2 label text-red">{logoError}</p>
                    )}

                    {logo && (
                      <p className="mt-2 flex items-center gap-2 font-body text-body-sm text-ink-soft">
                        <span className="material-symbols-outlined text-[17px] text-blue" aria-hidden="true">
                          check_circle
                        </span>
                        {logo.name}
                      </p>
                    )}
                  </div>
                )}
              </fieldset>

              <fieldset>
                <legend className="font-display text-display-md text-ink">
                  How many
                </legend>
                <p className="mt-1 font-body text-body-md text-ink-soft">
                  Customs are made in batches — {CUSTOM_MIN_QTY} is the minimum order.
                </p>
                <div className="mt-3 flex flex-wrap gap-3">
                  {QTY_RANGES.map((range) => (
                    <button
                      key={range}
                      type="button"
                      onClick={() => setQty(range)}
                      aria-pressed={qty === range}
                      className={`border-2 px-5 py-3 font-display text-label-lg uppercase transition-colors ${
                        qty === range
                          ? 'border-blue bg-blue text-paper'
                          : 'border-ink/30 text-ink hover:border-ink'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="font-display text-display-md text-ink">
                  Your details
                </legend>

                <label htmlFor="custom-name" className="mt-3 block label text-ink-soft">
                  Name
                </label>
                <input
                  id="custom-name"
                  type="text"
                  name="name"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="mt-2 w-full max-w-md border-2 border-ink bg-paper px-4 py-3 font-body text-body-md text-ink focus:outline-none"
                />

                <label htmlFor="custom-email" className="mt-4 block label text-ink-soft">
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

                <label htmlFor="custom-phone" className="mt-4 block label text-ink-soft">
                  Phone <span className="opacity-60">(optional)</span>
                </label>
                <input
                  id="custom-phone"
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="856-656-9491"
                  className="mt-2 w-full max-w-md border-2 border-ink bg-paper px-4 py-3 font-body text-body-md text-ink focus:outline-none"
                />

                <label htmlFor="custom-notes" className="mt-4 block label text-ink-soft">
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
                disabled={status === 'sending' || !colors.length || !email}
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
