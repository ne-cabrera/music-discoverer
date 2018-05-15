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
      <div className="row playListContainer" onClick={this.handleClick}>
        <div className="col-md-4">
          <img src={this.props.img} alt="playlist picture" className="albumImg"/>
        </div>
        <div className="col-md-8">
          <p>{this.props.name}</p>
        </div>
      </div>
    );
  }
}
