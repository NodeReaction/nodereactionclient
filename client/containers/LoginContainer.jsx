import React, { Component } from "react";
import {
  Card,
  CardActions,
  CardHeader,
  CardTitle,
  CardText
} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import { Link,Redirect } from "react-router-dom";
import TextField from "material-ui/TextField";
import authService from "../auth/AuthService.js";

export default class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autoHideDuration: 4000,
      message: "Event added to your calendar",
      open: false,
      usernameLogin: "",
      usernameLoginErrorText: "",
      passwordLogin: "",
      passwordLoginErrorText: "",
      redirectToReferer: false
    };
    this.validateLogin = this.validateLogin.bind(this);
    this.isValidUsername = this.isValidUsername.bind(this);
    this.isValidPassword = this.isValidPassword.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  //We login here and also set up some inital state by using callback props. Not ideal
  //but hard to avoid with current UI set up
  validateLogin(){
    const isValidUsername = this.isValidUsername();
    const isValidPassword = this.isValidPassword();

    if(isValidUsername.isValid && isValidPassword.isValid){
      this.handleLogin();
      this.setState({ usernameLoginErrorText: "", passwordLoginErrorText: "" });
    }
    else {
      if(!isValidUsername.isValid) {
        // add error text
        this.setState({ usernameLoginErrorText: isValidUsername.errorText });
      }
      if(!isValidPassword.isValid) {
        // add error text
        this.setState({ passwordLoginErrorText: isValidPassword.errorText });
      }
    }
  }
  
  isValidUsername(){
    let validUsername = {}
    validUsername.isValid = true;
    const username = this.state.usernameLogin;
    if(username.length < 1){
      validUsername.isValid = false;
      validUsername.errorText = "username can not be blank";
    }
    return validUsername;
  }

  isValidPassword(){
    let validPassword = {}
    validPassword.isValid = true;
    const password = this.state.passwordLogin;
    if(password.length < 1){
      validPassword.isValid = false;
      validPassword.errorText = "password can not be blank";
    }
    return validPassword;
  }

  handleLogin() {
    const user = {
      username: this.state.usernameLogin,
      password: this.state.passwordLogin
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
        //console.log("user_id = ", user_id);
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
          <form method="post">
          <Card className="">
            {/* <CardTitle title="Login" subtitle="" /> */}
            <CardText>
              <TextField
                value={this.state.usernameLogin}
                onChange={(event, usernameLogin) =>
                  this.setState({ usernameLogin })
                }
                hintText="Username"
                floatingLabelText="Username"
                id="usernameLogin"
                autoComplete="username"
                errorText={this.state.usernameLoginErrorText}
              />
              <br />
              <TextField
                value={this.state.passwordLogin}
                onChange={(event, passwordLogin) =>
                  this.setState({ passwordLogin })
                }
                hintText="Password"
                floatingLabelText="Password"
                id="passwordLogin"
                type="password"
                autoComplete="current-password"
                errorText={this.state.passwordLoginErrorText}
              />
              <br />
              <br />
              <br />
              <FlatButton
                size="medium"
                label="Login"
                primary={true}
                onClick={this.validateLogin}
              />
            </CardText>
          </Card>
          </form>
        </div>
      </div>
    );
  }
}
