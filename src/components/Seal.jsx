const VARIANTS = {
  yellow: 'bg-yellow text-ink',
  blue: 'bg-blue text-paper',
  red: 'bg-red text-paper',
  ink: 'bg-ink text-paper',
  paper: 'bg-paper text-ink',
};

/**
 * Printed seal — the stamps and starbursts stuck onto the layout.
 * `burst` swaps the disc for a starburst; `ring` draws the inner hairline that
 * makes a disc read as a rubber stamp rather than a plain dot.
 */
export default function Seal({
  variant = 'yellow',
  lines = [],
  burst = false,
  size = 'md',
  ring = true,
  className = '',
}) {
  const dims = {
    sm: burst ? 'h-16 w-16' : 'h-14 w-14',
    md: burst ? 'h-[86px] w-[86px]' : 'h-[74px] w-[74px]',
    lg: burst ? 'h-28 w-28' : 'h-24 w-24',
  }[size];

  /* Tailwind emits `relative` after `absolute`, so a hard-coded `relative` here
     would silently beat any positioning a caller passes in. Only add it when the
     caller hasn't positioned the seal itself — an absolute/fixed seal is already
     a containing block for the ring. */
  const positioned = /(^|\s)(absolute|fixed|sticky)(\s|$)/.test(className);

  return (
    <span
      aria-hidden="true"
      className={`${positioned ? '' : 'relative'} grid select-none place-content-center text-center ${dims} ${
        VARIANTS[variant]
      } ${burst ? 'starburst' : 'rounded-full border-2 border-current'} ${className}`}
    >
      {ring && !burst && (
        <span className="pointer-events-none absolute inset-[5px] rounded-full border border-current opacity-45" />
      )}

      <span className="relative px-1">
        {lines.map((line) => (
          <span
            key={line}
            className="block font-display leading-[1.2]"
            style={{
              fontSize: size === 'lg' ? '11px' : '9px',
              letterSpacing: '0.1em',
            }}
          >
            {line}
          </span>
        ))}
      </span>
    </span>
  );
}
