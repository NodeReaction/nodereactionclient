import React, { Component } from "react";
import { BrowserRouter, Route, browserHistory, Switch } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import NavBar from "./components/NavBar.jsx";

import LoginContainer from "./containers/LoginContainer.jsx";
import AccountContainer from "./containers/AccountContainer.jsx";
import ApplicationsContainer from "./containers/ApplicationsContainer.jsx";
import DashboardContainer from "./containers/DashboardContainer.jsx";
import RoutesContainer from "./containers/RoutesContainer.jsx";
import TracesContainer from "./containers/TracesContainer.jsx"
import RouteContainer from "./containers/RouteContainer.jsx";
import NotFoundContainer from "./containers/NotFoundContainer.jsx";


class App extends Component {
  constructor(props) {
    super(props);
       this.state = {};
       this.state.authenticated = true;
  }

  render() {
    const dashboard = (props) => {
      return <DashboardContainer authenticated={this.state.authenticated}/>
    }
    const login = (props) => {
      return <LoginContainer  authenticated={this.state.authenticated}/>
    }
    return (
      <MuiThemeProvider>
        <BrowserRouter>
          <div>
            <NavBar />
            <Route className="sectionContainer" exact path="/" render={dashboard} />
            <Route className="sectionContainer" path="/login" render={login} />
            <Route className="sectionContainer" path="/account" component={AccountContainer} />
            <Route className="sectionContainer" path="/applications" component={ApplicationsContainer} />
            <Route className="sectionContainer" path="/dashboard" component={DashboardContainer} />
            <Route className="sectionContainer" path="/routes" component={RoutesContainer} />
            <Route className="sectionContainer" path="/:route/:method/:default_time" component={RouteContainer} />
            <Route className="sectionContainer" path="/traces" component={TracesContainer} />
            {/* <Route className="sectionContainer" path="*" exact={true}  component={NotFoundContainer} /> */}
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;


/*//

import React, { Component } from "react";
import { BrowserRouter, Route, browserHistory, Switch } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import NavBar from "./components/NavBar.jsx";

import LoginContainer from "./containers/LoginContainer.jsx";
import AccountContainer from "./containers/AccountContainer.jsx";
import ApplicationsContainer from "./containers/ApplicationsContainer.jsx";
import DashboardContainer from "./containers/DashboardContainer.jsx";
import RoutesContainer from "./containers/RoutesContainer.jsx";
import TracesContainer from "./containers/TracesContainer.jsx"
import RouteContainer from "./containers/RouteContainer.jsx";
import NotFoundContainer from "./containers/NotFoundContainer.jsx";


class App extends Component {
  constructor(props) {
    super(props);
       this.state = {};
       this.state.authenticated = true;
  }

  render() {
    // this method of declaring a function allows for passing of props to child components
    const dashboard = (props) => {
      return <DashboardContainer authenticated={this.state.authenticated}/>
    }
    const login = (props) => {
      return <LoginContainer authenticated={this.state.authenticated}/>
    }
    const account = (props) => {
      return <AccountContainer authenticated={this.state.authenticated}/>
    }
    const applications = (props) => {
      return <ApplicationsContainer authenticated={this.state.authenticated}/>
    }
    const routes = (props) => {
      return <RoutesContainer authenticated={this.state.authenticated}/>
    }
    const route = (props) => {
      return <RouteContainer method={"get"} route={"/dogs"} authenticated={this.state.authenticated}/>
    }
    const traces = (props) => {
      return <TracesContainer authenticated={this.state.authenticated}/>
    }
    const notFound = (props) => {
      return <NotFoundContainer authenticated={this.state.authenticated}/>
    }
    return (
      <MuiThemeProvider>
        <BrowserRouter>
          <div>
            <NavBar />
            <Route className="sectionContainer" exact path="/" render={dashboard} />
            <Route className="sectionContainer" path="/login" render={login} />
            <Route className="sectionContainer" path="/account" render={account} />
            <Route className="sectionContainer" path="/applications" render={applications} />
            <Route className="sectionContainer" path="/dashboard" render={dashboard} />
            <Route className="sectionContainer" path="/routes" render={routes} />
            <Route className="sectionContainer" path="/:route/:method/:default_time" render={route} />
            <Route className="sectionContainer" path="/traces" render={traces} />
            <Route className="sectionContainer" path="*" exact={true}  component={NotFoundContainer} />
            </div>
            </BrowserRouter>
          </MuiThemeProvider>
        );
      }
    }
    
    export default App;
    
//*/