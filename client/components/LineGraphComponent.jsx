import React, { Component } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

export default class LineGraphComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {data: [
    { time: "Page B", numReq: 3000, avgTime: 1398, herro: 123},
    { time: "Page C", numReq: 2000, avgTime: 9800, herro: 123},
    { time: "Page D", numReq: 2780, avgTime: 3908, herro: 123}]};
  }

  fetchDataAnalytics(offset) {
    let datetime = new Date(Date.now() - offset)
      .toISOString()
      .slice(0, 23)
      .replace("T", " ");
    this.fetchRows(datetime);
  }

  fetchRows = date => {
    window
      .fetch(`http://localhost:3000/api/routes/${date}`)
      .then(res => res.json())
      .then(json => {
        console.log("herio", json);
        this.setState({
          rows: json
        });
      });
  };

  render() {
    return (
      <LineChart width={600} height={300} data={this.props.data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="Time" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line yAxisId="left" type="monotone" dataKey="AverageResponse" stroke="#8884d8" activeDot={{r: 8}} />
        <Line yAxisId="right" type="monotone" dataKey="NumberOfRequests" stroke="#82ca9d" />
      </LineChart>
    );
  }
}
