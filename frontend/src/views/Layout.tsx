import SideBar, { SIDEBAR_WIDTH } from 'components/SideBar';
import SideNav from 'components/SideNav';
import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
  background-color: ${(props) => props.theme.colors.whiteTint};
  position: relative;
  height: 100vh;
  width: 100%;
  padding-right: ${SIDEBAR_WIDTH}rem;
  display: flex;
`;

const Content = styled.div`
  padding: 4rem;
  width: 100%;
  height: 100%;
`;

const ContentHeader = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 2rem;
  padding-right: 6rem;
`;

const Layout: React.FC = ({ children }) => {
  return (
    <Root>
      <SideNav />
      <Content>{children}</Content>
      <SideBar />
    </Root>
  );
};

export default Layout;
