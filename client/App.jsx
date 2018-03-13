import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import Dashboard from "./containers/DashboardContainer.jsx";
import Routes from "./containers/RoutesContainer.jsx";

import NavBar from "./components/NavBar.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    //    this.state = {};
  }

  render() {
    return (
      <MuiThemeProvider>
        <NavBar />
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Dashboard} />
            <Route path="/routes" component={Routes} />
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
