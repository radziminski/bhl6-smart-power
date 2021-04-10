import Box, { FlexBox } from 'components/Box';
import CurrModeBox from 'components/CurrModeBox';
import ModeInfoBox from 'components/ModeInfoBox';
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
`;

const DateBox = styled.div`
  margin-left: auto;
  font-size: 0.8rem;
  opacity: 0.6;
`;

const Title = styled.h2`
  color: ${(props) => props.theme.colors.primaryDark};
  font-size: 1.9rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
  margin-top: 0;
`;

const SubTitle = styled.h3`
  color: ${(props) => props.theme.colors.primaryDark};
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0;
`;

const DashboardView: React.FC = () => {
  const currDay = new Date();

  return (
    <Root>
      <SideNav />
      <Content>
        <ContentHeader>
          <Box>
            <Title>Good morning!</Title>
            <SubTitle>
              Here you can find information about your heating systems
            </SubTitle>
          </Box>
          <DateBox>{currDay.toDateString()}</DateBox>
        </ContentHeader>
        <FlexBox>
          <CurrModeBox />
        </FlexBox>
        <ModeInfoBox />
      </Content>
      <SideBar />
    </Root>
  );
};

export default DashboardView;
