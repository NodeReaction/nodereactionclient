import React, { Component } from "react";
import { Link } from "react-router-dom";
import Divider from "material-ui/Divider";
import DropDownMenu from "material-ui/DropDownMenu";
import FlatButton from "material-ui/FlatButton";
import FontIcon from "material-ui/FontIcon";
import IconMenu from "material-ui/IconMenu";
import IconButton from "material-ui/IconButton";
import MenuItem from "material-ui/MenuItem";
import NavigationExpandMoreIcon from "material-ui/svg-icons/navigation/expand-more";
import Person from "material-ui/svg-icons/social/person";
// import Setting from 'material-ui/svg-icons/action/setting';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle
} from "material-ui/Toolbar";

export default class NavBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Toolbar className="navbar-menu">
        <ToolbarGroup>
        <IconButton touch={true}>
                <NavigationExpandMoreIcon />
              </IconButton>
        </ToolbarGroup>
        <ToolbarGroup>
        <IconMenu
            iconButtonElement={
              <IconButton touch={true}>
                <NavigationExpandMoreIcon />
              </IconButton>
            }
          >
            <MenuItem primaryText="Application 1" />
            <MenuItem primaryText="Application 2" />
          </IconMenu>
          <Link className="navbar-menu-item" to="/dashboard">
            <FlatButton size="medium" label="Dashboard" primary={true} />
          </Link>
          <Link className="navbar-menu-item" to="/routes">
            <FlatButton size="medium" label="Routes" primary={true} />
          </Link>
          <Link className="navbar-menu-item" to="/route/17/hourofthewitch">
            <FlatButton size="medium" label="Route analysis" primary={true} />
          </Link>

          <Link className="navbar-menu-item" to="/traces">
            <FlatButton size="medium" label="Traces" primary={true} />
          </Link>
          <ToolbarSeparator />

          <IconMenu
            iconButtonElement={
              <IconButton touch={true}>
                <NavigationExpandMoreIcon />
              </IconButton>
            }
          >
            <MenuItem primaryText="Profile" leftIcon={<Person />} />
            <MenuItem primaryText="Manage Applications" leftIcon={<Person />} />
            <Divider />
            <MenuItem primaryText="Logout" leftIcon={<Person />} />
          </IconMenu>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}
