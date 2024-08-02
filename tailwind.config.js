/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      margin: {
        "255px": "255px",
      },
      height: {
        '550': '550px'
      },
      width: {
        '1100': '1100px'
      }
    },
  },
  plugins: [],
};
