import { createGlobalStyle, css } from 'styled-components';
import { normalize } from 'styled-normalize';

const baseFontFamily = 'Poppins';

const globalStyles = css`
  html {
    font-size: 100%;
    background-color: ${({ theme }) => theme.colors.white};
  }

  html,
  body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: ${baseFontFamily}, sans-serif;
    -webkit-font-smoothing: antialiased;
    font-weight: 300;
    line-height: 1.3;
    color: ${({ theme }) => theme.colors.black};
    background-color: ${({ theme }) => theme.colors.white};
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
`;

const defaultStylesReset = css`
  * {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  input,
  textarea,
  button,
  select {
    font-family: ${baseFontFamily}, sans-serif;
    border-radius: 0;
    box-sizing: border-box;
  }

  button {
    padding: 0;
    font-size: 14px;
    cursor: pointer;
    background: none;
    border: 0;
    &:focus,
    &:active {
      outline: 0;
    }
  }

  a,
  input,
  textarea,
  select {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    &:focus,
    &:active {
      outline: 0;
    }
  }

  figure {
    margin: 0;
    padding: 0;
  }
`;

export const GlobalStyles = createGlobalStyle`
  ${normalize}
  ${globalStyles}
  ${defaultStylesReset}
`;
