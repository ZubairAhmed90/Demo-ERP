/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-back" : "#4299e1",
        "customLeft": '#08549f',
        "customRight": '#6dcff6',
        "sidebar": "#d7effc",
      },
      height: {
        '22': '22px'
      }
    },
  },
  plugins: [],
};
