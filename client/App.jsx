import React, { Component } from "react";
import { BrowserRouter, Route, browserHistory, Switch } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { PropsRoute, PrivateRoute } from "./auth/PrivateRoute.jsx";
import authService from "./auth/AuthService.js";
import NavBar from "./components/NavBar.jsx";

import LoginContainer from "./containers/LoginContainer.jsx";
import AccountContainer from "./containers/AccountContainer.jsx";
import ApplicationsContainer from "./containers/ApplicationsContainer.jsx";
import DashboardContainer from "./containers/DashboardContainer.jsx";
import RoutesContainer from "./containers/RoutesContainer.jsx";
import TracesContainer from "./containers/TracesContainer.jsx";
import RouteContainer from "./containers/RouteContainer.jsx";
import NotFoundContainer from "./containers/NotFoundContainer.jsx";
//
import getMuiTheme from "material-ui/styles/getMuiTheme";
import {
  cyan500,
  cyan700,
  pinkA200,
  deepOrange500,
  deepOrange700,
  grey100,
  grey300,
  grey400,
  grey500,
  blueGrey300,
  blueGrey800,
  white,
  darkBlack,
  fullBlack
} from "material-ui/styles/colors";
import { fade } from "material-ui/utils/colorManipulator";
import spacing from "material-ui/styles/spacing";
//
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.user = { username: "", email: "", isLoggedIn: false };
    this.state.applications = [];
    this.state.selectedApp = undefined;

    this.populateApplications = this.populateApplications.bind(this);
    this.changeSelectedApp = this.changeSelectedApp.bind(this);
  }

  //cb for when we get apps in login component. We will default select 1st
  populateApplications(apps) {
    console.log("filling apps", apps);
    this.setState({ applications: apps });
    this.setState({ selectedApp: apps[0] });
  }

  changeSelectedApp(app_id) {
    this.setState({ selectedApp: app_id });
  }

  render() {
    const muiTheme = getMuiTheme({
      spacing: spacing,
      fontFamily: "Open Sans, sans-serif",
      palette: {
        primary1Color: "#000000", // button color
        primary2Color: blueGrey800,
        primary3Color: grey400,
        accent1Color: "#FF530D",
        accent2Color: grey100,
        accent3Color: grey500,
        textColor: darkBlack,
        alternateTextColor: white,
        canvasColor: white,
        borderColor: grey300,
        disabledColor: fade(darkBlack, 0.3),
        pickerHeaderColor: "#FF530D",
        clockCircleColor: fade("#FF530D", 0.07),
        shadowColor: fullBlack
      },
      appBar: {
        height: 50
      }
    });

    const login = props => {
      return <LoginContainer cb={this.populateApplications} />;
    };

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <BrowserRouter>
          <div>
            <PropsRoute
              path="/"
              navbarToggle={this.navbarToggle}
              change_app={this.changeSelectedApp}
              apps={this.state.applications}
              component={NavBar}
            />
            <Route className="sectionContainer" path="/login" render={login} />
            <PrivateRoute
              className="sectionContainer"
              exact
              path="/"
              app_id={this.state.selectedApp}
              render={DashboardContainer}
            />
            <PrivateRoute
              className="sectionContainer"
              path="/account"
              component={AccountContainer}
            />
            <PrivateRoute
              path="/applications"
              app_id={this.state.selectedApp}
              component={ApplicationsContainer}
            />
            <PrivateRoute
              className="sectionContainer"
              path="/dashboard"
              app_id={this.state.selectedApp}
              component={DashboardContainer}
            />
            <PrivateRoute
              className="sectionContainer"
              path="/routes"
              app_id={this.state.selectedApp}
              component={RoutesContainer}
            />
            <PrivateRoute
              className="sectionContainer"
              path="/:route/:method"
              app_id={this.state.selectedApp}
              component={RouteContainer}
            />
            <PrivateRoute
              className="sectionContainer"
              path="/traces"
              app_id={this.state.selectedApp}
              component={TracesContainer}
            />
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
