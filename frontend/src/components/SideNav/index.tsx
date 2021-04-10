import Box from 'components/Box';
import Logo from 'components/Logo';
import React, { useState } from 'react';
import styled from 'styled-components';
import { RiDashboardFill } from 'react-icons/ri';
import { IoIosStats } from 'react-icons/io';
import { BsPersonLinesFill } from 'react-icons/bs';
import { HiOutlineLogout } from 'react-icons/hi';
import { COLORS } from 'styles/theme';

const Root = styled.div`
  height: 100%;
  width: 8rem;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: 0 1rem 1.4rem rgba(0, 0, 0, 0.03);
  padding: 2rem;
  padding-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Icon = styled.div<{ selected?: boolean }>`
  font-size: 2rem;
  color: ${(props) =>
    props.selected ? props.theme.colors.primary : props.theme.colors.black};
  padding: 0.8rem;
  opacity: ${(props) => (props.selected ? 0.95 : 0.22)};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) =>
    props.selected ? props.theme.colors.primary : 'transparent'}10;
  cursor: pointer;
  transition: all 0.25s;
  margin-bottom: 1.8rem;

  &:hover {
    opacity: ${(props) => (props.selected ? 1 : 0.5)};
  }
`;

const SideNav = () => {
  const [selected, setSelected] = useState(0);

  return (
    <Root>
      <Logo />
      <Box
        marginY='2rem'
        width='90%'
        height='1px'
        background={COLORS.primary}
        opacity={0.15}
      />
      <Icon selected={selected === 0} onClick={() => setSelected(0)}>
        <RiDashboardFill />
      </Icon>
      <Icon selected={selected === 1} onClick={() => setSelected(1)}>
        <IoIosStats />
      </Icon>
      <Icon selected={selected === 2} onClick={() => setSelected(2)}>
        <BsPersonLinesFill />
      </Icon>
      <Box
        marginY='2rem'
        marginTop='auto'
        width='90%'
        height='1px'
        background={COLORS.primary}
        opacity={0.15}
      />
      <Icon>
        <HiOutlineLogout />
      </Icon>
    </Root>
  );
};

export default SideNav;
