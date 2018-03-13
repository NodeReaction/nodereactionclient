import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle
} from "material-ui/Toolbar";
import RaisedButton from "material-ui/RaisedButton";

export default class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Toolbar>
        <RaisedButton label="Routes" primary={true} />{" "}
        <RaisedButton label="Traces" primary={true} />
      </Toolbar>
    );
  }
}
