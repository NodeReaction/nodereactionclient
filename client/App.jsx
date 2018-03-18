import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import NavBar from "./components/NavBar.jsx";
import DashboardContainer from "./containers/DashboardContainer.jsx";
import RoutesContainer from "./containers/RoutesContainer.jsx";
import TracesContainer from "./containers/TracesContainer.jsx"
import RouteContainer from "./containers/RouteContainer.jsx";

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
            <Route className="sectionContainer" exact path="/" component={DashboardContainer} />
            <Route className="sectionContainer" path="/dashboard" component={DashboardContainer} />
            <Route className="sectionContainer" path="/routes" component={RoutesContainer} />
            <Route className="sectionContainer" path="/:route/:method/:default_time" component={RouteContainer} />
            <Route className="sectionContainer" path="/traces" component={TracesContainer} />
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
