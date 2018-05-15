import React, { Component } from "react";

export default class SongsListItem extends Component {

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
        {this.props.artist === undefined ?
          <a className="list-item-chevere">{this.props.name}</a>
          :
          <a className="list-item-chevere">{this.props.name + " - " + this.props.artist}</a>
        }

      </li>
    );
  }
}
