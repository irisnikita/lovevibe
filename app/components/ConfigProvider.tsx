// Libraries
import React from 'react';
import {
  ConfigProvider as AntdConfigProvider,
  type ConfigProviderProps as AntdConfigProviderProps,
} from 'antd';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import dayjs from 'dayjs';

// Constants
import {THEME} from '~/constants';
import {StyleProvider} from '@ant-design/cssinjs';

// Queries
import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from '~/queries/config';

dayjs.extend(advancedFormat);
dayjs().format('Q Do k kk X x');

interface ConfigProviderProps extends AntdConfigProviderProps {}

export const ConfigProvider: React.FC<
  React.PropsWithChildren<ConfigProviderProps>
> = (props) => {
  const {children, ...restOfProps} = props;

  return (
    <QueryClientProvider client={queryClient}>
      <AntdConfigProvider theme={THEME} {...restOfProps}>
        <StyleProvider hashPriority="high">{children}</StyleProvider>
      </AntdConfigProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
