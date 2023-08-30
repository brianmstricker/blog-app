/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xxs: "300px",
        xxns: "400px",
        xs: "500px",
        xns: "600px",
        nav: "700px",
      },
    },
  },
  plugins: [],
};
