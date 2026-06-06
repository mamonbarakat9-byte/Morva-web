import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#D4AF37',
          light: '#E8C874',
          dark: '#B8960C',
          glow: 'rgba(212, 175, 55, 0.15)',
          border: 'rgba(212, 175, 55, 0.2)',
          'border-hover': 'rgba(212, 175, 55, 0.6)',
        },
        morva: {
          black: '#050505',
          dark: '#0a0a0a',
          card: '#0f0f0f',
          muted: '#A0A0A0',
        },
      },
      fontFamily: {
        cormorant: ['var(--font-cormorant)', 'serif'],
        dm: ['var(--font-dm-sans)', 'sans-serif'],
      },
      keyframes: {
        pulse_ring: {
          '0%': { transform: 'scale(1)', opacity: '0.6' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        scaleX_in: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        dotBounce: {
          '0%, 80%, 100%': { transform: 'scale(0)' },
          '40%': { transform: 'scale(1)' },
        },
      },
      animation: {
        pulse_ring: 'pulse_ring 2s ease-out infinite',
        scaleX_in: 'scaleX_in 0.8s ease-out forwards',
        fadeIn: 'fadeIn 0.8s ease-out forwards',
        slideInRight: 'slideInRight 0.3s ease-out forwards',
        dotBounce: 'dotBounce 1.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
export default config
