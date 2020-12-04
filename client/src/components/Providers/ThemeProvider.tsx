import * as React from "react";
import {
  ThemeProvider as StyledComponentsThemeProvider,
  DefaultTheme,
} from "styled-components";

import type {} from "styled-components/cssprop";

// IN px
const breakpoints = ["667px", "1023px", "1694px"];

// Navy
const navyLight = "#95b2d0";
const navy = "#29425d";
const navyDark = "#1f3247";

// Sky
const skyLight = "#b3dde5";
const sky = "#96cfdb";
const skyDark = "#7ac3d1";

// Coral
const coralLight = "#f1a7ac";
const coral = "#ec8c93";
const coralDark = "#ea7b83";

// Gray
const grayDark = "#747778";

// Black
const black = "#000000";

const colors = {
  // navy
  navyLightest: "#cad8e8",
  navyLighter: "#95b2d0",
  navyLight: navyLight,
  navy: navy,
  navyDark: navyDark,
  // sky
  skyLightest: "#ecf6f8",
  skyLighter: "#d9eef2",
  skyLight: skyLight,
  sky: sky,
  skyDark: skyDark,
  // coral
  coralLighter: "#fbe9ea",
  coralLight: coralLight,
  coral: coral,
  coralDark: coralDark,
  // grey
  greyLightest: "#f9f8f7",
  greyLighter: "#f1f0ee",
  greyLight: "#e5e4e0",
  grey: "#aeaaa9",
  greyDark: grayDark,
  greyDarkest: "#54575a",
  //white
  white: "#ffffff",

  // Labels
  primaryLight: navyLight,
  primary: navy,
  primaryDark: navyDark,

  secondaryLight: skyLight,
  secondary: sky,
  secondaryDark: skyDark,

  tertiaryLight: coralLight,
  tertiary: coral,
  tertiaryDark: coralDark,

  successLight: "#93c9ab",
  success: "#70cb98",
  successDark: "#64b688",

  dangerLight: "#cf5155",
  danger: "#d1343a",
  dangerDark: "#d1151c",

  warningLight: "#f5cc64",
  warning: "#f5c345",
  warningDark: "#f5b81d",

  infoLight: "#307d8a",
  info: "#117a8b",
  infoDark: "#01778a",

  black,

  muted: "rgba(116, 119, 120, 0.7)",

  // Font
  fontDark: black,
  fontLight: grayDark,
};

const fontSizes = {
  amoeba: "10px",
  snail: "13px",
  mouse: "16px",
  otter: "20px",
  dolphin: "26px",
  hippo: "32px",
  mammoth: "41px",
  whale: "52px",
};

const fontWeight = {
  title: "600",
  heavy: "700",
};

const space = {
  vaccuum: "0px",
  moon: "4px",
  mars: "8px",
  earth: "16px",
  saturn: "32px",
  sun: "64px",
};

let borders = {
  light: `1px solid ${colors.greyLight};`,
  dark: `1px solid ${colors.navyDark};`,
  alert: `1px solid ${colors.coralDark};`,
};

let radii = {
  small: "4px",
  medium: "10px",
  large: "16px",
};

let shadows = {
  normal: `0px 0px 9px -4px rgba(0, 0, 0, 0.75);`,
  focused: `0px 0px 8px -1px rgba(0,0,0,1);`,
  bottomShadow: `0px 2px 3px 0px rgba(0, 0, 0, 0.50);`,
};

let inputStyles = {
  outline: `border: ${borders.light}; border-radius: ${radii.small};`,
  small: `height: calc(1.5em + .5rem + 2px); padding: 0.25rem 0.5rem; font-size: 0.875rem;`,
  medium: `height: calc(1.5em + 0.75rem + 2px); padding: 0.5rem 1rem; font-size: 1rem;`,
  large: `height: calc(1.5em + 1rem + 2px); padding: 0.5rem 1rem; font-size: 1.25rem;`,
};

let labelStyles = {
  info: `font-size: ${fontSizes.snail}; color: ${colors.fontLight}; margin-bottom: 0.5rem;`,
  error: `font-size: ${fontSizes.snail}; color: ${colors.danger}; font-weight: bold; margin-bottom: 0.5rem;`,
  label: `font-size: ${fontSizes.snail}; font-weight: bold; color: ${colors.fontDark};`,
};

export const AgoraTheme: DefaultTheme = {
  breakpoints,
  colors,
  fontSizes,
  space,
  borders,
  fontWeight,
  radii,
  shadows,
  inputStyles,
  labelStyles,
};

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StyledComponentsThemeProvider theme={AgoraTheme}>
      {children}
    </StyledComponentsThemeProvider>
  );
}
