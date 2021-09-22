import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateAcc from "routes/CreateAcc";
import Profile from "routes/Profile";
import { birghtTheme, darkTheme } from "style/style";
import { ThemeProvider } from "styled-components";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import myRoute from "../variables/routeName";
import Navigation from "./Navigation";

const AppRouter = ({
  isLoggedIn,
  userObj,
  refreshUser,
  toggleDarkMode,
  darkMode,
}) => {
  return (
    <Router>
      {isLoggedIn && (
        <Navigation
          userObj={userObj}
          toggleDarkMode={toggleDarkMode}
          darkMode={darkMode}
        />
      )}
      <Switch>
        {isLoggedIn
          ? [
              <Route exact path={myRoute.HOME} key="home">
                <Home userObj={userObj} />
              </Route>,
              <Route exact path={myRoute.PROFILE} key="profile">
                <Profile userObj={userObj} refreshUser={refreshUser} />
              </Route>,
            ]
          : [
              <Route exact path={myRoute.HOME} key="1">
                <Auth />
              </Route>,
              <Route exact path={myRoute.CREATEACC} key="acc">
                <CreateAcc />
              </Route>,
            ]}
      </Switch>
    </Router>
  );
};

export default AppRouter;
