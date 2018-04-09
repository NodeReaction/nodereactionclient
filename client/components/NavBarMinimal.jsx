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

class NavBarMinimal extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <Toolbar className="navbar-menu">
        <ToolbarGroup>
        <Link className="navbar-menu-item" to="/">
          <h2 className="logo">NodeReaction</h2>
        </Link>
        </ToolbarGroup>
        <ToolbarGroup>
          {/* <Link className="navbar-menu-item" to="/overview">
            <FlatButton size="medium" label="Overview" primary={true} />
          </Link> */}
          <FlatButton size="medium" label="Documentation" primary={true} href="https://github.com/retrowavelabs/nodereactionagent" />
          <IconMenu
            iconButtonElement={
              <IconButton label="" touch={true}>
                <PersonIcon />
              </IconButton>
            }
          >
            <Link className="navbar-menu-item" to="/login">
              <MenuItem primaryText="Login" leftIcon={<PersonIcon />} />
            </Link>
            <Link className="navbar-menu-item" to="/signup">
              <MenuItem primaryText="Sign Up" leftIcon={<PersonIcon />} />
            </Link>
           
          </IconMenu>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

export default withRouter(NavBarMinimal);
