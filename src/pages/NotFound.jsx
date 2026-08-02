import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="paper-grain relative grid min-h-[60vh] place-content-center bg-paper px-6 text-center">
      <div className="relative z-10">
        <p className="font-display text-display-hero uppercase text-blue">404</p>
        <h1 className="mt-2 font-display text-display-lg uppercase text-ink">
          Dropped it.
        </h1>
        <p className="mx-auto mt-3 max-w-sm font-body text-body-lg text-ink-soft">
          That page isn't in the circle. Let's get you back.
        </p>
        <Link to="/" className="btn-primary mt-8">
          Back To Shop
        </Link>
      </div>
    </main>
  );
}
