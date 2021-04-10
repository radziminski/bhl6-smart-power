import Box, { FlexBox } from 'components/Box';
import Loader from 'components/Loader';
import { POWER_CONSUMPTION_MODES } from 'constant-values/index';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { COLORS } from 'styles/theme';
import { BiRefresh } from 'react-icons/bi';
import { useHistory } from 'react-router';

const Root = styled.div`
  background: linear-gradient(
    to bottom right,
    ${(props) => props.theme.colors.primary} 30%,
    ${(props) => props.theme.colors.primaryMid}
  );
  height: 15rem;
  border-radius: 1rem;
  width: 32rem;
  padding: 1.5rem 1.8rem;
  margin-right: 2rem;
  box-shadow: 0 0.8rem 1rem rgba(138, 99, 99, 0.05);
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.white};
`;

const Mode = styled.h4`
  margin: 0;
  margin-top: 0.8rem;
  font-size: 2rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.white};
`;

const PropTitle = styled.p`
  margin: 0;
  font-size: 0.9rem;
  margin-top: 0.2rem;
  font-weight: 300;
  color: ${(props) => props.theme.colors.white};
  flex-grow: 1;
`;

interface Props {
  mode?: 0 | 1 | 2 | 3;
  isLoadingExt: boolean;
}

const CurrModeBox: React.FC<Props> = ({ mode, isLoadingExt }) => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const fetchCurrMode = async () => {
    setIsLoading(true);

    setTimeout(() => setIsLoading(false), 1500);
  };

  const currMode =
    mode || mode === 0 ? POWER_CONSUMPTION_MODES[mode] : undefined;
  return (
    <Root>
      {!isLoading && !isLoadingExt && currMode ? (
        <>
          <Title>Current running mode:</Title>
          <Mode>{currMode.title}</Mode>
          <FlexBox
            flexDirection='column'
            justifyContent='flex-end'
            marginTop='auto'
          >
            {currMode.subTitles.map((subTitle) => (
              <PropTitle key={subTitle}>{subTitle}</PropTitle>
            ))}
          </FlexBox>
          <Box
            position='absolute'
            top='1.5rem'
            right='1.5rem'
            color={COLORS.whiteTint}
            style={{ fontSize: '1.2rem', cursor: 'pointer' }}
            onClick={fetchCurrMode}
          >
            <BiRefresh />
          </Box>
          <Box
            position='absolute'
            bottom='1.5rem'
            right='1.5rem'
            color={COLORS.whiteTint}
            style={{
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
            onClick={() => history.push('/mode')}
          >
            details &rarr;
          </Box>
        </>
      ) : (
        <FlexBox justifyContent='center' alignItems='center' height='100%'>
          <Loader color={COLORS.whiteTint} />
        </FlexBox>
      )}
    </Root>
  );
};

export default CurrModeBox;
