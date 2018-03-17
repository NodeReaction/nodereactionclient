import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import Dashboard from "./containers/DashboardContainer.jsx";
import Routes from "./containers/RoutesContainer.jsx";
import Traces from "./containers/TracesContainer.jsx"
import Analytics from "./containers/IndividualRouteContainer.jsx";

import NavBar from "./components/NavBar.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    //    this.state = {};
  }

  render() {
    return (
      <MuiThemeProvider>
        <BrowserRouter>
          <div>
            <NavBar />
            <Route exact path="/" component={Dashboard} />
            <Route path="/routes" component={Routes} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/traces" component={Traces} />
            <Route path="/:route/:method/:default_time" component={Analytics} />
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
