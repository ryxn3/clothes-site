import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f7f7f5",
          100: "#eeece7",
          200: "#dcd8cf",
          300: "#c2bbac",
          400: "#a49786",
          500: "#8a7c69",
          600: "#6f6353",
          700: "#584f43",
          800: "#3a342c",
          900: "#211d18",
          950: "#121110",
        },
        accent: {
          DEFAULT: "#b08d57",
          light: "#d4b483",
          dark: "#7a6039",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      backgroundImage: {
        "grain-gradient":
          "radial-gradient(circle at 20% 20%, rgba(176,141,87,0.15), transparent 40%), radial-gradient(circle at 80% 70%, rgba(176,141,87,0.12), transparent 45%)",
      },
      boxShadow: {
        premium: "0 20px 60px -15px rgba(0,0,0,0.25)",
        glass: "0 8px 32px 0 rgba(0,0,0,0.1)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "gradient-move": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "gradient-move": "gradient-move 8s ease infinite",
        "spin-slow": "spin 3s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
