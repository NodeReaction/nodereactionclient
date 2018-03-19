import React, { Component } from "react";
import { render } from "react-dom";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";

export default class ApplicationSelector extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 1 };
    // this.props.cb(30 * 60000);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, value) {
    this.setState({ value });
    let offset = 0;
    switch (value) {
      case 1:
       
        break;
      case 2:
       
        break;
    }
    // this.props.cb(offset);
  }

  render() {
    return (
      <DropDownMenu
        value={this.state.value}
        onChange={this.handleChange}
        openImmediately={false}
      >
        <MenuItem value={1} primaryText="Application Name 1" />
        <MenuItem value={2} primaryText="Application Name 2" />
      </DropDownMenu>
    );
  }
}
