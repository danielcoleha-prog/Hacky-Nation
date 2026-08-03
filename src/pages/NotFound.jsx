import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="paper-grain relative grid min-h-[62vh] place-content-center bg-paper px-5 text-center">
      <div className="relative z-10">
        <p
          className="font-display text-blue"
          style={{ fontSize: 'clamp(5rem,18vw,11rem)', lineHeight: '0.8', }}
        >
          <span className="overprint" data-text="404" style={{ '--mis-color': 'var(--press-red)' }}>
            404
          </span>
        </p>
        <h1 className="mt-5 font-display text-display-lg text-ink">Dropped it</h1>
        <p className="mx-auto mt-3 max-w-sm font-body text-body-lg text-ink-soft">
          That page isn't in the circle. Let's get you back.
        </p>
        <Link to="/" className="btn-primary mt-9">
          Back to shop
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </main>
  );
}
