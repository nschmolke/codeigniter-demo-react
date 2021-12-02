module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f7f8',
          100: '#d1f1f3',
          200: '#ade6ea',
          300: '#82dee5',
          400: '#4dd8e3',
          500: '#24c6d3',
          600: '#1ab0bc',
          700: '#119aa5',
          800: '#087a83',
          900: '#026067',
        },
      }
    }
  }
}
