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
export default class AccountContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autoHideDuration: 4000,
      message: "Event added to your calendar",
      open: false,
      email: "",
      username: "",
      password: "",
      passwordVerify: ""
    };
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate() {
    if (this.state.password === this.state.passwordVerify) {
      const user = {
        username: this.state.username,
        password: this.state.password
      };
      this.props.handleUserUpdate(user);
    }
  }

  render() {
    return (
      <div>
        <div className="pageContainer">
          <div className="pageHeaderContainer">
          <h1 className="pageHeader">Account Settings</h1>
          </div>
          <form method="post">
          <Card className="">
            <CardTitle title="Update Account" subtitle="" />
            <CardText>
              <TextField
                value={this.state.email}
                onChange={(event, email) => this.setState({ email })}
                hintText="Email"
                id="email"
                autoComplete="email"
              />
              <br />
              <TextField
                value={this.state.username}
                onChange={(event, username) => this.setState({ username })}
                hintText="Username"
                id="username"
                autoComplete="username"
              />
              <br />
              <TextField
                value={this.state.password}
                onChange={(event, password) => this.setState({ password })}
                hintText="Password"
                id="password"
                type="password"
                autoComplete="new-password"
              />
              <br />
              <TextField
                value={this.state.passwordVerify}
                onChange={(event, passwordVerify) =>
                  this.setState({ passwordVerify })
                }
                hintText="Confirm Password"
                id="passwordVerify"
                type="password"
                autoComplete="new-password"
              />
              <br />
              <br />
              <FlatButton
                size="medium"
                label="Update"
                primary={true}
                onClick={this.handleUpdate}
              />
            </CardText>
          </Card>
          </form>
        </div>
      </div>
    );
  }
}
