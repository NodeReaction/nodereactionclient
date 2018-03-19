import React, { Component } from "react";
import { render } from "react-dom";
import DropDownMenu from "material-ui/DropDownMenu";
import FlatButton from "material-ui/FlatButton";
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from "material-ui/MenuItem";

export default class ApplicationSelector extends Component {
  constructor(props) {
    super(props);
    this.state = { valueSingle: "3" };
    // this.props.cb(30 * 60000);
    this.handleChangeSingle = this.handleChangeSingle.bind(this);
  }

  handleOpenMenu = () => {
    this.setState({
      openMenu: true
    });
  };

  handleOnRequestChange = value => {
    this.setState({
      openMenu: value
    });
  };

  handleChangeSingle = (event, value) => {
    this.setState({
      valueSingle: value
    });
  };

  render() {
    return (
      <IconMenu
        iconButtonElement={
          <FlatButton size="medium" label="Applications" primary={true} />
        }
        onChange={this.handleChangeSingle}
      >
        <MenuItem value={1} primaryText="Application Name 1" />
        <MenuItem value={2} primaryText="Application Name 2" />
      </IconMenu>

      // <DropDownMenu
      //   value={this.state.value}
      //   onChange={this.handleChange}
      //   openImmediately={false}
      // >
      //   <MenuItem value={1} primaryText="Application Name 1" />
      //   <MenuItem value={2} primaryText="Application Name 2" />
      // </DropDownMenu>
    );
  }
}
