import Box, { FlexBox } from 'components/Box';
import axios from 'axios';
import CurrModeBox from 'components/CurrModeBox';
import SideBar, { SIDEBAR_WIDTH } from 'components/SideBar';
import SideNav from 'components/SideNav';
import TouchScroll from 'components/TouchScroll';
import WidgetCard from 'components/WidgetCard';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { RiWaterFlashLine, RiTempColdLine } from 'react-icons/ri';
import { BiSun } from 'react-icons/bi';
import { BsBatteryCharging } from 'react-icons/bs';
import Loader from 'components/Loader';
import { BASE_URL } from 'constant-values';
import { CurrSimulationContext } from 'App';

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

const CurrLoader: React.FC = () => (
  <FlexBox height='60%' justifyContent='center' alignItems='center'>
    <Loader />
  </FlexBox>
);

const MAX_WATER_LEVEL = 150;
const MAX_ACC_LEVEL = 7;

const DashboardView: React.FC = () => {
  const currDay = new Date();
  const [waterLevel, setWaterLevel] = useState<number>();
  const [accLevel, setAccLevel] = useState<number>();
  const [photovoltaics, setPhotoVvltaics] = useState<number>();
  const [insideTemp, setInsideTemp] = useState<number>();
  const [outsideTemp, setOutsideTemp] = useState<number>();
  const [currMode, setCurrMode] = useState<0 | 1 | 2 | 3>();
  const simsContext = useContext(CurrSimulationContext);

  const fetchWaterLevel = async () => {
    const response = await axios.get(`${BASE_URL}/water_level`);
    const water = (response.data.water_level * 100) / MAX_WATER_LEVEL;

    setWaterLevel(water);
  };

  const fetchSimulation = async () => {
    const response = await axios.get(`${BASE_URL}/plan_next_sequence`);
    const sim = response.data.alg_run_params;

    response.data.best_modes.forEach(
      (mode: number, i: number) => (sim[i]['mode'] = mode)
    );

    console.log(sim);

    simsContext?.set(sim);
  };

  useEffect(() => {
    fetchWaterLevel();
    fetchSimulation();
  }, []);

  useEffect(() => {
    if (simsContext?.value) {
      console.log(simsContext.value[0].mode - 1);

      setAccLevel(simsContext.value[0].accumulator / MAX_ACC_LEVEL);
      setCurrMode((simsContext.value[0].mode - 1) as 0 | 1 | 2 | 3);
      setInsideTemp(Math.round(simsContext.value[0].curr_temp));
      setOutsideTemp(Math.round(simsContext.value[0].outside_temp));
    }
  }, [simsContext]);

  console.log(waterLevel);

  const widgets = [
    {
      icon: <RiWaterFlashLine />,
      title: 'Water Level',
      content: waterLevel ? (
        <ProgressBarBoxLabelBox>
          <ProgressBarBox>
            <ProgressBarContent height={waterLevel} />
          </ProgressBarBox>
          <Label>{waterLevel}%</Label>
        </ProgressBarBoxLabelBox>
      ) : (
        <CurrLoader />
      )
    },
    // {
    //   icon: <BiSun />,
    //   title: 'Photovoltaics',
    //   content: photovoltaics ? (
    //     <Box margin='auto 1rem' style={{ transform: 'translateY(-1rem)' }}>
    //       <LabelSmall>Current power output: </LabelSmall>
    //       <LabelBig>20kW</LabelBig>
    //     </Box>
    //   ) : (
    //     <CurrLoader />
    //   )
    // },
    {
      icon: <BsBatteryCharging />,
      title: 'Accumulator Charge',
      content:
        accLevel || accLevel === 0 ? (
          <ProgressBarBoxLabelBox>
            <ProgressBarBox>
              <ProgressBarContent height={accLevel || 2} />
            </ProgressBarBox>
            <Label>{accLevel}%</Label>
          </ProgressBarBoxLabelBox>
        ) : (
          <CurrLoader />
        )
    },

    {
      icon: <RiTempColdLine />,
      title: 'Home temperature',
      content: insideTemp ? (
        <Box margin='auto 1rem' style={{ transform: 'translateY(-1rem)' }}>
          <LabelSmall>Current home temperature: </LabelSmall>
          <LabelBig>{insideTemp}°C</LabelBig>
        </Box>
      ) : (
        <CurrLoader />
      )
    },

    {
      icon: <RiTempColdLine />,
      title: 'Outside temperature',
      content: outsideTemp ? (
        <Box margin='auto 1rem' style={{ transform: 'translateY(-1rem)' }}>
          <LabelSmall>Current outside temperature: </LabelSmall>
          <LabelBig>{outsideTemp}°C</LabelBig>
        </Box>
      ) : (
        <CurrLoader />
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
          {
            <CurrModeBox
              mode={currMode}
              isLoadingExt={currMode !== 0 && !currMode}
            />
          }
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
