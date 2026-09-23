import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: "#0F172A",
          secondary: "#1E293B",
        },
        surface: {
          active: "#334155",
          border: "#334155",
        },
        av: {
          accent: "#3B82F6",
          success: "#10B981",
          warning: "#F59E0B",
          danger: "#EF4444",
          textPrimary: "#F8FAFC",
          textSecondary: "#94A3B8",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-roboto-mono)", "monospace"],
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "pulse-subtle": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 10px rgba(59, 130, 246, 0.4)" },
          "100%": { boxShadow: "0 0 25px rgba(59, 130, 246, 0.8), 0 0 10px rgba(59, 130, 246, 0.6)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
