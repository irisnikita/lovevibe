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
import {createCache, extractStyle, StyleProvider} from '@ant-design/cssinjs';

// Queries
import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from '~/queries/config';

// Types
import type Entity from '@ant-design/cssinjs/lib/Cache';

dayjs.extend(advancedFormat);
dayjs().format('Q Do k kk X x');

interface ConfigProviderProps extends AntdConfigProviderProps {}

export const ConfigProvider: React.FC<
  React.PropsWithChildren<ConfigProviderProps>
> = (props) => {
  const {children, ...restOfProps} = props;

  const cache = React.useMemo<Entity>(() => createCache(), []);

  return (
    <QueryClientProvider client={queryClient}>
      <AntdConfigProvider theme={THEME} {...restOfProps}>
        <StyleProvider hashPriority="high" cache={cache}>
          {children}
        </StyleProvider>
      </AntdConfigProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
