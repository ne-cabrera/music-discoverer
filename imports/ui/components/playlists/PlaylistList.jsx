import React, { Component } from "react";
import PlaylistListItem from "./PlaylistListItem";

export default class PlaylistList extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <ul className="list-group">
        {this.props.playlists.map((d, i) =>(
          <PlaylistListItem name={d.name} id={d.id} key={i} onClick={this.props.onPlaylistClick}/>
        ))}
      </ul>
    );
  }
}
