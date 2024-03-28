// Libraries
import React from 'react';
import {
  ConfigProvider as AntdConfigProvider,
  type ConfigProviderProps as AntdConfigProviderProps,
} from 'antd';

// Constants
import {THEME} from '~/constants';
import {StyleProvider} from '@ant-design/cssinjs';

interface ConfigProviderProps extends Omit<AntdConfigProviderProps, 'theme'> {}

export const ConfigProvider: React.FC<
  React.PropsWithChildren<ConfigProviderProps>
> = (props) => {
  const {children, ...restOfProps} = props;

  return (
    <AntdConfigProvider theme={THEME} {...restOfProps}>
      <StyleProvider hashPriority="high">{children}</StyleProvider>
    </AntdConfigProvider>
  );
};
