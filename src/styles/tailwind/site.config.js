const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.jsx', './src/components/**/*.jsx'],
  theme: {
    extend: {
      backgroundImage: {
        'mountains': "url('/m.png')",
      },
      fontFamily: {
        sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  presets: [require('./extend.preset.js')],
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
