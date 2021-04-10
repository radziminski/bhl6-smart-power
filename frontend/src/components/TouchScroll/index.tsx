import Box from 'components/Box';
import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
  max-width: 90%;
  overflow-y: scroll;
  display: flex;
  position: relative;
  transform: translateX(-1rem);
`;

const Overlay = styled.div`
  height: 100%;
  width: 5rem;
  position: absolute;
  z-index: 10;
  right: 11%;
  top: 0;
  background: linear-gradient(
    to right,
    transparent,
    ${(props) => props.theme.colors.whiteTint}
  );
`;

const TouchScroll: React.FC = ({ children }) => {
  return (
    <Box position='relative'>
      <Root>{children}</Root>
      <Overlay />
    </Box>
  );
};

export default TouchScroll;
