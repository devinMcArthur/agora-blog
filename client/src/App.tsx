import * as React from "react";
import ReactGA from "react-ga";
import { createBrowserHistory } from "history";

import Provider from "./components/Providers";
import Router from "./components/Router";
import GlobalStyle from "./GlobalStyle";

const history = createBrowserHistory();

ReactGA.initialize("UA-185033350-1");

history.listen((location) => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

function App() {
  return (
    <Provider>
      <GlobalStyle />
      <Router />
    </Provider>
  );
}

export default App;
