/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        secondary: '#323546',
        primary: '#0d1421',
        green: '#0eca82',
        red: '#fa3c58',
      },
    },
  },
  plugins: [
    require('@headlessui/tailwindcss'),
  ],
};
