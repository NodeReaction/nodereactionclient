import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import TimeSelector from "../components/TimeSelector.jsx";
import BigInfoItem from "../components/BigInfoItem.jsx";
import Top5Grid from "../components/Top5Grid.jsx";

export default class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      InfoItems: [{text: 'Total Number of Requests', value: 1424}, 
                  {text: 'Average Response Time', value: 12 + ' ms'},
                  {text: 'Average Throughput Time', value: 16 + ' ms'}]
    }
  }

  render() {
    return (
      <div>
        <div className="headerContainer">
          <h1 id="name">Facebook</h1>
          <div id="timeSelector">
            <TimeSelector />
          </div>
        </div>
        <div className="bigInfoItems">
          <BigInfoItem text={this.state.InfoItems[0].text} value={this.state.InfoItems[0].value} />
          <BigInfoItem text={this.state.InfoItems[1].text} value={this.state.InfoItems[1].value} />
          <BigInfoItem text={this.state.InfoItems[2].text} value={this.state.InfoItems[2].value} />
        </div>
        <div className="top5Grid">
          <h1>Top 5 Requested Routes</h1>
          <Top5Grid />
        </div>
      </div>
    );
  }
}
