import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        slate: {
          850: "#172033",
          900: "#0f172a",
          950: "#020617",
        },
        pal: {
          fire: "#ef4444",
          water: "#3b82f6",
          grass: "#22c55e",
          electric: "#eab308",
          ice: "#06b6d4",
          ground: "#a16207",
          dark: "#7c3aed",
          dragon: "#4f46e5",
          neutral: "#9ca3af",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
