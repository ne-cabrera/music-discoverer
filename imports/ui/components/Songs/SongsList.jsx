import React, { Component } from "react";
import SongsListItem from "./SongsListItem";

export default class SongsList extends Component {
  render() {
    return (
      <ul className="list-group">
        {this.props.songs.map((d, i) => (
          <SongsListItem name={d.name} id={d.id} popularity={d.popularity} key={i} onClick={this.props.onSongClick} />
        ))}
      </ul>
    );
  }
}
