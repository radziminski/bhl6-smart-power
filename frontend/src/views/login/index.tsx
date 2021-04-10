import Box, { FlexBox } from 'components/Box';
import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';

const Root = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`;

const Left = styled.div`
  width: 55%;
  height: 100vh;
  background: linear-gradient(
    to bottom right,
    ${(props) => props.theme.colors.primary},
    ${(props) => props.theme.colors.primaryMid}
  );
  display: flex;
  padding-left: 10rem;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.whiteTint};
`;

const Right = styled.div`
  width: 45%;
  height: 100vh;
  padding: 4rem;
  background: ${(props) => props.theme.colors.whiteTint};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 3.8rem;
  font-weight: 600;
  line-height: 100%;
  margin-bottom: 0rem;
`;

const Subtitle = styled.h2`
  font-size: 1.6rem;
  padding-right: 12rem;
  font-weight: 400;
  line-height: 100%;
  margin-bottom: 6rem;
`;

const Accent = styled.span`
  background: linear-gradient(
    to bottom right,
    ${(props) => props.theme.colors.accentLight},
    ${(props) => props.theme.colors.accent}
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const LoginTitle = styled.h3`
  font-size: 2rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.primaryDark};
`;

const Button = styled.button`
  border: none;
  text-decoration: none;
  width: 18rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  border-radius: 1rem;

  font-weight: 600;
  text-transform: uppercase;

  background: linear-gradient(
    to bottom right,
    ${(props) => props.theme.colors.primary} 30%,
    ${(props) => props.theme.colors.primaryMid}
  );

  color: ${(props) => props.theme.colors.whiteTint};
  font-size: 1.4rem;
`;

const LoginView = () => {
  const history = useHistory();
  return (
    <Root>
      <Left>
        <FlexBox width='900px' flexDirection='column'>
          <Title>
            Welcome to <br /> <Accent>Smart</Accent> Power!
          </Title>
          <Subtitle>
            Application for power and energy management in your Smart Home.
          </Subtitle>
        </FlexBox>
      </Left>
      <Right>
        <Box>
          <LoginTitle>Login to your account:</LoginTitle>
          <Button onClick={() => history.push('/')}>Sign in</Button>
        </Box>
      </Right>
    </Root>
  );
};

export default LoginView;
