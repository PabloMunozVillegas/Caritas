/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'saira': ['Saira', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
        'now': ['Now', 'sans-serif'],
        'now-bold': ['Now-Bold', 'sans-serif'],
        'now-thin': ['Now-Thin', 'sans-serif']
      },
    },
  },
  plugins: [],
}

