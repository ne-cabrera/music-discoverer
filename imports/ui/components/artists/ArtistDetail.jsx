import React from "react";
import Meteor from "meteor/meteor";

export class ArtistDetail extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidUpdate() {

  }
  render() {
    console.log(this.props);
    return (
      <div>
        {this.props.artist.name}
      </div>
    );
  }
}