/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#D4AF37',
          '20': 'rgba(212, 175, 55, 0.2)',
          '60': 'rgba(212, 175, 55, 0.6)',
          '80': 'rgba(212, 175, 55, 0.8)',
        },
      },
    },
  },
  plugins: [],
}
