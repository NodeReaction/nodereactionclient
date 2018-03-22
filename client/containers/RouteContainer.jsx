import React, { Component } from "react";
import LineGraph from "../components/LineGraphComponent.jsx";
import TimeSelector from "../components/TimeSelector.jsx";

export default class RouteContainer extends Component {
  constructor() {
    super();
    this.fetchData = this.fetchData.bind(this);
    this.state = {
      graphData: [],
      rangeData: []
    };
  }

  componentDidMount() {
    this.routePre = this.props.match.params.route;
    this.routePost = this.routePre.replace(/%2f/g, '/');
  }

  fetchData(offset) {
    this.setState({
      graphData: [],
      rangeData: []
    })
    let datetime = new Date(Date.now() - offset)
      .toISOString()
      .slice(0, 23)
      .replace("T", " ");
    this.fetchGraphData(this.props.app_id, offset, datetime);
  }

  fetchGraphData = (app_id, offset, datetime) => {
    let graphDataJson = [];
    let rangeDataJson = [];
    console.log('****RouteContainer****\n', this.props);
    console.log('****RouteContainer this.props.match****\n', this.props.match);
    
    window
      .fetch(
        `http://localhost:3000/api/analytics/graph/9/${
          this.props.match.params.route
        }/${this.props.match.params.method}/${offset}/${datetime}`
      )
      .then(res => res.json())
      .then(json => {
        console.log("herio", json);
        json.graphData[4].forEach(elem => {
          graphDataJson.push({
            Time: elem.timekey2,
            AverageResponse: elem.avgduration,
            NumberOfRequests: elem.numRequests
          });
        });
        rangeDataJson.push({
          Name: `${json.rangeData[0].method} ${json.rangeData[0].route}`,
          AverageDuration: parseFloat(json.rangeData[0]['avg(a.duration)'].toPrecision(3))
        });
        json.rangeData.forEach(elem => {
          rangeDataJson.push({
            Name: `${elem.library} ${elem.type}`,
            AverageDuration: parseFloat(elem['avg(b.duration)'].toPrecision(3))
          });
        });
        this.setState({graphData: graphDataJson, rangeData: rangeDataJson});
      });
  };

  render() {
    console.log(this.props.match);
    return (
      <div className="pageContainer">
        <div className="pageHeaderContainer">
          <h1 className="pageHeader">
            Application Name - Route - {this.props.match.params.method}{" "}
            {this.routePost}
          </h1>
          <div className="timeSelector">
            <TimeSelector cb={this.fetchData} />
          </div>
        </div>
        <h3>Default time: {this.props.match.params.default_time}</h3>
        <LineGraph data={this.state}/>
      </div>
    );
  }
}
