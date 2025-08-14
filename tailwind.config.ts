import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: '#F2C14E',
          red: '#D94E41',
          brown: '#8B5E3C',
          dark: '#2E1F15',
          light: '#FFF8E7'
        }
      },
      boxShadow: {
        card: '0 8px 24px rgba(0,0,0,0.08)'
      },
      borderRadius: {
        xl: '1rem'
      }
    }
  },
  plugins: []
};

export default config;