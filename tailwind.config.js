/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode using class strategy
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#007BFF',
          yellow: '#FFD722',
        },
        primary: {
          bg: 'var(--bg-primary)',
          text: 'var(--text-primary)',
        },
        secondary: {
          bg: 'var(--bg-secondary)',
          text: 'var(--text-secondary)',
        },
        border: 'var(--border-color)',
      },
      fontFamily: {
        heading: ['"DM Sans"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"Inter Mono"', '"Roboto Mono"', 'monospace'], // Added Roboto Mono fallback just in case
      },
    },
  },
  plugins: [],
}
