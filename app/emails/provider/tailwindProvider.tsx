// Libraries
import {
  Tailwind,
  type TailwindConfig,
  type TailwindProps,
} from '@react-email/components';
import React from 'react';
import {THEME} from '~/constants';

interface TailWindProviderProps extends TailwindProps {}

const defaultConfig: TailwindConfig = {
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
        primary: '#ef466f',
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

export const TailWindProvider: React.FC<TailWindProviderProps> = (props) => {
  const {children, config = defaultConfig, ...restProps} = props;

  return (
    <Tailwind config={config} {...restProps}>
      {children}
    </Tailwind>
  );
};
