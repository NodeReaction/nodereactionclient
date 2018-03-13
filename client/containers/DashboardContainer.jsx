import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import TimeSelector from "../components/TimeSelector.jsx"

export default class DashboardContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div><TimeSelector /></div>
    );
  }
}
