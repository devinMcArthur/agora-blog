import * as React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import Analytics from "react-router-ga";
import DrawerContainer from "../contexts/Drawer/views/Container";
import MainPageContainer from "./Common/MainPageContainer";
import CreatePage from "./CreatePage";

import HomePage from "./HomePage";
import Navbar from "./Navbar";
import Page from "./Page";
import Playground from "./Playground";
import Question from "./Question";
import Questions from "./Questions";
import User from "./User";
import Variable from "./Variable";

function Router() {
  return (
    <BrowserRouter>
      <Analytics id="UA-185033350-1" debug>
        <Navbar />
        <MainPageContainer>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/p/:pageSlug" component={Page} />
            <Route exact path="/q/:questionID" component={Question} />
            <Route exact path="/v/:variableID" component={Variable} />
            <Route exact path="/u/:userId" component={User} />

            <Route exact path="/questions" component={Questions} />
            <Route exact path="/create-page" component={CreatePage} />
            <Route exact path="/playground" component={Playground} />
          </Switch>
          <DrawerContainer />
        </MainPageContainer>
      </Analytics>
    </BrowserRouter>
  );
}

export default Router;
