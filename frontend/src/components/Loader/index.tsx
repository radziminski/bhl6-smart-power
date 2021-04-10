import React from 'react';
import styled from 'styled-components';

const Root = styled.div<{ size?: number }>`
  display: inline-block;
  position: relative;
  width: ${(props) => props.size ?? 80}px;
  height: ${(props) => props.size ?? 80}px;

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: ${(props) => (props.size ?? 80) - (props.size ?? 80) / 5}px;
    height: ${(props) => (props.size ?? 80) - (props.size ?? 80) / 5}px;
    margin: ${(props) => (props.size ?? 80) / 10}px;
    border: ${(props) => (props.size ?? 80) / 10}px solid
      ${(props) => props.theme.colors.primary};
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${(props) => props.theme.colors.primary} transparent
      transparent transparent;
  }
  div:nth-child(1) {
    animation-delay: -0.45s;
  }
  div:nth-child(2) {
    animation-delay: -0.3s;
  }
  div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loader: React.FC<{ size?: number }> = ({ size }) => {
  return (
    <Root size={size}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </Root>
  );
};

export default Loader;
