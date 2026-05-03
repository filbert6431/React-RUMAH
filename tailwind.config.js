/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dash-dark': '#1a1a1a',
        'dash-accent': '#8B5E52',
        'dash-light': '#2D2825',
      },
      fontFamily: {
        'barlow': ['Barlow', 'sans-serif'],
      },
    },
  },
  plugins: [],
}