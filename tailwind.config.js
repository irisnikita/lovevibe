import formsPlugin from '@tailwindcss/forms';
import typographyPlugin from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  plugins: [formsPlugin, typographyPlugin],
  theme: {
    container: {
      center: true,
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      },
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '10rem',
      },
    },
    extend: {
      colors: {
        primary: '#ef466f',
        secondary: '#f4c73c',
        success: '#45b26b',
        danger: '#ea3223',
        error: '#ef4646',
        'neutrals-1': '#141416',
        'neutrals-2': '#23262f',
        'neutrals-3': '#353945',
        'neutrals-4': '#777e90',
        'neutrals-5': '#b1b5c3',
        'neutrals-6': '#dfe2e7',
        'neutrals-8': '#fcfcfd',
        'neutrals-9': '#211b0a',
      },
    },
  },
};
