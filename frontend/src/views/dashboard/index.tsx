import Box, { FlexBox } from 'components/Box';
import CurrModeBox from 'components/CurrModeBox';
import SideBar, { SIDEBAR_WIDTH } from 'components/SideBar';
import SideNav from 'components/SideNav';
import TouchScroll from 'components/TouchScroll';
import WidgetCard from 'components/WidgetCard';
import React, { useState } from 'react';
import styled from 'styled-components';
import { RiWaterFlashLine, RiTempColdLine } from 'react-icons/ri';
import { BiSun } from 'react-icons/bi';
import { BsBatteryCharging } from 'react-icons/bs';

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

const ProgressBarBoxLabelBox = styled.div`
  height: 100%;
  position: relative;
`;

const ProgressBarBox = styled.div`
  height: 90%;
  border: 2px solid ${(props) => props.theme.colors.accentLight};
  width: 5rem;
  margin: 0 auto;
  border-radius: 1rem;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
`;

const ProgressBarContent = styled.div<{ height: number }>`
  height: ${(props) => props.height}%;
  width: 100%;
  background: linear-gradient(
    to bottom,
    ${(props) => props.theme.colors.accentLight},
    ${(props) => props.theme.colors.accent}
  );
`;

const Label = styled.div`
  text-align: center;
  font-size: 1.4rem;
  margin: 0.5rem 0 0;
  font-weight: 600;
  color: ${(props) => props.theme.colors.accent};
`;

const LabelSmall = styled.div`
  text-align: center;
  font-size: 1.1rem;
  margin: 0.5rem 0 0;
  font-weight: 600;
  color: ${(props) => props.theme.colors.accent};
`;

const LabelBig = styled.div`
  text-align: center;
  font-size: 1.8rem;
  margin: 0.5rem 0 0;
  font-weight: 600;
  color: ${(props) => props.theme.colors.accent};
`;

const DashboardView: React.FC = () => {
  const currDay = new Date();
  const [waterLevel, setWaterLevel] = useState<number>();
  const [accLevel, setAccLevel] = useState<number>();

  const widgets = [
    {
      icon: <RiWaterFlashLine />,
      title: 'Water Level',
      content: (
        <ProgressBarBoxLabelBox>
          <ProgressBarBox>
            <ProgressBarContent height={70} />
          </ProgressBarBox>
          <Label>70%</Label>
        </ProgressBarBoxLabelBox>
      )
    },
    {
      icon: <BiSun />,
      title: 'Photovoltaics',
      content: (
        <Box margin='auto 1rem' style={{ transform: 'translateY(-1rem)' }}>
          <LabelSmall>Current power output: </LabelSmall>
          <LabelBig>20kW</LabelBig>
        </Box>
      )
    },
    {
      icon: <BsBatteryCharging />,
      title: 'Accumulator Charge',
      content: (
        <ProgressBarBoxLabelBox>
          <ProgressBarBox>
            <ProgressBarContent height={20} />
          </ProgressBarBox>
          <Label>20%</Label>
        </ProgressBarBoxLabelBox>
      )
    },

    {
      icon: <RiTempColdLine />,
      title: 'Home temperature',
      content: (
        <Box margin='auto 1rem' style={{ transform: 'translateY(-1rem)' }}>
          <LabelSmall>Current home temperature: </LabelSmall>
          <LabelBig>28°C</LabelBig>
        </Box>
      )
    },

    {
      icon: <RiTempColdLine />,
      title: 'Outside temperature',
      content: (
        <Box margin='auto 1rem' style={{ transform: 'translateY(-1rem)' }}>
          <LabelSmall>Current outside temperature: </LabelSmall>
          <LabelBig>28°C</LabelBig>
        </Box>
      )
    }
  ];

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
          <CurrModeBox mode={1} />
        </FlexBox>
        <TouchScroll>
          {widgets.map((widget) => (
            <WidgetCard
              key={widget.title}
              icon={widget.icon}
              title={widget.title}
            >
              {widget.content}
            </WidgetCard>
          ))}
          <Box width='4rem' />
        </TouchScroll>
      </Content>
      <SideBar />
    </Root>
  );
};

export default DashboardView;
