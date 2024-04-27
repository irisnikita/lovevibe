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
        md: '834px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      },
      padding: {
        DEFAULT: '1rem',
        sm: '1rem',
        lg: '1rem',
        xl: '1rem',
        '2xl': '10rem',
      },
    },
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        success: 'var(--success-color)',
        danger: 'var(--danger-color)',
        error: 'var(--error-color)',
        'neutrals-1': 'var(--neutrals-1-color)',
        'neutrals-2': 'var(--neutrals-2-color)',
        'neutrals-3': 'var(--neutrals-3-color)',
        'neutrals-4': 'var(--neutrals-4-color)',
        'neutrals-5': 'var(--neutrals-5-color)',
        'neutrals-6': 'var(--neutrals-6-color)',
        'neutrals-7': 'var(--neutrals-7-color)',
        'neutrals-8': 'var(--neutrals-8-color)',
        'neutrals-9': 'var(--neutrals-9-color)',
      },
    },
  },
};
