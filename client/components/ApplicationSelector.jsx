import React, { Component } from "react";
import { render } from "react-dom";
import DropDownMenu from "material-ui/DropDownMenu";
import FlatButton from "material-ui/FlatButton";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import ActionAndroid from "material-ui/svg-icons/hardware/keyboard-arrow-down";
import { Link } from "react-router-dom";

export default class ApplicationSelector extends Component {
  constructor(props) {
    super(props);
  }

  menuClick = (event, child) => {
    this.props.change_app(child.props.app_id, child.props.name);
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
        {this.props.apps &&
          this.props.apps.map((app, i) => (
            <MenuItem
              primaryText={app.name}
              app_id={app.application_id}
              name={app.name}
              key={i}
              onItemClick={this.menuClick}
            />
          ))}
      </IconMenu>
    );
  }
}
