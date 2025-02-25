/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ff006e",
        secondary: "#210062",
        ternary: "#009FBD",
        font: "#F9E2AF",
      },
    },
  },

  plugins: [require("daisyui")],
};
