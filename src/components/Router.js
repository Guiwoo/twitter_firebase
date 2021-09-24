import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import CreateAcc from "routes/CreateAcc";
import Missing from "routes/Missing";
import Profile from "routes/Profile";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import myRoute from "../variables/routeName";
import Navigation from "./Navigation";
import { Helmet } from "react-helmet";
import original from "assets/original.jpeg";

const AppRouter = ({
  isLoggedIn,
  userObj,
  refreshUser,
  toggleDarkMode,
  darkMode,
}) => {
  return (
    <Router basename={"https://guiwoo.github.io/twitter_firebase"}>
      <Helmet>
        <title>성투하세요..</title>
        <link rel="canonical" href={original} />
      </Helmet>
      {isLoggedIn && (
        <Navigation
          userObj={userObj}
          toggleDarkMode={toggleDarkMode}
          darkMode={darkMode}
          refreshUser={refreshUser}
        />
      )}
      <Switch>
        {isLoggedIn
          ? [
              <Route exact path={myRoute.HOME} key="home">
                <Home userObj={userObj} />
              </Route>,
              <Route
                exact
                path={myRoute.PROFILE}
                key="profile"
                refreshUser={refreshUser}
              >
                <Profile userObj={userObj} />
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
        <Route component={Missing} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
