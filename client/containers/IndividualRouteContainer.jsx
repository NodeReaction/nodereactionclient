import React, { Component } from "react";

const IndividualRouteContainer = ({ match }) => (
  <div>
    <h3>ID: {match.params.id}</h3>
  </div>
);
