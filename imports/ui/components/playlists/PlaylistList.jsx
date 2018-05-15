import React, { Component } from "react";
import PlaylistListItem from "./PlaylistListItem";
import * as d3 from "d3";

export default class PlaylistList extends Component {
  constructor(props){
    super(props);
  }

  componentDidUpdate(prevProps){
    if(prevProps.playlists.length === 0){
      var songs = d3.select(".playlistsDiv");
      var p = songs.selectAll(".playListContainer");
      p.style("background-color","white");
      p.on("click", function() {
        p.style("background-color","white");
        d3.select(this)
          .style("background-color","#e9ebeb");
      });
    }
  }

  render() {
    return (
      <div className="playlistsDiv">
        {this.props.playlists.map((d, i) =>(
          <PlaylistListItem name={d.name} id={d.id} img={d.img} key={i} onClick={this.props.onPlaylistClick}/>
        ))}
      </div>
    );
  }
}
