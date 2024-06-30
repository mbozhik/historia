import type {Config} from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config = {
  darkMode: ['class'],
  content: ['./components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    screens: {
      xl: {max: '1536px'},
      md: {max: '1024px'},
      sm: {max: '428px'},
    },
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'background-alt': 'var(--background-alt)',

        primary: {
          DEFAULT: 'var(--primary)',
          hover: 'var(--primary-hover)',
        },
        secondary: 'var(--secondary)',

        custom: {
          white: 'var(--custom-white)',
          black: 'var(--custom-black)',
          grey: 'var(--custom-grey)',
        },

        tags: {
          favorite: 'var(--favorite)',
          warning: 'var(--warning)',
          status: {
            completed: 'var(--status-completed)',
            process: 'var(--status-process)',
            frozen: 'var(--status-frozen)',
          },
          genre: {
            jen: 'var(--genre-jen)',
            another: 'var(--genre-another)',
            femslash: 'var(--genre-femslash)',
            slash: 'var(--genre-slash)',
            get: 'var(--genre-get)',
          },
          rating: {
            nc21: 'var(--raiting-nc21)',
            nc17: 'var(--raiting-nc17)',
            r: 'var(--raiting-r)',
            pg13: 'var(--raiting-pg13)',
            g: 'var(--raiting-g)',
          },
        },
      },
      borderRadius: {
        '4xl': '30px',
      },
      keyframes: {
        'accordion-down': {
          from: {height: '0'},
          to: {height: 'var(--radix-accordion-content-height)'},
        },
        'accordion-up': {
          from: {height: 'var(--radix-accordion-content-height)'},
          to: {height: '0'},
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    plugin(function sizePlugin(api) {
      api.matchUtilities({s: (value: string) => ({width: value, height: value})}, {values: api.theme('width')})
    }),

    plugin(function percentagePlugin(api) {
      const createPercentageUtil = (property) => (value) => {
        return {[property]: `${value.replace(/[^\d]/g, '')}%`}
      }

      const values = Array.from({length: 100}, (_, i) => `${i}`)

      api.matchUtilities(
        {
          ww: createPercentageUtil('width'),
          hh: createPercentageUtil('height'),
        },
        {
          values,
        },
      )
    }),

    require('tailwindcss-animate'),
  ],
} satisfies Config

export default config
