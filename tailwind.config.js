/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      stone: colors.stone,
      primary: "#262F96",
      secondary: "#202224",
    },
    extend: {
      boxShadow: {
        custom: "0px 0px 30px 0px rgba(0, 0, 0, 0.10)",
      },
      backgroundImage: {
        gradient:
          "linear-gradient(90deg, #252990 17.78%, #295CC1 50.39%, #252990 82.22%)",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
