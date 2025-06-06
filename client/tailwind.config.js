/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./framework/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        mobile: "800px",
      },
    },
  },
  plugins: [],
};
