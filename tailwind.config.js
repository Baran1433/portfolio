/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#7c3aed",
          hover: "#6d28d9",
          soft: "rgba(124, 58, 237, 0.15)",
          glow: "rgba(124, 58, 237, 0.35)",
        },
        neon: {
          purple: "#7c3aed",
          blue: "#3b82f6",
          cyan: "#06b6d4",
        },
        "section-1": "#0b1120",
        "section-2": "#050816",
        "section-3": "#0c1328",
        "section-4": "#0a0f1e",
        surface: {
          DEFAULT: "#0b1120",
          muted: "#050816",
          card: "#0f172a",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Poppins", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 24px rgba(124, 58, 237, 0.08)",
        card: "0 8px 32px rgba(59, 130, 246, 0.1)",
        nav: "0 4px 32px rgba(124, 58, 237, 0.12)",
        "nav-scrolled": "0 8px 40px rgba(124, 58, 237, 0.18)",
        "neon-glow": "0 0 24px rgba(124, 58, 237, 0.35), 0 0 48px rgba(59, 130, 246, 0.12)",
        ambient: "0 0 80px rgba(124, 58, 237, 0.08)",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      animation: {
        blob: "blob 12s ease-in-out infinite",
      },
      keyframes: {
        blob: {
          "0%, 100%": { borderRadius: "60% 40% 55% 45% / 48% 52% 48% 52%" },
          "50%": { borderRadius: "45% 55% 48% 52% / 52% 48% 55% 45%" },
        },
      },
      backdropBlur: {
        nav: "12px",
        "nav-scrolled": "12px",
      },
    },
  },
  plugins: [],
};
