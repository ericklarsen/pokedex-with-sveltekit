/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  variants: {
    extend: {
      margin: ['first', 'last'],
    }
  },
  theme: {
    extend: {},
  },
  plugins: [],
}
