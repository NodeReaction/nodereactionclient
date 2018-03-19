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

export default class DashboardCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const imgLink =
      "https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb";
    return (
      <Card className="dashboardCard">
        <CardTitle title={this.props.title} subtitle="" />
        <CardText>
          200 / rpm
        </CardText>
      </Card>
    );
  }
}

{
  /* 
<CardHeader
    title="URL Avatar"
    subtitle="Subtitle"
    avatar="images/jsa-128.jpg"
/>    
<CardTitle title="Card title" subtitle="Card subtitle" />
<CardText>
  hello hello hello hello hello hello hello hello hello hello hello hello hello hello  
  hello hello hello hello hello hello hello hello hello hello hello hello hello hello  
  hello hello hello hello hello hello hello hello hello hello hello hello hello hello  
  hello hello hello hello hello hello hello hello hello hello hello hello hello hello  
</CardText>
<CardMedia overlay={<CardTitle title="Overlay title" subtitle="" />}>
          <img src={imgLink} alt="" />
        </CardMedia>
<CardActions>
  <FlatButton label="Action1" />
  <FlatButton label="Action2" />
</CardActions> */
}
