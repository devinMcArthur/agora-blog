import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body {
    font-family: sans-serif;
    -webkit-font-smoothing: antialiased !important;
    -moz-osx-font-smoothing: grayscale !important;
    height: 100vh;
    width: 100vw;
  }
  
  #root {
    height: 100%;
    margin-right: calc(100vw - 100%);
    overflow-x: hidden;
    overflow-y: auto;
  }
`;

export default GlobalStyle;
