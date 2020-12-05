import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import HomePage from "./HomePage";
import Navbar from "./Navbar";
import Page from "./Page";
import Question from "./Question";
import Questions from "./Questions";
import Variable from "./Variable";

function Router() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/p/:pageSlug" component={Page} />
        <Route exact path="/q/:questionID" component={Question} />
        <Route exact path="/questions" component={Questions} />
        <Route exact path="/v/:variableID" component={Variable} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
