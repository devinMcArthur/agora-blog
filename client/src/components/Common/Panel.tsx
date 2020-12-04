import styled from "styled-components";
import {
  layout,
  flexbox,
  color,
  background,
  border,
  space,
} from "styled-system";

type PanelProps = {
  variant?: "card";
  flexDirection?: "row" | "column";
  marginTop?: string;
  justifyContent?: string;
  alignItems?: string;
};

const Panel = styled.div<PanelProps>`
  display: flex;
  padding: 15px;
  ${layout}
  ${flexbox}
  ${color}
  ${background}
  ${border}
  ${space}
  ${(props) =>
    props.variant === "card"
      ? `
    border: ${props.theme.borders.light};
    border-radius: ${props.theme.radii.large};
  `
      : ""}
`;

export default Panel;
