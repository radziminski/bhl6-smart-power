import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
  width: 100%;
  height: 20rem;
  background: ${(props) => props.theme.colors.white};
  box-shadow: 0 0.8rem 1rem rgba(138, 99, 99, 0.05);
  border-radius: 1rem;
`;

const ModeInfoBox: React.FC = () => {
  return <Root></Root>;
};

export default ModeInfoBox;
