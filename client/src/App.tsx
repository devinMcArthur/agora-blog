import * as React from "react";
import ReactGA from "react-ga";

import Provider from "./components/Providers";
import Router from "./components/Router";
import GlobalStyle from "./GlobalStyle";

function App() {
  ReactGA.initialize("G-Q1KPBQK41S");

  return (
    <Provider>
      <GlobalStyle />
      <Router />
    </Provider>
  );
}

export default App;
