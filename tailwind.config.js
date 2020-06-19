const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  important: true,
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        'text-default': 'var(--text-default)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/ui'),
  ]
}