/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        bgColor:"#FFB84C",
        primary: "#F5EAEA",
        secondary: "#F16767",
      }
    },
  },
  plugins: [],
}
