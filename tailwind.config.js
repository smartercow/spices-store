/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'main-black': '#1C1C1C',
        'light-green': '#F3F5E7'
      },
      screens: {
        '3xl': '1600px'
      }
    }
  },
  plugins: [
    require('rippleui'),
    require('@tailwindcss/line-clamp'),
    require('tailwindcss-debug-screens')
  ]
};
