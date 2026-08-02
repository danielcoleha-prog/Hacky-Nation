import { Link } from 'react-router-dom';
import Seal from './Seal';

export default function CustomBanner() {
  return (
    <section id="custom" className="relative overflow-hidden border-b-2 border-ink bg-ink py-16 text-paper md:py-24">
      <div
        aria-hidden="true"
        className="halftone pointer-events-none absolute inset-y-0 right-0 w-[40%] opacity-60"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 left-[8%] aspect-square w-56 rounded-full bg-yellow/20"
      />

      <div className="relative z-10 mx-auto grid max-w-site items-center gap-10 px-6 md:grid-cols-2 md:px-10">
        <div>
          <p className="font-label text-label-caps uppercase text-yellow">Custom Orders</p>
          <h2 className="mt-3 font-display text-display-xl uppercase">
            Build Your
            <br />
            <span className="text-blue-light">Own Sack.</span>
          </h2>
          <p className="mt-5 max-w-md font-body text-body-lg text-paper/75">
            Pick your panels, your colors, and your center patch. Team orders, event
            drops, and one-offs — tell us what you want and we'll quote it.
          </p>
          <Link to="/custom" className="btn mt-8 border-paper bg-paper text-ink hover:bg-blue hover:border-blue hover:text-paper">
            Start A Custom
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="relative grid place-content-center">
          <img
            src="/img/products/patriot-sack.webp"
            alt="A custom Hacky Nation suede footbag"
            width={520}
            height={520}
            loading="lazy"
            decoding="async"
            className="h-auto w-full max-w-sm animate-bobble object-contain drop-shadow-cut"
          />
          <Seal
            variant="red"
            burst
            lines={['MAKE IT', 'YOURS']}
            className="absolute bottom-0 left-0 rotate-[-10deg]"
          />
        </div>
      </div>
    </section>
  );
}
