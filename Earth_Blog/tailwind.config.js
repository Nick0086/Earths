/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-green': '#2C541D',
        'light-green': '#74A84A',
        'light-grey': '#5858585'
      },

    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
      },
    },
    screens: {
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1200px',
      '2xl': '1400px',
    },
  },
  plugins: [],
}

