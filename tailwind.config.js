/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--border-color, #E2E8F0)',
        background: 'var(--card-bg, #FFFFFF)',
        foreground: 'var(--main-text, #020C21)',
        primary: {
          DEFAULT: '#0B132B',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#EFF6FF',
          foreground: '#1D4ED8',
        },
        accent: {
          DEFAULT: '#F0F6FE',
          foreground: '#020C21',
        },
        input: '#E2E8F0',
        ring: '#2563EB',
        destructive: {
          DEFAULT: '#C43D4B',
          foreground: '#FFFFFF',
        },
        muted: {
          DEFAULT: '#F1F5F9',
          foreground: '#59627E',
        },
        navy: {
          DEFAULT: '#0B132B',
          dark: '#020C21',
          light: '#2563EB',
          50: '#F0F6FE',
          100: '#E0EDFC',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#0B132B',
        },
        mint: {
          DEFAULT: '#BFDBFE',
          pale: '#EFF6FF',
          light: '#DBEAFE',
          dark: '#93C5FD',
          accent: '#2563EB',
        },
        surface: {
          bg: '#F8FAFD',
          card: '#FFFFFF',
          border: '#E2E8F0',
          muted: '#F1F5F9',
        },
        brand: {
          text: '#020C21',
          secondary: '#59627E',
          success: '#2563EB',
          warning: '#C17B20',
          error: '#C43D4B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Manrope', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(6, 63, 131, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)',
        'card': '0 4px 20px -2px rgba(6, 63, 131, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'elevated': '0 12px 32px -4px rgba(6, 63, 131, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
        'glow-mint': '0 0 25px -4px rgba(197, 233, 220, 0.7)',
        'glow-navy': '0 0 25px -4px rgba(6, 63, 131, 0.35)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        }
      },
      animation: {
        shimmer: 'shimmer 3s ease-in-out infinite',
        float: 'float 5s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
