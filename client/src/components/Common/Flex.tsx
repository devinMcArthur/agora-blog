import styled from "styled-components";

import {
  layout,
  flexbox,
  color,
  background,
  border,
  space,
  shadow,
} from "styled-system";

interface FlexProps {
  flexDirection?: "row" | "column";
  justifyContent?: string;
  width?: number | string;
  alignItems?: string;
  margin?: string;
  marginRight?: string;
  border?: string;
  borderRadius?: string;
  padding?: string;
}

const Flex = styled.div<FlexProps>`
  display: flex;
  ${layout}
  ${flexbox}
  ${color}
  ${background}
  ${border}
  ${space}
  ${shadow}
`;

export default Flex;
