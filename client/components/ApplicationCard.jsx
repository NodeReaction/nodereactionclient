import React, { Component } from "react";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";

export default class ApplicationCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Card className="applicationCard">
        <CardHeader
          actAsExpander={true}
          showExpandableButton={true}
          title={<CardTitle title={this.props.title} subtitle={this.props.subtitle} />}
        />
        
        <CardText expandable={true}> {this.props.text}</CardText>
      </Card>
    );
  }
}
