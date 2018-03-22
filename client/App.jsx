import React, { Component } from "react";
import { BrowserRouter, Route, browserHistory, Switch } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import PrivateRoute from "./auth/PrivateRoute.jsx";
import NavBar from "./components/NavBar.jsx";

import LoginContainer from "./containers/LoginContainer.jsx";
import AccountContainer from "./containers/AccountContainer.jsx";
import ApplicationsContainer from "./containers/ApplicationsContainer.jsx";
import DashboardContainer from "./containers/DashboardContainer.jsx";
import RoutesContainer from "./containers/RoutesContainer.jsx";
import TracesContainer from "./containers/TracesContainer.jsx";
import RouteContainer from "./containers/RouteContainer.jsx";
import NotFoundContainer from "./containers/NotFoundContainer.jsx";

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
    this.setState({ applications: apps });
    this.setState({ selectedApp: apps[0] });
  }

  changeSelectedApp(app_id) {
    this.setState({ selectedApp: app_id });
  }

  render() {
    const login = props => {
      return <LoginContainer cb={this.populateApplications} />;
    };

    return (
      <MuiThemeProvider>
        <BrowserRouter>
          <div>
            <NavBar
              change_app={this.changeSelectedApp}
              apps={this.state.applications}
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
              path="/:route/:method/:default_time"
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
