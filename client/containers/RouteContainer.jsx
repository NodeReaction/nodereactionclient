import React, { Component } from "react";
import LineGraph from "../components/LineGraphComponent.jsx";
import TimeSelector from "../components/TimeSelector.jsx";

export default class RouteContainer extends Component {
  constructor() {
    super();
    this.fetchData = this.fetchData.bind(this);
    this.state = {rows: []};
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
    let data = [];
    window
      .fetch(`http://localhost:3000/api/analytics/graph/${this.props.match.params.route}/${this.props.match.params.method}/${offset}/${datetime}`)
      .then(res => res.json())
      .then(json => {
        console.log("herio", json);
        json[4].forEach(elem => {
          data.push({
            Time: elem.timekey2,
            AverageResponse: elem.avgduration,
            NumberOfRequests: elem.numRequests
          });
        });
        this.setState({rows: data});
      });
  };

  // {"timekey2":"2018-03-20 15:30:25","avgduration":0,"numRequests":0};

  // Available data: route (match), method (match), offset (time), time (component)
  render() {
    console.log(this.props.match)
    return (
      <div className="pageContainer">
        <div className="pageHeaderContainer">
          <h1 className="pageHeader">Application Name - Route - {this.props.match.params.method} {this.props.match.params.route}</h1>
          <div className="timeSelector">
            {/* Pass in cb which gets invoked whenever a time selection is made */}
            <TimeSelector cb={this.fetchData} />
          </div>
        </div>
        <h3>Default time: {this.props.match.params.default_time}</h3>
        <LineGraph data={this.state.rows}/>
      </div>
    )
  }
};