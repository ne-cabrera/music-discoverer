import React, { Component } from "react";

export default class ArtistsListItem extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick(this.props.id, this.props.name, this.props.popularity);
  }

  render() {
    return (
      <li className="list-group-item" onClick={this.handleClick}>
        <a className="list-item-chevere">{this.props.name}</a>
      </li>
    );
  }
}
