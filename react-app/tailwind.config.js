/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "gray-20": "#F8F4EB",
        "gray-50": "#EFE6E6",
        "gray-100": "#DFCCCC",
        "gray-500": "#626262",
        "primary-100": "#71c4ff",
        "primary-300": "#446bff",
        "primary-500": "#12145b",
        "secondary-400": "#e583ff",
        "secondary-500": "#811b85",
      },
      backgroundImage: (theme) => ({
        "gradient-yellowred":
            "linear-gradient(90deg, #FF616A 0%, #FFC837 100%)",
        "mobile-home": "url('./assets/HomePageGraphic.png')",
      }),
      fontFamily: {
        dmsans: ["DM Sans", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      content: {},
    },
    screens: {
      xs: "350px",
      sm: "768px",
      md: "1060px",
    },
  },
  plugins: [],
};

