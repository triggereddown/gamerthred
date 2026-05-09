/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark:     "#050507",
        surface:  "#0B0B12",
        primary:  "#7C3AED",
        secondary:"#22D3EE",
        light:    "#E5E7EB",
        muted:    "#9CA3AF",
      },
      fontFamily: {
        heading: ["Clash Display", "Satoshi", "Inter", "sans-serif"],
        body:    ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial":   "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-brand":    "linear-gradient(135deg, #7C3AED 0%, #22D3EE 100%)",
      },
      animation: {
        "float":       "float 5s ease-in-out infinite",
        "pulse-glow":  "pulse-glow 3s ease-in-out infinite",
        "fade-up":     "fade-up 0.8s cubic-bezier(0.22,1,0.36,1) both",
        "spin-slow":   "spin 3s linear infinite",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%":     { transform: "translateY(-14px) rotate(1deg)" },
          "66%":     { transform: "translateY(-8px) rotate(-0.5deg)" },
        },
        "pulse-glow": {
          "0%,100%": { boxShadow: "0 0 20px rgba(124,58,237,0.4)" },
          "50%":     { boxShadow: "0 0 50px rgba(124,58,237,0.75), 0 0 100px rgba(34,211,238,0.2)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
      transitionTimingFunction: {
        cinema: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      maxWidth: {
        container: "1280px",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },
    },
  },
  plugins: [],
};
