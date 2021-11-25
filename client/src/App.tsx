import * as React from "react";

import Provider from "./components/Providers";
import Router from "./Pages/Router";

import "./App.css";

function App() {
  return (
    <Provider>
      <Router />
    </Provider>
  );
}

export default App;
