import Box, { FlexBox } from 'components/Box';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { CurrSimulationContext } from 'App';
import { BASE_URL, POWER_CONSUMPTION_MODES } from 'constant-values';
import Loader from 'components/Loader';
import TouchScroll from 'components/TouchScroll';

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

const TitleMed = styled.h3`
  color: ${(props) => props.theme.colors.primaryDark};
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
  margin-top: 0;
`;

const StepContainer = styled.div`
  width: 14rem;
  height: 12rem;
  background: linear-gradient(
    to bottom right,
    ${(props) => props.theme.colors.primary} 30%,
    ${(props) => props.theme.colors.primaryMid}
  );
  border-radius: 1rem;
  margin-right: 2rem;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
`;
const StepLine = styled.div`
  width: 12rem;
  height: 5px;
  background: linear-gradient(
    to bottom right,
    ${(props) => props.theme.colors.primary} 30%,
    ${(props) => props.theme.colors.primaryMid}
  );
  border-radius: 5px;
  margin: 0 3rem 0 1.5rem;
  flex-shrink: 0;
`;

const LineInfo = styled.div`
  color: ${(props) => props.theme.colors.primaryDark};
  font-weight: 400;
  font-size: 0.7rem;
  margin-right: 0.5rem;
`;

const ModeView: React.FC = () => {
  const simsContext = useContext(CurrSimulationContext);
  const [currMode, setCurrMode] = useState<1 | 2 | 3 | 0>();

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
    if (simsContext?.value) {
      setCurrMode((simsContext.value[0].mode - 1) as 0 | 1 | 2 | 3);
    }
  }, [simsContext]);

  useEffect(() => {
    if (!simsContext?.value) fetchSimulation();
  }, []);

  const mode =
    currMode || currMode === 0 ? POWER_CONSUMPTION_MODES[currMode] : undefined;

  const currDate = new Date();

  return (
    <>
      <ContentHeader>
        <Box>
          <Title>Current Operating Mode</Title>
          <SubTitle>
            Here you can see details about current operation mode
            <br /> and simulations for the future
          </SubTitle>
        </Box>
        <DateBox>{new Date().toDateString()}</DateBox>
      </ContentHeader>
      {mode ? (
        <Box>
          <TitleMed>{mode?.title}</TitleMed>
          {mode?.subTitles.map((el) => (
            <Box key={el} marginBottom='0.5rem'>
              <SubTitle>{el}</SubTitle>
            </Box>
          ))}

          <Box marginTop='4rem'>
            <TitleMed>Simulations for upcoming hours: </TitleMed>
            <TouchScroll>
              {simsContext?.value?.map((el, i) => (
                <FlexBox
                  key={i}
                  paddingY='5rem'
                  alignItems='center'
                  position='relative'
                >
                  <StepLine />
                  {i !== (simsContext?.value?.length || 1) - 1 && (
                    <StepContainer>
                      <Box marginBottom='0.3rem'>
                        {currDate.getHours() + i < 24
                          ? currDate.getHours() + i
                          : currDate.getHours() + i - 24}
                        :00
                      </Box>
                      <Box marginBottom='0.3rem'>
                        {el.mode
                          ? POWER_CONSUMPTION_MODES[el.mode - 1].title
                          : POWER_CONSUMPTION_MODES[0].title}
                      </Box>
                      <Box marginBottom='0.3rem'>
                        External power used: {Math.round(el.net_power_used)}kW
                      </Box>
                      <Box marginBottom='0.3rem'>
                        Money spent: {Math.round(el.net_cost)}zł
                      </Box>
                    </StepContainer>
                  )}
                  <FlexBox
                    position='absolute'
                    left={25}
                    top={145}
                    width='210px'
                    justifyContent='space-between'
                  >
                    <LineInfo>Home Temp: {Math.round(el.curr_temp)}°C</LineInfo>
                    <LineInfo>
                      Out Temp: {Math.round(el.outside_temp)}°C
                    </LineInfo>
                  </FlexBox>
                  <FlexBox
                    position='absolute'
                    left={25}
                    bottom={145}
                    width='200px'
                    justifyContent='space-between'
                  >
                    <LineInfo>
                      Accumulator: {Math.round(el.accumulator)}kW
                    </LineInfo>
                    <LineInfo>
                      Cloudiness: {1 - Math.round(el.clouding)}
                    </LineInfo>
                  </FlexBox>
                </FlexBox>
              ))}
              <Box width='10rem' />
            </TouchScroll>
          </Box>
        </Box>
      ) : (
        <FlexBox
          height='100%'
          width='100%'
          justifyContent='center'
          alignItems='center'
          paddingBottom='9rem'
        >
          <Loader />
        </FlexBox>
      )}
    </>
  );
};

export default ModeView;
