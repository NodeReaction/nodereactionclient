import React, { Component } from "react";
import LineGraph from "../components/LineGraphComponent.jsx";

const IndividualRouteContainer = ({ match }) => (
  <div>
    <h3>ID: {match.params.id}</h3>
    <h3>Default time: {match.params.default_time}</h3>
    <LineGraph />
  </div>
);

export default IndividualRouteContainer;
