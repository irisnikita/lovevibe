'use client';

// Types
import {theme, type ThemeConfig} from 'antd';

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
    fontFamily: `Urbanist, sans-serif`,
    fontSize: 16,
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
    controlPaddingHorizontal: 12,
    colorTextPlaceholder: '#777E90',
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
  },
};

export const GLOBAL_TOKEN = getDesignToken(THEME);

export {darkAlgorithm, defaultAlgorithm, useToken};
