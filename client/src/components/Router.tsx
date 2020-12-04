import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import HomePage from "./HomePage";
import Navbar from "./Navbar";
import Page from "./Page";
import Question from "./Question";

function Router() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/p/:pageSlug" component={Page} />
        <Route exact path="/q/:questionID" component={Question} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
