import React from 'react';
import styled from 'styled-components';
import { GoHome } from 'react-icons/go';

const Root = styled.div`
  width: 4rem;
  height: 4rem;
  background: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.whiteTint};
  font-size: 2.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0.5rem 0.8rem rgba(0, 0, 0, 0.08);
  border-radius: 1rem;
`;

const Logo = () => {
  return (
    <Root>
      <GoHome />
    </Root>
  );
};

export default Logo;
