import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

export default class BigInfoItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="bigInfoItem">
        <h1>{this.props.text}</h1>
        <h1>{this.props.value}</h1>
      </div>
    );
  }
}