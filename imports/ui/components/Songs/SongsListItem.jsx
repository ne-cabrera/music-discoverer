import React, { Component } from "react";

export default class SongsListItem extends Component {

  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    this.props.onClick(this.props.id);
  }

  render() {
    return (
      <div className="playListContainer songCont" onClick={this.handleClick}>
        {this.props.name}
      </div>
    )
  }
}
