import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

export default class BigInfoItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="bigInfoItem">
        <h2>{this.props.text}</h2>
        <h2>{this.props.value}</h2>
      </div>
    );
  }
}