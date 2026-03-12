import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#08477C",
          50: "#E6F0F9",
          100: "#CCE1F3",
          200: "#99C3E7",
          300: "#66A5DB",
          400: "#3387CF",
          500: "#08477C",
          600: "#063963",
          700: "#042B4A",
          800: "#031C32",
          900: "#010E19",
        },
        secondary: {
          DEFAULT: "#FDDC00",
          50: "#FFFDE6",
          100: "#FFFBCC",
          200: "#FFF799",
          300: "#FFF266",
          400: "#FEEE33",
          500: "#FDDC00",
          600: "#CAB000",
          700: "#978400",
          800: "#645800",
          900: "#322C00",
        },
        background: "#F8FAFC",
        foreground: "#0F172A",
        border: "#E2E8F0",
        ring: "#08477C",
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "slide-in-left": "slideInLeft 0.6s ease-out forwards",
        "slide-in-right": "slideInRight 0.6s ease-out forwards",
        "marquee": "marquee 30s linear infinite",
        "float": "float 3s ease-in-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: { "0%": { opacity: "0", transform: "translateY(30px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        slideInLeft: { "0%": { opacity: "0", transform: "translateX(-30px)" }, "100%": { opacity: "1", transform: "translateX(0)" } },
        slideInRight: { "0%": { opacity: "0", transform: "translateX(30px)" }, "100%": { opacity: "1", transform: "translateX(0)" } },
        marquee: { "0%": { transform: "translateX(0%)" }, "100%": { transform: "translateX(-50%)" } },
        float: { "0%, 100%": { transform: "translateY(0px)" }, "50%": { transform: "translateY(-10px)" } },
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, #08477C 0%, #0d5fa3 100%)",
        "gradient-yellow": "linear-gradient(135deg, #FDDC00 0%, #f5c800 100%)",
        "gradient-dark": "linear-gradient(135deg, #031D33 0%, #08477C 100%)",
      },
      boxShadow: {
        "glow-blue": "0 0 30px rgba(8, 71, 124, 0.3)",
        "glow-yellow": "0 0 30px rgba(253, 220, 0, 0.4)",
        "card": "0 4px 24px rgba(8, 71, 124, 0.08)",
        "card-hover": "0 8px 40px rgba(8, 71, 124, 0.16)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
