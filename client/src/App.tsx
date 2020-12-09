import * as React from "react";
import ReactGA from "react-ga";
import { createBrowserHistory } from "history";

import Provider from "./components/Providers";
import Router from "./components/Router";
import GlobalStyle from "./GlobalStyle";

ReactGA.initialize("UA-185033350-1");

function App() {
  const history = createBrowserHistory();

  history.listen((location) => {
    console.log(location);
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  });

  return (
    <Provider>
      <GlobalStyle />
      <Router />
    </Provider>
  );
}

export default App;
