import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
  background: linear-gradient(
    to bottom right,
    ${(props) => props.theme.colors.primary} 30%,
    ${(props) => props.theme.colors.primaryMid}
  );
  height: 14rem;
  border-radius: 1rem;
  width: 30rem;
  padding: 1.8rem;
  margin-right: 2rem;
  box-shadow: 0 0.8rem 1rem rgba(138, 99, 99, 0.05);
  margin-bottom: 2rem;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1rem;
  font-weight: 400;
  color: ${(props) => props.theme.colors.white};
`;

const Mode = styled.h4`
  margin: 0;
  margin-top: 1rem;
  font-size: 2rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.white};
`;

const CurrModeBox = () => {
  return (
    <Root>
      <Title>Current running mode:</Title>
      <Mode>Mode 1</Mode>
    </Root>
  );
};

export default CurrModeBox;
