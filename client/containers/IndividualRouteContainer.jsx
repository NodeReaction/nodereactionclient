import React, { Component } from "react";
import LineGraph from "../components/LineGraphComponent.jsx";

const IndividualRouteContainer = ({ match }) => (
  // Available data: route (match), method (match), offset (time), time (component)
  <div>
    <h3>{match.params.method} {match.params.route}</h3>
    <h3>Default time: {match.params.default_time}</h3>
    <LineGraph />
  </div>
);

export default IndividualRouteContainer;