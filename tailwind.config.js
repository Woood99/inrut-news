/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,css,scss}"],
  important: true,
  prefix: 'tw-',
  theme: {
    extend: {
      screens: {
        'md1': {'max': '1212px'},  
        'mmd1': {'min': '1213px'},
        'md2': {'max': '768px'},
        'mmd2': {'min': '769px'},
      }
    },
  },
  plugins: [],
}

