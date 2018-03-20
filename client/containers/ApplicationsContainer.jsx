import React, { Component } from "react";
import ApplicationCard from "../components/ApplicationCard.jsx";

export default class ApplicationContainer extends Component {
  constructor() {
    super();
    this.state ={}

  }


  createApplication(){

  }
  deleteApplication(){

  }
  getApplications(){

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
        <div className="applicationCards">{applicationCards}</div>
      </div>
    );
  }
}
