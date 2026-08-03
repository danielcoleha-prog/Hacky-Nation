/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Screenprint palette — sampled from the poster art.
        paper: '#F2E9D8',
        'paper-deep': '#E8DBC3',
        'paper-edge': '#D6C6A8',
        // Deep midnight navy rather than true black — the site's "black" areas
        // read as printed ink on cream, and a pure #000 fights the warm paper.
        ink: '#101A2E',
        'ink-soft': '#4A5468',
        'ink-faint': '#7C879B',
        blue: {
          DEFAULT: '#1B4FC4',
          deep: '#12379A',
          light: '#5182E8',
        },
        red: {
          DEFAULT: '#D4402E',
          deep: '#A62A1B',
        },
        yellow: {
          DEFAULT: '#F0A81B',
          deep: '#C8850B',
        },
      },
      fontFamily: {
        // Newake is the poster face. It is a demo cut with NO punctuation, so
        // Archivo sits behind it to catch stray glyphs; anything that actually
        // contains punctuation should use .font-numeric instead of relying on
        // that fallback. PP Mori carries body and all small text.
        display: ['Newake', 'Archivo', 'Impact', 'sans-serif'],
        body: ['PP Mori', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-hero': ['clamp(3.4rem, 10.5vw, 8rem)', { lineHeight: '0.86', letterSpacing: '-0.01em' }],
        'display-xl': ['clamp(2.6rem, 6.5vw, 5rem)', { lineHeight: '0.9', letterSpacing: '-0.005em' }],
        'display-lg': ['clamp(2rem, 4.2vw, 3.25rem)', { lineHeight: '0.92', letterSpacing: '0' }],
        'display-md': ['clamp(1.5rem, 2.6vw, 2.1rem)', { lineHeight: '0.96', letterSpacing: '0.005em' }],
        'display-sm': ['1.25rem', { lineHeight: '1', letterSpacing: '0.01em' }],
        eyebrow: ['11px', { lineHeight: '1', letterSpacing: '0.22em' }],
        'label-caps': ['12px', { lineHeight: '1', letterSpacing: '0.14em' }],
        'label-lg': ['13px', { lineHeight: '1', letterSpacing: '0.1em' }],
        'body-lg': ['17px', { lineHeight: '1.62' }],
        'body-md': ['15px', { lineHeight: '1.65' }],
        'body-sm': ['13.5px', { lineHeight: '1.6' }],
      },
      maxWidth: { site: '1400px' },
      boxShadow: {
        // Hard offsets, never soft blur — printed matter doesn't glow.
        press: '5px 5px 0 0 #101A2E',
        'press-sm': '3px 3px 0 0 #101A2E',
        'press-lg': '8px 8px 0 0 #101A2E',
        'press-blue': '5px 5px 0 0 #1B4FC4',
        'press-red': '5px 5px 0 0 #D4402E',
        lift: '0 18px 34px -20px rgba(16,26,46,0.45)',
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        'rise-in': {
          from: { opacity: '0', transform: 'translateY(18px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'spin-slow': { to: { transform: 'rotate(360deg)' } },
        bobble: {
          '0%,100%': { transform: 'translateY(0) rotate(-2deg)' },
          '50%': { transform: 'translateY(-12px) rotate(2deg)' },
        },
        'sack-pulse': {
          '0%,100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.06)' },
        },
        'ring-pulse': {
          '0%': { transform: 'scale(0.96)', opacity: '0.9' },
          '70%': { transform: 'scale(1.22)', opacity: '0' },
          '100%': { transform: 'scale(1.22)', opacity: '0' },
        },
        'marquee-left': {
          '0%': { transform: 'translate3d(0,0,0)' },
          '100%': { transform: 'translate3d(-50%,0,0)' },
        },
        'marquee-right': {
          '0%': { transform: 'translate3d(-50%,0,0)' },
          '100%': { transform: 'translate3d(0,0,0)' },
        },
        'cross-fade': {
          '0%,100%': { opacity: '0' },
          '8%,42%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        'rise-in': 'rise-in 0.7s cubic-bezier(0.22,1,0.36,1) both',
        'spin-slow': 'spin-slow 22s linear infinite',
        bobble: 'bobble 7s ease-in-out infinite',
        'sack-pulse': 'sack-pulse 1.6s ease-in-out infinite',
        'ring-pulse': 'ring-pulse 1.6s ease-out infinite',
        'marquee-left': 'marquee-left var(--speed,120s) linear infinite',
        'marquee-right': 'marquee-right var(--speed,120s) linear infinite',
      },
    },
  },
  plugins: [],
};
