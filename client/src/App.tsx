import * as React from "react";

import Provider from "./components/Providers";
import Router from "./components/Router";

function App() {
  return (
    <Provider>
      <Router />
    </Provider>
  );
}

export default App;
