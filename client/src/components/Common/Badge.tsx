import React from "react";
import styled from "styled-components";
import { space, typography } from "styled-system";

import { AgoraTheme } from "../Providers/ThemeProvider";

interface BadgeProps {
  variant: keyof typeof AgoraTheme.colors;
  color: keyof typeof AgoraTheme.colors;
}

const BadgeContainer = styled.div<BadgeProps>`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${(props) =>
    props.variant && props.theme.colors[props.variant]
      ? props.theme.colors[props.variant]
      : props.theme.colors.success};
  text-align: center;
  padding: 0.25em 0.4em;
  font-size: 75%;
  font-weight: 700;
  color: ${(props) =>
    props.color && props.theme.colors[props.color]
      ? props.theme.colors[props.color]
      : "#ffffff"};
  line-height: 1;
  text-align: center;
  vertical-align: baseline;
  border-radius: 0.25rem;
  ${space}
  ${typography}
`;

const Badge = ({ ...props }: BadgeProps) => {
  return <BadgeContainer {...props} />;
};

export default Badge;
