import React, { Component } from "react";
import { render } from "react-dom";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";

export default class TimeSelector extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 2 };
    this.props.cb(30 * 60000);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, value) {
    this.setState({ value });
    let offset = 0;
    switch (value) {
      case 1:
        offset = 5 * 60000;
        break;
      case 2:
        offset = 30 * 60000;
        break;
      case 3:
        offset = 60 * 60000;
        break;
      case 4:
        offset = 720 * 60000;
        break;
      case 5:
        offset = 1440 * 60000;
        break;
      case 6:
        offset = 4320 * 60000;
        break;
    }

    this.props.cb(offset);
  }

  render() {
    return (
      <DropDownMenu
        value={this.state.value}
        onChange={this.handleChange}
        openImmediately={false}
      >
        <MenuItem value={1} primaryText="Prev. 5 minutes" />
        <MenuItem value={2} primaryText="Prev. 30 minutes" />
        <MenuItem value={3} primaryText="Prev. 1 hour" />
        <MenuItem value={4} primaryText="Prev. 12 hours" />
        <MenuItem value={5} primaryText="Prev. 1 day" />
        <MenuItem value={6} primaryText="Prev. 3 days" />
      </DropDownMenu>
    );
  }
}
