import React, { Component } from "react";
import { render } from "react-dom";
import DropDownMenu from "material-ui/DropDownMenu";
import FlatButton from "material-ui/FlatButton";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import DownArrow from "material-ui/svg-icons/hardware/keyboard-arrow-down";
import { Link } from "react-router-dom";

export default class ApplicationSelector extends Component {
  constructor(props) {
    super(props);
  }
  menuClick = (event, child) => {
    const id = child.key;
    this.props.change_app(this.props.apps[id].application_id, this.props.apps[id].name);
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
            icon={<DownArrow />}
          />
        }
        onItemClick={this.menuClick}
      >
        {this.props.apps &&
          this.props.apps.map((app, i) => (
            <MenuItem
              primaryText={app.name}
              name={app.name}
              key={i}
            />
          ))}
      </IconMenu>
    );
  }
}

