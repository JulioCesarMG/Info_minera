/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'marron-claro': '#C9A882',
        'marron-hover': '#D4B896',
        'azul-gob': '#0072BB',
        'azul-gob-dark': '#005288',
      },
    },
  },
  plugins: [],
}

