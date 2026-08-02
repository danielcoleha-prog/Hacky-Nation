/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Paper-collage palette, sampled from the reference art direction.
        paper: '#F1E8DA',
        'paper-deep': '#E6DAC5',
        'paper-edge': '#D8C9AF',
        ink: '#16130E',
        'ink-soft': '#4A443A',
        blue: {
          DEFAULT: '#1B4FC4',
          deep: '#123A96',
          light: '#4A7BE0',
        },
        red: {
          DEFAULT: '#D23C2B',
          deep: '#A32A1C',
        },
        yellow: {
          DEFAULT: '#F0A81B',
          deep: '#C9860A',
        },
      },
      fontFamily: {
        display: ['Tanker', 'Impact', 'sans-serif'],
        body: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        label: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Tanker is a single-weight display face — size and tracking do the work.
        'display-hero': ['clamp(3.5rem, 11vw, 8.5rem)', { lineHeight: '0.84', letterSpacing: '-0.02em' }],
        'display-xl': ['clamp(2.75rem, 7vw, 5rem)', { lineHeight: '0.88', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2rem, 4.5vw, 3.25rem)', { lineHeight: '0.92', letterSpacing: '-0.01em' }],
        'display-md': ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '0.95' }],
        'label-caps': ['11px', { lineHeight: '1', letterSpacing: '0.16em', fontWeight: '700' }],
        'label-lg': ['13px', { lineHeight: '1', letterSpacing: '0.12em', fontWeight: '700' }],
        'body-lg': ['18px', { lineHeight: '1.55' }],
        'body-md': ['15px', { lineHeight: '1.6' }],
      },
      maxWidth: {
        site: '1440px',
      },
      boxShadow: {
        cut: '0 24px 48px -18px rgba(22,19,14,0.38)',
        card: '0 2px 0 0 #16130E',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        bobble: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
        bobble: 'bobble 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
