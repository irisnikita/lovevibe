'use client';

// Types
import {theme, type ThemeConfig} from 'antd';
import {cloneDeep} from 'lodash';

// Variables
const {defaultAlgorithm, darkAlgorithm, getDesignToken, useToken} = theme;

type TExtendTheme = {
  token: {
    headerHeight: number;
    siderWidth: number;
    [key: string]: unknown;
  };
};

export type TTheme = {
  token?: ThemeConfig['token'] & TExtendTheme['token'];
  components?: ThemeConfig['components'];
  algorithm?: ThemeConfig['algorithm'];
  hashed?: ThemeConfig['hashed'];
  inherit?: ThemeConfig['inherit'];
};

export const THEME: TTheme = {
  token: {
    // colorText: '#000000',
    // colorTextPlaceholder: '#BEBEBE',
    colorError: '#ef4646',
    colorPrimary: '#ef466f',
    colorLink: '#ef466f',
    colorLinkHover: '#ef466f',
    colorText: '#141416',
    fontFamily: `Urbanist, sans-serif`,
    fontSize: 16,
    fontSizeSM: 14,
    fontSizexl: 16,
    siderWidth: 270,
    headerHeight: 64,
    paddingXXS: 4,
    borderRadiusXS: 4,
    boxShadowSecondary: `0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 9px 28px 8px rgba(0, 0, 0, 0.05)
    `,
  },
};

THEME.components = {
  Tabs: {
    horizontalItemGutter: 24,
  },
  Form: {
    labelColor: '#141416',
    labelFontSize: 18,
  },
  Divider: {
    colorSplit: '#DFE2E7',
    marginLG: 34,
  },
  Select: {
    borderRadius: 8,
    controlHeight: 48,
    controlPaddingHorizontal: 12,
    colorTextPlaceholder: '#777E90',
  },
  Input: {
    borderRadius: 8,
    controlHeight: 48,
    controlHeightSM: 36,
    borderRadiusSM: 8,
    controlPaddingHorizontal: 12,
    colorTextPlaceholder: '#777E90',
    fontSizeSM: 14,
  },
  InputNumber: {
    borderRadius: 8,
    controlHeight: 48,
    controlPaddingHorizontal: 12,
    colorTextPlaceholder: '#777E90',
  },
  Button: {
    borderRadius: 8,
    fontWeight: 700,
    controlHeight: 48,
    defaultColor: 'var(--primary-color)',
    defaultBorderColor: 'var(--primary-color)',
  },
  DatePicker: {
    borderRadius: 8,
    controlHeight: 48,
    colorTextPlaceholder: '#777E90',
  },
  Modal: {
    colorIcon: '#141416',
  },
  Switch: {
    trackMinWidth: 64,
    trackHeight: 32,
    handleSize: 24,
  },
  Alert: {
    defaultPadding: '16px',
    colorInfoBg: '#3772FF19',
    colorInfoBorder: 'transparent',
    fontSizeIcon: 24,
    marginXS: 10,
  },
  Card: {
    colorBgContainer: 'var(--neutrals-8-color)',
    borderRadiusLG: 20,
    colorBorderSecondary: 'var(--neutrals-7-color)',
  },
};

export const VIOLET_THEME: TTheme = cloneDeep(THEME);
export const BLUE_THEME: TTheme = cloneDeep(THEME);
export const ORANGE_THEME: TTheme = cloneDeep(THEME);

VIOLET_THEME.token = {
  ...VIOLET_THEME.token,
  colorPrimary: '#613193',
  colorLink: '#613193',
  colorLinkHover: '#613193',
} as any;

BLUE_THEME.token = {
  ...BLUE_THEME.token,
  colorPrimary: '#2A5994',
  colorLink: '#2A5994',
  colorLinkHover: '#2A5994',
} as any;

ORANGE_THEME.token = {
  ...ORANGE_THEME.token,
  colorPrimary: '#EE774A',
  colorLink: '#EE774A',
  colorLinkHover: '#EE774A',
} as any;

export const GLOBAL_TOKEN = getDesignToken(THEME);

export {darkAlgorithm, defaultAlgorithm, useToken};
