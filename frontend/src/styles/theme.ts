import { DefaultTheme } from 'styled-components';

export const COLORS = {
  black: '#000',
  transparent: 'transparent',
  white: '#fff',
  //whiteTint: '#F7F9FE',
  whiteTint: '#f2f5fa',
  primary: '#3546AB',
  primaryDark: '#0D155A',
  primaryMid: '#212E83',
  accent: '#EF582D',
  accentLight: '#F78563'
};

export const RADII = {
  regular: 4,
  dropdown: 6,
  rounded: 18,
  fullCircle: '100%'
};

export const FONT_WEIGHTS = {
  thin: 100,
  extraLight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
  extraBold: 800,
  heavy: 900
};

export const TRANSITIONS = {
  default: 'all .3s ease-in-out'
};

export const SHADOWS = {};

export const TEXT_VARIANTS = {};

export const BUTTON_VARIANTS = {
  //   primary: {
  //     backgroundColor: COLORS.primary50,
  //     color: COLORS.white,
  //     ':hover:not(:disabled)': {
  //       backgroundColor: COLORS.primary60
  //     },
  //     ':active:not(:disabled)': {
  //       backgroundColor: COLORS.primary70
  //     },
  //     ':focus:not(:active):not(:disabled)': {
  //       backgroundColor: COLORS.primary50,
  //       boxShadow: SHADOWS.focus
  //     },
  //     ':disabled': {
  //       cursor: 'not-allowed'
  //     }
  //   }
};

export const DEFAULTS = {
  duration_ms: 300,
  duration: '.3',
  easing: 'ease-in-out',
  transition: 'all .3s ease-in-out'
};

export const defaultTheme: DefaultTheme = {
  breakpoints: ['480px', '769px', '993px', '1201px', '1481px'],
  space: [0, 6, 12, 18, 24, 30, 36, 42, 48, 54, 60, 66, 72, 80, 88],
  fontSizes: [0, 12, 14, 16, 18, 20, 22, 24, 28, 32],
  fontWeights: FONT_WEIGHTS,
  colors: COLORS,
  radii: RADII,
  shadows: SHADOWS,
  textVariants: TEXT_VARIANTS,
  buttonVariants: BUTTON_VARIANTS,
  zIndices: [0, 1, 5, 10, 50, 100, 500, 1000],
  transitions: TRANSITIONS
};
