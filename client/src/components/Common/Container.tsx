import styled from "styled-components";
import { layout, space, flexbox } from "styled-system";

import { AgoraTheme } from "../Providers/ThemeProvider";

interface ContainerProps {
  layout?: "mini" | "midi" | "maxi" | "full";
  shadowType?: keyof typeof AgoraTheme.shadows;
  flexDirection?: string;
  height?: string;
  maxWidth?: string;
  width?: string;
  py?: string;
  margin?: string;
  marginLeft?: string;
  marginBottom?: string;
  marginRight?: string;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  margin: auto;
  padding-left: 15px;
  padding-right: 15px;
  ${(props) => {
    const { layout, shadowType } = props;

    let layoutString = "";
    if (layout === "mini") layoutString = `max-width: 28rem;`;
    if (layout === "midi") layoutString = `max-width: 48rem;`;
    if (layout === "maxi") layoutString = `max-width: 72rem;`;
    if (layout === "full")
      layoutString = `
      height: 100vh;
      min-width: 100vw;
      overflow-x: auto;
      padding: 0;
    `;

    return `
    ${layoutString}
    ${shadowType ? `box-shadow: ${props.theme.shadows[shadowType]}` : null}`;
  }}
  ${flexbox}
  ${layout}
  ${space}
`;

export default Container;
