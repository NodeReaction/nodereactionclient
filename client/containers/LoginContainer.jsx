import React, { Component } from "react";
import {
  Card,
  CardActions,
  CardHeader,
  CardTitle,
  CardText
} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import { Link } from "react-router-dom";
import TextField from "material-ui/TextField";
export default class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autoHideDuration: 4000,
      message: "Event added to your calendar",
      open: false,
      username: "",
      password: ""
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    const user = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.handleUserLogin(user);
  }

  render() {
    return (
      <div>
        <div className="pageContainer">
          <div className="pageHeaderContainer">
            <h1 className="pageHeader">Login</h1>
          </div>
          <Card className="">
            <CardTitle title="Login" subtitle="" />
            <CardText>
              <TextField
                value={this.state.username}
                onChange={(event, username) => this.setState({ username })}
                hintText="Username"
                id="username"
              />
              <br />
              <TextField
                value={this.state.password}
                onChange={(event, password) => this.setState({ password })}
                hintText="Password"
                id="password"
                type="password"
              />
              <br />
              <br />
              <FlatButton
                size="medium"
                label="Login"
                primary={true}
                onClick={this.handleLogin}
              />
            </CardText>
          </Card>
        </div>
      </div>
    );
  }
}
