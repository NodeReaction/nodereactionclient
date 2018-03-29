import React, { Component } from "react";
import {
  Card,
  CardActions,
  CardHeader,
  CardTitle,
  CardText
} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import { Redirect } from "react-router-dom";
import TextField from "material-ui/TextField";
import authService from "../auth/AuthService.js";

export default class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autoHideDuration: 4000,
      message: "Event added to your calendar",
      open: false,
      username: "",
      password: "",
      redirectToReferer: false
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  //We login here and also set up some inital state by using callback props. Not ideal
  //but hard to avoid with current UI set up
  handleLogin() {
    const user = {
      username: this.state.username,
      password: this.state.password
    };

    window
      .fetch(`/api/user/validate/`, {
        body: JSON.stringify(user),
        headers: {
          "content-type": "application/json"
        },
        method: "POST"
      })
      .then(res => res.json())
      .then(user_id => {
        window
          .fetch(`/api/applications/${user_id}`)
          .then(res => res.json())
          .then(apps => {
            authService.isAuthenticated = true;
            this.setState({ redirectToReferer: true });
            let data = {};
            data.apps = apps;
            data.user_id = user_id;
            this.props.cb(data);
          });
      });
  }

  render() {
    if (this.state.redirectToReferer) {
      return <Redirect to="/dashboard" />;
    }
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
