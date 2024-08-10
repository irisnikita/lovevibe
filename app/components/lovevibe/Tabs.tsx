import styled from '@emotion/styled';
import AntdTabs from 'antd/es/tabs';

const Tabs = styled(AntdTabs)`
  .ant-tabs-nav {
    margin-bottom: 24px;

    &::before {
      border: none !important;
    }
  }

  .ant-tabs-tab {
    font-weight: 700;
    padding: 8px 12px;
    color: var(--neutrals-4-color) !important;
  }

  .ant-tabs-ink-bar {
    height: 3px !important;
    border-radius: 4px;
  }
`;

export {Tabs};
