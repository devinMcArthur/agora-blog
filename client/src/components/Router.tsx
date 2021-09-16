import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Analytics from "react-router-ga";
// import { createBrowserHistory } from "history";
// import ReactGA from "react-ga";

import HomePage from "./HomePage";
import Navbar from "./Navbar";
import Page from "./Page";
import Playground from "./Playground";
import Question from "./Question";
import Questions from "./Questions";
import Variable from "./Variable";

// const history = createBrowserHistory();

// history.listen((location) => {
//   console.log(location);
//   ReactGA.set({ page: location.pathname });
//   ReactGA.pageview(location.pathname);
// });

function Router() {
  return (
    <BrowserRouter>
      <Analytics id="UA-185033350-1" debug>
        <Switch>
          <>
            <Navbar />
            <Route exact path="/" component={HomePage} />
            <Route exact path="/p/:pageSlug" component={Page} />
            <Route exact path="/q/:questionID" component={Question} />
            <Route exact path="/questions" component={Questions} />
            <Route exact path="/v/:variableID" component={Variable} />
            <Route exact path="/playground" component={Playground} />
          </>
        </Switch>
      </Analytics>
    </BrowserRouter>
  );
}

export default Router;
