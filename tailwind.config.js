/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // primary: "#3E3E3D",
        primary: "#ebe2d0",
      },
      screens: {
        sm: "375px",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
        card2: "  0px 8px 24px rgba(149, 157, 165, 0.2)",
      },
    },
  },
  plugins: [],
};
