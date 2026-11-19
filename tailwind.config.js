/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5145CD',
        secondary: '#7C3AED',
        accent: '#F5A623',
        background: '#FAFAFC',
        surface: '#FFFFFF',
        textMain: '#171B36',
        textSecondary: '#475569',
        navbar: '#171B36',
        border: '#E2E8F0',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
