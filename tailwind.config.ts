import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#f8f5f0',
        sand: '#ede8e0',
        border: '#d4b896',
        accent: '#b89060',
        'spa-text': '#2c1f14',
        muted: '#9a8070',
        dark: '#1a1714',
      },
      fontFamily: {
        sans: ['Pretendard', 'Noto Sans JP', 'Noto Sans SC', 'Noto Sans TC', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease forwards',
        'fade-in': 'fadeIn 0.6s ease forwards',
      },
    },
  },
  plugins: [],
}

export default config
