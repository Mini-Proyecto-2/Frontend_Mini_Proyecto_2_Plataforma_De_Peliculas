/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#35495E",
        secondary: "#6F98C4",
      },
    },
  },
  plugins: [],
}