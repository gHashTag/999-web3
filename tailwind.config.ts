import type { Config } from 'tailwindcss'
import { nextui } from '@nextui-org/react'
const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette')

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      }
    }
  },
  darkMode: 'class',
  // Remove the nested nextui call
  plugins: [
    addVariablesForColors,
    nextui({
      themes: {
        light: {
          colors: {
            background: '#FFFFFF', // or DEFAULT
            foreground: '#0f0f0c', // or 50 to 900 DEFAULT
            primary: {
              //... 50 to 900
              foreground: '#FFFFFF',
              DEFAULT: '#006FEE'
            }
            // ... rest of the colors
          }
        },
        dark: {
          colors: {
            background: '#0f0f0c', // or DEFAULT
            foreground: '#ECEDEE', // or 50 to 900 DEFAULT
            primary: {
              //... 50 to 900
              foreground: '#FFFFFF',
              DEFAULT: '#f6ff00'
            }
          }
          // ... rest of the colors
        },
        mytheme: {
          // custom theme
          extend: 'dark',
          colors: {
            primary: {
              DEFAULT: '#BEF264',
              foreground: '#000000'
            },
            focus: '#BEF264'
          }
        }
      }
    })
  ]
}
// {
//   prefix: 'nextui', // prefix for themes variables
//   addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
//   defaultTheme: 'dark', // default theme from the themes object
//   defaultExtendTheme: 'dark', // default theme to extend on custom themes
//   layout: {}, // common layout tokens (applied to all themes)
//   themes: {
//     light: {
//       layout: {}, // light theme layout tokens
//       colors: {
//         background: '#FFFFFF', // or DEFAULT
//         foreground: '#11181C', // or 50 to 900 DEFAULT
//         primary: {
//           //... 50 to 900
//           foreground: '#FFFFFF',
//           DEFAULT: '#006FEE'
//         }
//       } // light theme colors
//     },
//     dark: {
//       layout: {}, // dark theme layout tokens
//       colors: {
//         background: '#000000', // or DEFAULT
//         foreground: '#ECEDEE', // or 50 to 900 DEFAULT
//         primary: {
//           //... 50 to 900
//           foreground: '#FFFFFF',
//           DEFAULT: '#ee008f'
//         }
//       } // dark theme colors
//     }
//     // ... custom themes
//   }
// }
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme('colors'))
  let newVars = Object.fromEntries(Object.entries(allColors).map(([key, val]) => [`--${key}`, val]))

  addBase({
    ':root': newVars
  })
}
export default config
