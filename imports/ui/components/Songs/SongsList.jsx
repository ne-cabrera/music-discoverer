import React, { Component } from "react";
import SongsListItem from "./SongsListItem";
import * as d3 from "d3";

export default class SongsList extends Component {

  componentDidUpdate(){
    var songs = d3.select(".songsContainer");
      
    var p = songs.selectAll(".playListContainer");
    p.style("background-color","white");
    p.on("click", function() {
      p.style("background-color","white");
      d3.select(this)
        .style("background-color","#e9ebeb");
    });
  }

  render() {
    return (
      <div className="songsContainer">
        {this.props.songs.map((d,i) =>(
          <SongsListItem name={d.name} id={d.id} key={i} onClick={this.props.onSongClick}/>
        ))}
      </div>
    );
  }
}
