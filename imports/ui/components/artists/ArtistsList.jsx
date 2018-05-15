import React, { Component } from "react";
import ArtistsListItem from "./ArtistsListItem";

export default class ArtistsList extends Component {
  render() {
    return (
      <ul className="list-group">
        {this.props.artists.map((d, i) => (
          <ArtistsListItem name={d.name} id={d.id} popularity={d.popularity} key={i} onClick={this.props.onSongClick} />
        ))}
      </ul>
    );
  }
}
