import styled from 'styled-components';
import {
  background,
  BackgroundProps,
  border,
  BorderProps,
  boxShadow,
  BoxShadowProps,
  color,
  ColorProps,
  compose,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  space,
  SpaceProps,
  textAlign,
  TextAlignProps
} from 'styled-system';

type BoxProps = FlexboxProps &
  LayoutProps &
  PositionProps &
  SpaceProps &
  BackgroundProps &
  BorderProps &
  BoxShadowProps &
  TextAlignProps &
  ColorProps;

export const boxStyledSystem = compose(
  border,
  color,
  flexbox,
  layout,
  position,
  space,
  boxShadow,
  textAlign,
  background
);

const Box = styled.div<BoxProps>({ flexShrink: 0 }, boxStyledSystem);

export const FlexBox = styled(Box)({ display: 'flex' });
export default Box;
