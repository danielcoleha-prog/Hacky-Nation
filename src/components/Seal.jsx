const VARIANTS = {
  yellow: 'bg-yellow text-ink border-ink',
  blue: 'bg-blue text-paper border-blue-deep',
  red: 'bg-red text-paper border-red-deep',
  ink: 'bg-ink text-paper border-ink',
};

/**
 * Small printed seal — the "PREMIUM SUEDE / HANDMADE / EST. 2025" stamps.
 * `burst` swaps the circle for a starburst clip.
 */
export default function Seal({ variant = 'yellow', lines = [], burst = false, className = '' }) {
  return (
    <span
      className={`grid select-none place-content-center border-2 text-center font-label uppercase leading-[1.15] ${
        burst ? 'starburst h-[72px] w-[72px] border-0 sm:h-20 sm:w-20' : 'h-14 w-14 rounded-full sm:h-[68px] sm:w-[68px]'
      } ${VARIANTS[variant]} ${className}`}
      aria-hidden="true"
    >
      {lines.map((line) => (
        <span key={line} className="block text-[8px] font-bold tracking-[0.1em] sm:text-[9px]">
          {line}
        </span>
      ))}
    </span>
  );
}
