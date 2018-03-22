import React, { Component } from "react";
import {
  LineChart,
  BarChart,
  Bar,
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
  }

  render() {
    return (
      <div>
        <div>
          <LineChart width={700} height={300} data={this.props.data.graphData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="Time" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="AverageResponse" tick="hello" stroke="#8884d8" activeDot={{r: 8}} />
            <Line yAxisId="right" type="monotone" dataKey="NumberOfRequests" tick="goodbye" stroke="#82ca9d" />
          </LineChart>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <div>
          <BarChart layout="vertical" width={600} height={300} data={this.props.data.rangeData} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <XAxis type="number"/>
            <YAxis type="category" dataKey="Name" />
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Legend />
            <Bar dataKey="AverageDuration" fill="#8884d8" />
          </BarChart>
        </div>
      </div>
    );
  }
}
