import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: '#FFD700',
      },
      fontFamily: {
        'futura': ['Futura', 'sans-serif'],
      },
      fontWeight: {
        'light': '300',
        'book': '400',
        'bold': '700'
      }
    },
  },
  plugins: [],
}
export default config
