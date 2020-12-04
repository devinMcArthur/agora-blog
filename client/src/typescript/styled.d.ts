import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    breakpoints: string[];
    colors: {
      navyLightest: string;
      navyLighter: string;
      navyLight: string;
      navy: string;
      navyDark: string;

      skyLightest: string;
      skyLighter: string;
      skyLight: string;
      sky: string;
      skyDark: string;

      coralLighter: string;
      coralLight: string;
      coral: string;
      coralDark: string;

      greyLightest: string;
      greyLighter: string;
      greyLight: string;
      grey: string;
      greyDark: string;
      greyDarkest: string;

      white: string;

      primaryLight: string;
      primary: string;
      primaryDark: string;

      secondaryLight: string;
      secondary: string;
      secondaryDark: string;

      tertiaryLight: string;
      tertiary: string;
      tertiaryDark: string;

      successLight: string;
      success: string;
      successDark: string;

      dangerLight: string;
      danger: string;
      dangerDark: string;

      warningLight: string;
      warning: string;
      warningDark: string;

      infoLight: string;
      info: string;
      infoDark: string;

      black: string;

      muted: string;

      fontDark: string;
      fontLight: string;
    };
    fontSizes: {
      amoeba: string;
      snail: string;
      mouse: string;
      otter: string;
      dolphin: string;
      hippo: string;
      mammoth: string;
      whale: string;
    };
    fontWeight: {
      title: string;
      heavy: string;
    };
    space: {
      vaccuum: string;
      moon: string;
      mars: string;
      earth: string;
      saturn: string;
      sun: string;
    };
    borders: {
      light: string;
      dark: string;
      alert: string;
    };
    radii: {
      small: string;
      medium: string;
      large: string;
    };
    shadows: {
      normal: string;
      focused: string;
      bottomShadow: string;
    };
    inputStyles: {
      outline: string;
      small: string;
      medium: string;
      large: string;
    };
    labelStyles: {
      info: string;
      error: string;
      label: string;
    };
  }
}
