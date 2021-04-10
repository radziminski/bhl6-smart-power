import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BiRefresh, BiSun, BiCloud } from 'react-icons/bi';
import { IoMdPartlySunny } from 'react-icons/io';
import Loader from 'components/Loader';
import Box, { FlexBox } from 'components/Box';
import { IWeatherDay } from 'types';
import axios from 'axios';
import { BASE_URL } from 'constant-values';

export const SIDEBAR_WIDTH = 22;

const Root = styled.div`
  width: ${SIDEBAR_WIDTH}rem;
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.primary};
  position: fixed;
  box-shadow: 0 1rem 1.4rem rgba(138, 99, 99, 0.02);
  height: 100%;
  top: 0;
  right: 0;
  padding: 2.2rem;
  padding-top: 4rem;
  overflow-y: scroll;
`;

const Header = styled.div`
  margin-bottom: 2.5rem;
  display: flex;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 500;
`;

const HeaderIcon = styled.div`
  margin-left: auto;
  font-size: 1.4rem;
  cursor: pointer;
`;

const WeatherImage = styled.div`
  display: flex;
  justify-content: center;

  font-size: 8rem;
  color: ${(props) => props.theme.colors.primary};
`;

const WeatherTitle = styled.h4`
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.primaryDark};
  text-align: center;
  margin-top: 2.3rem;
  margin-bottom: 1.5rem;
`;

const WeatherSubTitle = styled.h5`
  margin: 0;
  font-size: 0.9rem;
  font-weight: 400;
  color: ${(props) => props.theme.colors.primaryDark};
  text-align: left;
  margin-top: 0.5rem;
`;

const ForecastCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const ForecastBox = styled.div`
  overflow-y: auto;
`;

const SideBar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [forecast, setForecast] = useState<IWeatherDay[]>();

  const fetchForecast = async () => {
    const response = await axios.get(`${BASE_URL}/weather_forecast`);
    setForecast(response.data);
  };

  useEffect(() => {
    fetchForecast();
  }, []);

  const onRefresh = () => {
    setForecast(undefined);
    fetchForecast();
  };

  return (
    <Root>
      {forecast ? (
        <>
          <Header>
            <Title>Current Weather:</Title>

            {!isLoading ? (
              <HeaderIcon onClick={onRefresh}>
                <BiRefresh />
              </HeaderIcon>
            ) : (
              <HeaderIcon onClick={onRefresh}>
                <Loader size={20} />
              </HeaderIcon>
            )}
          </Header>
          <WeatherImage>
            <IoMdPartlySunny />
          </WeatherImage>
          <WeatherTitle>
            Its looking good today! Photovoltaics are fully operational!
          </WeatherTitle>
          <WeatherSubTitle>
            Current temperature: {forecast[0].temperature}°C
          </WeatherSubTitle>
          <WeatherSubTitle>
            Current cloudiness: {forecast[0].clouds}%
          </WeatherSubTitle>
          <Box marginTop='3.6rem'>
            <WeatherTitle>Forecast for today:</WeatherTitle>
            {forecast.map((el) => {
              const date = new Date(el.time * 1000);
              return (
                <ForecastCard key={el.time}>
                  {date.toISOString().substring(0, 16).replace('T', ' ')}
                  <Box>
                    <FlexBox>
                      <Box paddingRight='8px'>
                        <BiSun />
                      </Box>
                      {Math.round(el.temperature)}°C
                    </FlexBox>
                    <FlexBox>
                      <Box paddingRight='8px'>
                        <BiCloud />
                      </Box>
                      {el.clouds}%
                    </FlexBox>
                  </Box>
                </ForecastCard>
              );
            })}
          </Box>
        </>
      ) : (
        <FlexBox justifyContent='center' alignItems='center' height='100%'>
          <Loader />
        </FlexBox>
      )}
    </Root>
  );
};

export default SideBar;
