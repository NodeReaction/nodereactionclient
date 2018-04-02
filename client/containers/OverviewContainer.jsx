import React, { Component } from "react";

export default class OverviewContainer extends Component {
  constructor() {
    super();
  }

  // Available data: route (match), method (match), offset (time), time (component)
  render() {
    console.log(this.props.match)
    return (
      <div className="pageContainer">
        <div className="pageHeaderContainer">
          <h1 className="pageHeader">Overview Container</h1>
        </div>
       <p>Overview.</p>
      </div>
    )
  }
};