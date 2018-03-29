import React, { Component } from "react";
import ApplicationCard from "../components/ApplicationCard.jsx";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
export default class ApplicationContainer extends Component {
  constructor() {
    super();
    this.state = {};
    this.state.applicationName = "";
    this.handleCreateApplicationClick = this.handleCreateApplicationClick.bind(
      this
    );
    this.handleDeleteApplicationClick = this.handleDeleteApplicationClick.bind(
      this
    );
    this.updateApplications = this.updateApplications.bind(this);
  }

  updateApplications() {
    window
      .fetch(`/api/applications/${this.props.user_id}`)
      .then(res => res.json())
      .then(apps => {
        console.log("app container", apps);
        let data = {};
        data.apps = apps.map(el => el.application_id);
        this.props.update_apps(data);
      })
      .catch(err => console.log("muh error", err));
  }

  handleCreateApplicationClick() {
    let data = {
      applicationName: this.state.applicationName,
      userId: this.props.user_id
    };
    console.log("data = ", data);

    window
      .fetch(`/api/application/create/`, {
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json"
        },
        method: "POST"
      })
      .then(res => res.json())
      .then(data => {
        console.log("response", data);
        this.updateApplications();
      });
  }
  handleDeleteApplicationClick() {
    this.props.handleApplicationDelete();
  }

  fetchUserApplications() {}

  render() {
    return (
      <div className="pageContainer">
        <div className="pageHeaderContainer">
          <h1 className="pageHeader">Manage Applications</h1>
        </div>
        <TextField
          value={this.state.applicationName}
          onChange={(event, applicationName) =>
            this.setState({ applicationName })
          }
          hintText="Application Name"
          id="applicationName"
        />
        <FlatButton
          size="medium"
          label="Create Application"
          primary={true}
          onClick={this.handleCreateApplicationClick}
        />
        <br />
        <br />
        <div className="applicationCards">
          {this.props.apps.map(app => {
            return (
              <ApplicationCard
                title={"Application - " + app}
                subtitle="muh token"
              />
            );
          })}
        </div>
      </div>
    );
  }
}
