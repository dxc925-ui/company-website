/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "6rem",
        "2xl": "8rem",
      },
    },
    extend: {
      colors: {
        street: {
          black: "#0a0a0a",
          dark: "#ececea",
          gray: "#e0e0e0",
          light: "#d0d0d0",
          white: "#ffffff",
          offwhite: "#f5f5f0",
          neon: "#c4f600",
          neonDark: "#7a9900",
          muted: "#777777",
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', "sans-serif"],
        mono: ['"Space Mono"', "monospace"],
        body: ['"Space Mono"', "monospace"],
      },
      fontSize: {
        "clamp-hero": "clamp(3rem, 12vw, 10rem)",
        "clamp-xl": "clamp(2rem, 6vw, 5rem)",
        "clamp-lg": "clamp(1.5rem, 4vw, 3rem)",
      },
      animation: {
        "marquee": "marquee 20s linear infinite",
        "marquee-slow": "marquee 30s linear infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px #c4f600, 0 0 10px #c4f600" },
          "100%": { boxShadow: "0 0 20px #c4f600, 0 0 40px #c4f600" },
        },
      },
    },
  },
  plugins: [],
};
