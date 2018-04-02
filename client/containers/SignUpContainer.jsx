import React, { Component } from "react";
import {
  Card,
  CardActions,
  CardHeader,
  CardTitle,
  CardText
} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import { Redirect, Link } from "react-router-dom";
import TextField from "material-ui/TextField";
import authService from "../auth/AuthService.js";

export default class SignUpContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autoHideDuration: 4000,
      message: "Event added to your calendar",
      open: false,
      usernameLogin: "",
      passwordLogin: "",
      usernameSignup: "",
      passwordSignup: "",
      emailSignup: "",
      redirectToReferer: false
    };
    this.handleSignup = this.handleSignup.bind(this);
  }


  handleSignup() {
    const user = {
      username: this.state.usernameSignup,
      password: this.state.passwordSignup,
      email: this.state.emailSignup
    };

    window
      .fetch(`/api/user/create/`, {
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
            <h1 className="pageHeader">Sign Up</h1>
          </div>
          <form method="post">
          <Card className="signup">
            {/* <CardTitle title="Signup" subtitle="" /> */}
            <CardText>
              <TextField
                value={this.state.usernameSignup}
                onChange={(event, usernameSignup) =>
                  this.setState({ usernameSignup })
                }
                hintText="Username"
                id="usernameSignup"
                autoComplete="username"
              />
              <br />
              <TextField
                value={this.state.emailSignup}
                onChange={(event, emailSignup) =>
                  this.setState({ emailSignup })
                }
                hintText="Email"
                id="emailSignup"
                type="email"
                autoComplete="email"
              />
              <br />
              <TextField
                value={this.state.passwordSignup}
                onChange={(event, passwordSignup) =>
                  this.setState({ passwordSignup })
                }
                hintText="Password"
                id="passwordSignup"
                type="password"
                autoComplete="new-password"
              />
              <br />
              <Link className="navbar-menu-item" to="/login">login</Link>
              <br />
              <br />
              <br />
              <FlatButton
                size="medium"
                label="Signup"
                primary={true}
                onClick={this.handleSignup}
              />
            </CardText>
          </Card>
          </form>
        </div>
      </div>
    );
  }
}
