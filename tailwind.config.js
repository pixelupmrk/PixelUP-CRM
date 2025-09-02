/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        pixel: {
          blue: '#3b82f6',
          dark: '#0a0a0a'
        }
      }
    },
  },
  plugins: [],
}
