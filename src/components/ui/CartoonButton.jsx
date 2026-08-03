import { Link } from 'react-router-dom';

/**
 * Pill button with a hard drop shadow and a sweep highlight on hover.
 *
 * Adapted to this codebase from the supplied shadcn/TypeScript snippet: the
 * project is JSX + Tailwind with no `cn()` helper or `@/` alias, and the
 * palette comes from theme tokens rather than Tailwind's stock `orange-400`
 * / `neutral-800`. `to` renders it as a router Link so it can be a real
 * navigation control instead of an onClick handler.
 */
export default function CartoonButton({
  label,
  to,
  href,
  color = 'bg-blue',
  textClass = 'text-paper',
  hasHighlight = true,
  disabled = false,
  onClick,
  className = '',
  children,
}) {
  const base = `relative inline-flex h-14 items-center justify-center gap-2 overflow-hidden rounded-full border-2 border-ink px-8
    font-display text-[1.05rem] uppercase tracking-[0.02em] ${textClass} ${color}
    transition-all duration-150 group
    ${
      disabled
        ? 'pointer-events-none opacity-50'
        : 'hover:-translate-y-1 hover:shadow-[0_4px_0_0_var(--press-ink)] active:translate-y-0 active:shadow-none'
    } ${className}`;

  const inner = (
    <>
      <span className="relative z-10 whitespace-nowrap">{label}</span>
      {children}
      {hasHighlight && !disabled && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-[-100%] top-1/2 h-24 w-16 -translate-y-1/2 rotate-12 bg-white/45 transition-all duration-500 ease-in-out group-hover:left-[200%]"
        />
      )}
    </>
  );

  if (to && !disabled) {
    return (
      <Link to={to} className={base} onClick={onClick}>
        {inner}
      </Link>
    );
  }

  if (href && !disabled) {
    return (
      <a href={href} className={base} onClick={onClick}>
        {inner}
      </a>
    );
  }

  return (
    <button type="button" disabled={disabled} onClick={disabled ? undefined : onClick} className={base}>
      {inner}
    </button>
  );
}
