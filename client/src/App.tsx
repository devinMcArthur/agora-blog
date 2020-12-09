import * as React from "react";
import ReactGA from "react-ga";

import Provider from "./components/Providers";
import Router from "./components/Router";
import GlobalStyle from "./GlobalStyle";

ReactGA.initialize("UA-185033350-1");

function App() {
  return (
    <Provider>
      <GlobalStyle />
      <Router />
    </Provider>
  );
}

export default App;
