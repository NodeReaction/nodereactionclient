import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle
} from "material-ui/Toolbar";
import RaisedButton from "material-ui/RaisedButton";
import Analysis from "../containers/IndividualRouteContainer.jsx";

export default class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Toolbar>
        <Link to="/routes">
          <RaisedButton label="Routes" primary={true} />
        </Link>
        <Link to="/">
          <RaisedButton label="Traces" primary={true} />
        </Link>
        <Link to="/route/17/hourofthewitch">
          <RaisedButton label="Route analysis" primary={true} />
        </Link>
      </Toolbar>
    );
  }
}
