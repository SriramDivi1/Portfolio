/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#007AFF",
        secondary: "#FF3B30",
        // Dark mode — single source of truth, no inline overrides
        dark: {
          bg: "#0a0a0a",
          surface: "#141414",
          "surface-hover": "#1a1a1a",
          border: "#262626",
          "border-subtle": "#333333",
          text: "#fafafa",
          muted: "#a1a1aa",
          "muted-strong": "#71717a"
        },
        light: {
          bg: "#FAFAFA",
          surface: "#FFFFFF",
          border: "#E4E4E7",
          text: "#09090B",
          muted: "#52525B"
        }
      },
      fontFamily: {
        display: ['Clash Display', 'sans-serif'],
        body: ['Manrope', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0, 122, 255, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(0, 122, 255, 0.6)' }
        }
      }
    },
  },
  plugins: [],
}
