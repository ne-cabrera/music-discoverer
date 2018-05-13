import React, { Component } from "react";

export default class SongsListItem extends Component {
  render() {
    return (
      <li>
        {this.props.name}
      </li>
    )
  }
}
