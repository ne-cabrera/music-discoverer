import React, { Component } from "react";
import SongsListItem from "./SongsListItem";

export default class SongsList extends Component {
  render() {
    return (
      <ul>
        {this.props.songs.map((d,i) =>(
          <SongsListItem name={d.name} key={i}/>
        ))}
      </ul>
    );
  }
}
