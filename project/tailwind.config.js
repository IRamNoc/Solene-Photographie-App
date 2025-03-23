/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        marqueeReverse: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'marquee-reverse': 'marqueeReverse 20s linear infinite',
      },
      colors: {
        'coral': '#ff5f5f',
        'pink': '#ff96bf',
        'mint': '#abcf5a',
        'sky': '#97d5e6',
        'sunshine': '#fff27e',
        'orange': '#ff8c22',
        'red': '#f15c5c',
        'text': '#998e79'
      },
      fontFamily: {
        'perandory': ['PerandoryCondensed', 'serif'],
        'anastasia': ['Anastasia', 'cursive']
      },
      height: {
        '128': '32rem',
      },
      spacing: {
        '1/2': '50%',
        '1/3': '33.333333%',
        '2/3': '66.666667%',
      }
    },
  },
  plugins: [],
};