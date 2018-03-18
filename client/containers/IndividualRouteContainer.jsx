import React, { Component } from "react";
import LineGraph from "../components/LineGraphComponent.jsx";
import TimeSelector from "../components/TimeSelector.jsx";

export default class IndividualRouteContainer extends Component {
  constructor() {
    super();
    this.fetchData = this.fetchData.bind(this);
  }

  //data fetching
  fetchData(offset) {
    let datetime = new Date(Date.now() - offset)
      .toISOString()
      .slice(0, 23)
      .replace("T", " ");
    this.fetchGraphData(offset, datetime);
  }

  fetchGraphData = (offset, datetime) => {
    window
      .fetch(`http://localhost:3000/api/analytics/graph/${this.props.match.params.route}/${this.props.match.params.method}/${offset}/${datetime}`)
      .then(res => res.json())
      .then(json => {
        console.log("herio", json);
      });
  };

  // Available data: route (match), method (match), offset (time), time (component)
  render() {
    console.log(this.props.match)
    return (
      <div>
        <div className="headerContainer">
          <h1 className="name">{this.props.match.params.method} {this.props.match.params.route}</h1>
          <div className="timeSelector">
            {/* Pass in cb which gets invoked whenever a time selection is made */}
            <TimeSelector cb={this.fetchData} />
          </div>
        </div>
        <h3>Default time: {this.props.match.params.default_time}</h3>
        <LineGraph />
      </div>
    )
  }
};