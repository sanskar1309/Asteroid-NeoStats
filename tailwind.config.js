/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          950: '#020509',
          900: '#030712',
          800: '#0a0f1e',
          700: '#0d1b2a',
          600: '#0f2744',
          500: '#1e3a5f',
        },
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-blue': '0 0 24px rgba(59,130,246,0.35)',
        'glow-red':  '0 0 24px rgba(239,68,68,0.35)',
        'glow-sm':   '0 0 12px rgba(59,130,246,0.2)',
      },
      animation: {
        'twinkle':      'twinkle 8s ease-in-out infinite',
        'twinkle-slow': 'twinkle 14s ease-in-out infinite 3s',
        'twinkle-fast': 'twinkle 5s ease-in-out infinite 1s',
        'pulse-slow':   'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        'fade-in-up':   'fadeInUp 0.5s ease both',
      },
      keyframes: {
        twinkle: {
          '0%,100%': { opacity: '1' },
          '50%':     { opacity: '0.25' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
