import React, { Component } from "react";
import ApplicationCard from "../components/ApplicationCard.jsx";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
export default class ApplicationContainer extends Component {
  constructor() {
    super();
    this.state = {};
    this.state.applicationName = "";
    this.handleCreateApplicationClick = this.handleCreateApplicationClick.bind(this);
    this.handleDeleteApplicationClick = this.handleDeleteApplicationClick.bind(this);
  }

  handleCreateApplicationClick() {
    //console.log('CreateApplication: ' + this.state.applicationName);
    this.props.handleApplicationCreate()
  }
  handleDeleteApplicationClick() {
    //console.log('CreateApplication: ' + this.state.applicationName);
    this.props.handleApplicationDelete()
  }

  render() {
    // this.props.applications
    // this.props.deleteApplication - call function in main
    const applicationCards = [];
    for (let i = 0; i < 3; i++) {
      applicationCards.push(
        <ApplicationCard key={i} title={"Application - " + i} />
      );
    }

    return (
      <div className="pageContainer">
        <div className="pageHeaderContainer">
          <h1 className="pageHeader">Manage Applications</h1>
        </div>
        <TextField
          value={this.state.applicationName}
          onChange={(event, applicationName) => this.setState({ applicationName })}
          hintText="Application Name"
          id="applicationName"
        />
        <FlatButton
          size="medium"
          label="Create Application"
          primary={true}
          onClick={this.handleCreateApplicationClick}
        />
      <br/>
      <br/>
        <div className="applicationCards">{applicationCards}</div>
      </div>
    );
  }
}
