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
        ink: '#14110D',
        'ink-soft': '#5A5245',
        'ink-faint': '#8C8272',
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
        // Archivo carries the poster's heavy condensed grotesque via its width axis.
        display: ['Archivo', 'Impact', 'sans-serif'],
        body: ['Satoshi', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-hero': ['clamp(3.4rem, 10.5vw, 8rem)', { lineHeight: '0.82', letterSpacing: '-0.035em' }],
        'display-xl': ['clamp(2.6rem, 6.5vw, 5rem)', { lineHeight: '0.85', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2rem, 4.2vw, 3.25rem)', { lineHeight: '0.88', letterSpacing: '-0.025em' }],
        'display-md': ['clamp(1.5rem, 2.6vw, 2.1rem)', { lineHeight: '0.92', letterSpacing: '-0.02em' }],
        'display-sm': ['1.25rem', { lineHeight: '0.95', letterSpacing: '-0.015em' }],
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
        press: '5px 5px 0 0 #14110D',
        'press-sm': '3px 3px 0 0 #14110D',
        'press-lg': '8px 8px 0 0 #14110D',
        'press-blue': '5px 5px 0 0 #1B4FC4',
        'press-red': '5px 5px 0 0 #D4402E',
        lift: '0 18px 34px -20px rgba(20,17,13,0.45)',
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
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        'rise-in': 'rise-in 0.7s cubic-bezier(0.22,1,0.36,1) both',
        'spin-slow': 'spin-slow 22s linear infinite',
        bobble: 'bobble 7s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
