const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  important: true,
  theme: {
    extend: {
      colors: {
        'background-default': 'var(--background-default)',
        'foreground-default': 'var(--foreground-default)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        tertiary: 'var(--tertiary)',
        accent: 'var(--accent)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        danger: 'var(--danger)',
        info: 'var(--info)',
        'reverse-primary': 'var(--reverse-primary)',
      },
      textColor: {
        'default': 'var(--foreground-default)',
      },
      spacing: {
        '1/2': '50%',
        '1/3': '33.33333%',
        '2/3': '66.66666%',
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '75%',
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
        'full': '100%',
      },
      boxShadow: {
        'focus': '0 0 0 3px var(--primary)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/ui'),
  ]
}