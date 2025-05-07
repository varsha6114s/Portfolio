/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'cosmic-blue': '#1a1a2e',
        'deep-purple': '#2a1b3d',
        'star-glow': '#9d4edd',
        'sakura-pink': '#ffb7c5',
        'baby-blue': '#a2d2ff',
        'warm-white': '#fff5e6',
      },
      fontFamily: {
        'handwritten': ['"Dancing Script"', 'cursive'],
        'modern': ['"Poppins"', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
} 