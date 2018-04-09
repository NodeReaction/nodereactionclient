import React, { Component } from "react";
import LineGraph from "../components/LineGraphComponent.jsx";
import TimeSelector from "../components/TimeSelector.jsx";
import Paper from "material-ui/Paper";
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
    this.routePost = this.routePre.replace(/%2f/g, "/");
  }

  fetchData(i) {
    this.props.setTimeRangeSelected(i);
    let offset = this.props.timeRanges[i].offset;
    let datetime = new Date(Date.now() - offset)
      .toISOString()
      .slice(0, 23)
      .replace("T", " ");

    this.setState({
      graphData: [],
      rangeData: []
    });
    
    this.fetchGraphData(this.props.app_id, offset, datetime);
  }

  fetchGraphData = (app_id, offset, datetime) => {
    let graphDataJson = [];
    let rangeDataJson = [];
    let fetchUrl = `/api/analytics/graph/${this.props.app_id}/${
      this.props.match.params.route
    }/${this.props.match.params.method}/${offset}/${datetime}`;
    console.log(`fetchUrl: `, fetchUrl);
    window
      .fetch(fetchUrl)
      .then(res => res.json())
      .then(json => {
        json.graphData[4].forEach(elem => {
          graphDataJson.push({
            Time: elem.timekey2,
            AverageResponse: elem.avgduration,
            NumberOfRequests: elem.numRequests
          });
        });
        rangeDataJson.push({
          Name: `${json.rangeData[0].method} ${json.rangeData[0].route}`,
          AverageDuration: parseFloat(
            json.rangeData[0]["avg(a.duration)"].toPrecision(3)
          )
        });
        json.rangeData.forEach(elem => {
          rangeDataJson.push({
            Name: `${elem.library} ${elem.type}`,
            AverageDuration: parseFloat(elem["avg(b.duration)"].toPrecision(3))
          });
        });
        this.setState({ graphData: graphDataJson, rangeData: rangeDataJson });
      });
  };

  render() {
    return (
      <div className="pageContainer">
        <div className="pageHeaderContainer">
          <h1 className="pageHeader">
          {this.props.app_name}- Route - {this.props.match.params.method}{" "}
            {this.routePost}
          </h1>
          <div className="timeSelector">
            <TimeSelector cb={this.fetchData} timeRanges={this.props.timeRanges}
              timeRangeSelected={this.props.timeRangeSelected} />
          </div>
        </div>
        <h3>Default time: {this.props.match.params.default_time}</h3>
        <LineGraph data={this.state} />
      </div>
    );
  }
}
