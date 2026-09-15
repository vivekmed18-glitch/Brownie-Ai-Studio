/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brownie: {
          50: '#fffbe1',
          100: '#fff5b8',
          200: '#ffe685',
          300: '#ffd048',
          400: '#ffb71b',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        studio: {
          bg: '#0A0A0B',
          card: '#141416',
          elevated: '#1C1C1F',
          border: 'rgba(255,255,255,0.06)',
          hover: '#242428',
          ink: '#F4F4F5',
          muted: '#8E8E93'
        }
      }
    },
  },
  plugins: [],
}
