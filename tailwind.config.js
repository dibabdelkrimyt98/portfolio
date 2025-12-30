/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // You can add custom colors here to match the design perfectly
        brand: {
          blue: '#3b82f6',
          purple: '#8b5cf6',
          dark: '#050505'
        }
      }
    },
  },
  plugins: [],
}