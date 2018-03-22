import React, { Component } from "react";

export default class NotFoundContainer extends Component {
  constructor() {
    super();
  }

  // Available data: route (match), method (match), offset (time), time (component)
  render() {
    console.log(this.props.match)
    return (
      <div className="pageContainer">
        <div className="pageHeaderContainer">
          <h1 className="pageHeader">Page not found</h1>
        </div>
       <p>Page not found.</p>
      </div>
    )
  }
};