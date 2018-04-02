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
import muiTheme from "./components/Theme.js";

//
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.user = { username: "", email: "", isLoggedIn: false };
    this.state.applications = [];
    this.state.selectedApp = undefined;
    this.state.selectedAppName = undefined;

    this.populateTopState = this.populateTopState.bind(this);
    this.changeSelectedApp = this.changeSelectedApp.bind(this);
    this.updateApps = this.updateApps.bind(this);
  }

  //cb for when we get apps in login component. We will default select 1st
  populateTopState(data) {
    console.log("data = ", data);
    console.log("tyring to set", data.apps[0].application_id);
    this.setState({ applications: data.apps });
    this.setState({ selectedApp: data.apps[0].application_id });
    this.setState({ selectedAppName: data.apps[0].name });
    this.setState({ user_id: data.user_id });
  }

  updateApps(data) {
    this.setState({ applications: data });
  }

  changeSelectedApp(app_id, name) {
    this.setState({ selectedApp: app_id });
    this.setState({ selectedAppName: name });
  }

  render() {
    const login = props => {
      return <LoginContainer cb={this.populateTopState} />;
    };

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <BrowserRouter>
          <div>
            <PropsRoute
              path="/(dashboard|account|applications|routes|traces|analytics)"
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
              app_name={this.state.selectedAppName}
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
              user_id={this.state.user_id}
              update_apps={this.updateApps}
              apps={this.state.applications}
              component={ApplicationsContainer}
            />
            <PrivateRoute
              className="sectionContainer"
              path="/dashboard"
              app_id={this.state.selectedApp}
              app_name={this.state.selectedAppName}
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
              path="/analytics/:route/:method"
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
