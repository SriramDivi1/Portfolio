/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#007AFF",
        secondary: "#FF3B30",
        dark: {
          bg: "#050505",
          surface: "#121212",
          border: "#2A2A2A",
          text: "#FFFFFF",
          muted: "#A1A1AA"
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
