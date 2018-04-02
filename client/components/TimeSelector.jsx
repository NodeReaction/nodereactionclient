import React, { Component } from "react";
import { render } from "react-dom";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";

export default class TimeSelector extends Component {
  constructor(props) {
    super(props);
    this.props.cb(this.props.timeRangeSelected);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, i, value) {
    const offset = this.props.timeRanges[i].offset;
    this.props.cb(i);
  }

  render() {
    const timeRanges = [];
    for (let i = 0; i < this.props.timeRanges.length; i++){
      timeRanges.push(<MenuItem value={i} key={i} primaryText={this.props.timeRanges[i].label} />)
    }

    return (
      <DropDownMenu
        value={this.props.timeRangeSelected}
        onChange={this.handleChange}
        openImmediately={false}
      >
      {timeRanges}
      </DropDownMenu>
    );
  }
}
