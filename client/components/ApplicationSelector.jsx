import React, { Component } from "react";
import { render } from "react-dom";
import DropDownMenu from "material-ui/DropDownMenu";
import FlatButton from "material-ui/FlatButton";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import ActionAndroid from "material-ui/svg-icons/action/android";
import { Link } from "react-router-dom";

export default class ApplicationSelector extends Component {
  constructor(props) {
    super(props);
  }

  menuClick = (event, child) => {
    this.props.change_app(child.props.primaryText);
  };

  render() {
    return (
      <IconMenu
        iconButtonElement={
          <FlatButton
            size="medium"
            label="Applications"
            labelPosition="before"
            primary={true}
            icon={<ActionAndroid />}
          />
        }
        onItemClick={this.menuClick}
      >
        {this.props.apps.map(app => (
          <MenuItem primaryText={app} onItemClick={this.menuClick} />
        ))}
      </IconMenu>
    );
  }
}
