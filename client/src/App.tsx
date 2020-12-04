import * as React from "react";
import Provider from "./components/Providers";
import Router from "./components/Router";
import GlobalStyle from "./GlobalStyle";

function App() {
  return (
    <Provider>
      <GlobalStyle />
      <Router />
    </Provider>
  );
}

export default App;
