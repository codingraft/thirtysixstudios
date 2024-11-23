/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        PPNeueMontreal: ['PPNeueMontreal', 'sans-serif'], // Add your custom font
      },
    },
  },

  plugins: [],
}