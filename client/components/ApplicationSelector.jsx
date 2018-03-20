import React, { Component } from "react";
import { render } from "react-dom";
import DropDownMenu from "material-ui/DropDownMenu";
import FlatButton from "material-ui/FlatButton";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import ActionAndroid from "material-ui/svg-icons/action/android";

export default class ApplicationSelector extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const applications = [];
    // change to this that props.applications

    for (let i = 0; i < 3; i++) {
      applications.push(
        <MenuItem onClick={this.props.handleApplicationChangeActive} key={i} primaryText={"Application Name - " + i} />
      );
    }
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
      >
        {applications}
      </IconMenu>
    );
  }
}
