import React, { Component } from "react";
import Divider from "material-ui/Divider";
import DropDownMenu from "material-ui/DropDownMenu";
import FlatButton from "material-ui/FlatButton";
import FontIcon from "material-ui/FontIcon";
import IconMenu from "material-ui/IconMenu";
import IconButton from "material-ui/IconButton";
import MenuItem from "material-ui/MenuItem";
import NavigationExpandMoreIcon from "material-ui/svg-icons/navigation/expand-more";
import PersonIcon from "material-ui/svg-icons/social/person";
import ApplicationSelector from "../components/ApplicationSelector.jsx";
import authService from "../auth/AuthService.js";
import { Link, browserHistory, withRouter } from "react-router-dom";

// import Setting from 'material-ui/svg-icons/action/setting';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle
} from "material-ui/Toolbar";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.signout = this.signout.bind(this);
  }

  signout() {
    authService.signout(() => this.props.history.push("/login"));
    // this.props.navbarToggle();
  }

  render() {
    return (
      <Toolbar className="navbar-menu">
        <ToolbarGroup>
          <Link className="navbar-menu-item" to="/dashboard">
          <h2 className="logo">NodeReaction</h2>
          </Link>
        </ToolbarGroup>
        <ToolbarGroup>
          <ApplicationSelector
            change_app={this.props.change_app}
            apps={this.props.apps}
          />

          <Link className="navbar-menu-item" to="/dashboard">
            <FlatButton size="medium" label="Dashboard" primary={true} />
          </Link>
          <Link className="navbar-menu-item" to="/routes">
            <FlatButton size="medium" label="Routes" primary={true} />
          </Link>

          <Link className="navbar-menu-item" to="/traces">
            <FlatButton size="medium" label="Traces" primary={true} />
          </Link>
          <ToolbarSeparator />

          <IconMenu
            iconButtonElement={
              <IconButton label="" touch={true}>
                <PersonIcon />
              </IconButton>
            }
          >
            <Link className="navbar-menu-item" to="/account">
              <MenuItem primaryText="Account" leftIcon={<PersonIcon />} />
            </Link>
            <Link className="navbar-menu-item" to="/applications">
              <MenuItem
                primaryText="Manage Applications"
                leftIcon={<PersonIcon />}
              />
            </Link>
            <Divider />
            <MenuItem
              primaryText="Logout"
              onClick={this.signout}
              leftIcon={<PersonIcon />}
            />
          </IconMenu>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

export default withRouter(NavBar);
