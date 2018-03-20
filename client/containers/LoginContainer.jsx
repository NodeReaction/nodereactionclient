import React, { Component } from "react";
import TextField from "material-ui/TextField";

export default class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autoHideDuration: 4000,
      message: "Event added to your calendar",
      open: false
    };
  }

  handleClick = () => {
    this.setState({
      open: true
    });
  };

  handleActionClick = () => {
    this.setState({
      open: false
    });
    alert("deleted?");
  };

  handleChangeDuration = event => {
    const value = event.target.value;
    this.setState({
      autoHideDuration: value.length > 0 ? parseInt(value) : 0
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    return (
      <div>
        <div className="pageContainer">
          <div className="pageHeaderContainer">
            <h1 className="pageHeader">Login</h1>

            
          </div>
        </div>
        <p>Login Box</p>
      </div>
    );
  }
}
