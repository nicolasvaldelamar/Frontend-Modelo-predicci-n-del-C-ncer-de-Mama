/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'breast-cancer-pink': {
          light: '#FFB6C1',
          DEFAULT: '#FF69B4',
          dark: '#FF1493',
        }
      }
    },
  },
  plugins: [],
} 