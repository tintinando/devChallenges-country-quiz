/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    fontFamily: {
      sans: ['Be Vietnam Pro', 'sans-serif']
    },
    extend: {
      colors: {
        'usr-primary': '#343963',
        'usr-secondary': '#393F6E',
        'txt-primary': '#E2E4F3',
        'txt-secondary': '#8B8EAB'
      }

    }
  },
  plugins: []
}
