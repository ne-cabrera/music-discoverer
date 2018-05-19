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
      <div className="playListContainer songCont" onClick={this.handleClick}>
        <p className="playName">{this.props.name}</p>
      </div>

    );
  }
}
