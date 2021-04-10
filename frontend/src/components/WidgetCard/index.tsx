import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 18rem;
  background: ${(props) => props.theme.colors.white};
  border-radius: 1.8rem;
  margin-top: 5rem;
  position: relative;
  box-shadow: 0 1rem 1.4rem rgba(0, 0, 0, 0.05);
  height: 20rem;
  flex-shrink: 0;
  margin-bottom: 2.5rem;
  margin-right: 2rem;
  padding: 2rem;
  margin-left: 1rem;
`;

const IconBox = styled.div`
  position: absolute;
  top: -2rem;
  left: calc(50% - 3rem);
  width: 6rem;
  height: 6rem;
  border-radius: 1.4rem;
  box-shadow: 0 1rem 1.4rem rgba(0, 0, 0, 0.08);
  background: ${(props) => props.theme.colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.colors.white};
  font-size: 2.7rem;
`;

const Title = styled.h4`
  margin: 0;
  margin-top: 3.2rem;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.primaryDark};
`;

interface Props {
  icon: JSX.Element;
  title?: string;
}

const WidgetCard: React.FC<Props> = ({ icon, children, title }) => {
  return (
    <Root>
      <IconBox>{icon}</IconBox>
      <Title>{title}</Title>
      {children}
    </Root>
  );
};

export default WidgetCard;
