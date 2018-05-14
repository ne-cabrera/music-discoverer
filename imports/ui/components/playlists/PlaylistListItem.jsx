import React, { Component } from "react";

export default class PlaylistListItem extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick(this.props.id);
  }

  render() {
    return (
      <li className="list-group-item" onClick={this.handleClick}>
        <a className="list-item-chevere">{this.props.name}</a>
      </li>
    );
  }
}
