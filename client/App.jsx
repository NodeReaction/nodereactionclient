import React, { Component } from "react";
import { BrowserRouter, Route, browserHistory, Switch } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { PropsRoute, PrivateRoute } from "./auth/PrivateRoute.jsx";
import authService from "./auth/AuthService.js";
import NavBar from "./components/NavBar.jsx";
import NavBarMinimal from "./components/NavBarMinimal.jsx";

import LoginContainer from "./containers/LoginContainer.jsx";
import SignUpContainer from "./containers/SignUpContainer.jsx";
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
    this.state.timeRangeSelected = 5;
    this.state.timeRanges = [
      { label: "Last 5 minutes", offset: 5 * 60000 },
      { label: "Last 30 minutes", offset: 30 * 60000 },
      { label: "Last 1 hour", offset: 60 * 60000 },
      { label: "Last 12 hours", offset: 720 * 60000 },
      { label: "Last 1 day", offset: 1440 * 60000 },
      { label: "Last 3 days", offset: 4320 * 60000 }
    ];
    this.state.dashboardStats = {
      response_time: "",
      requests: "",
      throughput: ""
    }
    this.state.dashboardTop5 = {
      rows: ""
    }

    this.state.routesData = {};
    this.state.routeData = {};
    this.state.tracesData = {};
    //
    this.fetchDashboardStats = this.fetchDashboardStats.bind(this);
    this.fetchDashboadTop5 = this.fetchDashboadTop5.bind(this);
    this.setTimeRangeSelected = this.setTimeRangeSelected.bind(this);
    this.setTimeRangeSelected = this.setTimeRangeSelected.bind(this);
    this.populateTopState = this.populateTopState.bind(this);
    this.changeSelectedApp = this.changeSelectedApp.bind(this);
    this.updateApps = this.updateApps.bind(this);
    
  }
  fetchDashboardStats = (app_id, date) => {
    window
      .fetch(`/api/dashboard/stats/${app_id}/${date}`)
      .then(res => res.json())
      .then(json => {
        let data = json[0];
        this.setState({dashboardStats: {
          response_time: data.avg_duration,
          requests: data.total_requests,
          throughput: ""
        }});
      });
  };

  fetchDashboadTop5 = (app_id, date) => {
    window
      .fetch(`/api/dashboard/top/${app_id}/${date}`)
      .then(res => res.json())
      .then(json => {
        this.setState({dashboardTop5: {
          rows: json
        }});
      });
  };


  setTimeRangeSelected(id){
    this.setState({ timeRangeSelected: id });
  }

  // cb for when we get apps in login component. We will default select 1st
  populateTopState(data) {
    console.log("data = ", data);
    console.log("tyring to set", data.apps[0].application_id);
    const appName =
      data.apps[0].name.charAt(0).toUpperCase() +
      data.apps[0].name.slice(1).toLowerCase();
    this.setState({ applications: data.apps });
    this.setState({ selectedApp: data.apps[0].application_id });
    this.setState({ selectedAppName: appName });
    this.setState({ user_id: data.user_id });
  }

  updateApps(data) {
    this.setState({ applications: data });
  }

  changeSelectedApp(app_id, name) {
    this.setState({ selectedApp: app_id });
    const appName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    this.setState({ selectedAppName: appName });
  }

  render() {
    const login = props => {
      return <LoginContainer cb={this.populateTopState} />;
    };
    const signup = props => {
      return <SignUpContainer cb={this.populateTopState} />;
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
            <PropsRoute
              path="/(login|signup)"
              change_app={this.changeSelectedApp}
              apps={this.state.applications}
              component={NavBarMinimal}
            />
            <Route className="sectionContainer" path="/login" render={login} />
            <Route className="sectionContainer" path="/signup" render={signup} />
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
              exact
              path="/"
              app_id={this.state.selectedApp}
              app_name={this.state.selectedAppName}
              timeRanges={this.state.timeRanges}
              timeRangeSelected={this.state.timeRangeSelected}
              setTimeRangeSelected={this.setTimeRangeSelected}

              dashboardStats={this.state.dashboardStats}
              dashboardTop5={this.state.dashboardTop5}
              fetchDashboardStats={this.fetchDashboardStats}
              fetchDashboadTop5={this.fetchDashboadTop5}

              
              render={DashboardContainer}
            />
            <PrivateRoute
              className="sectionContainer"
              path="/dashboard"
              app_id={this.state.selectedApp}
              app_name={this.state.selectedAppName}
              timeRanges={this.state.timeRanges}
              timeRangeSelected={this.state.timeRangeSelected}
              setTimeRangeSelected={this.setTimeRangeSelected}


              dashboardStats={this.state.dashboardStats}
              dashboardTop5={this.state.dashboardTop5}
              fetchDashboardStats={this.fetchDashboardStats}
              fetchDashboadTop5={this.fetchDashboadTop5}

              component={DashboardContainer}
            />
            <PrivateRoute
              className="sectionContainer"
              path="/analytics/:route/:method"
              app_id={this.state.selectedApp}
              app_name={this.state.selectedAppName}
              timeRanges={this.state.timeRanges}
              timeRangeSelected={this.state.timeRangeSelected}
              setTimeRangeSelected={this.setTimeRangeSelected}
              component={RouteContainer}
            />
            <PrivateRoute
              className="sectionContainer"
              path="/routes"
              app_id={this.state.selectedApp}
              app_name={this.state.selectedAppName}
              timeRanges={this.state.timeRanges}
              timeRangeSelected={this.state.timeRangeSelected}
              setTimeRangeSelected={this.setTimeRangeSelected}
              component={RoutesContainer}
            />
            
            <PrivateRoute
              className="sectionContainer"
              path="/traces"
              app_id={this.state.selectedApp}
              app_name={this.state.selectedAppName}
              timeRanges={this.state.timeRanges}
              timeRangeSelected={this.state.timeRangeSelected}
              setTimeRangeSelected={this.setTimeRangeSelected}
              component={TracesContainer}
            />
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
