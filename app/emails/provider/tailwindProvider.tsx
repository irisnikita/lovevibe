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
  theme: THEME,
};

export const TailWindProvider: React.FC<TailWindProviderProps> = (props) => {
  const {children, config = defaultConfig, ...restProps} = props;

  return (
    <Tailwind config={config} {...restProps}>
      {children}
    </Tailwind>
  );
};
