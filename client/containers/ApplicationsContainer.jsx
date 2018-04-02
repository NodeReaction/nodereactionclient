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
        this.props.update_apps(apps);
      })
      .catch(err => console.log(err));
  }

  handleCreateApplicationClick() {
    let data = {
      applicationName: this.state.applicationName,
      userId: this.props.user_id
    };

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
        this.updateApplications();
      });
  }
  handleDeleteApplicationClick() {
    this.props.handleApplicationDelete();
  }

  fetchUserApplications() {}
 

  render() {
    const apps = this.props.apps.map(app => {
      return (
        <ApplicationCard
          title={app.name}
          subtitle={'Agent API Token - ' + app.token}
          text={'const NRA = require("nodereactionagent").setApiToken("' + app.token + '");'}
        />
      );
    });

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
          {apps}
        </div>
      </div>
    );
  }
}
