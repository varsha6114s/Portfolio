/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'modern': ['Poppins', 'sans-serif'],
        'handwritten': ['Dancing Script', 'cursive'],
      },
      colors: {
        'warm-white': '#F8F9FA',
        'cosmic-blue': '#1A1B26',
        'deep-purple': '#2a1b3d',
        'star-glow': '#9d4edd',
        'sakura-pink': '#ffb7c5',
        'baby-blue': '#a2d2ff',
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