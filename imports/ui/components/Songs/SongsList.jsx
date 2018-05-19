import React, { Component } from "react";
import SongsListItem from "./SongsListItem";
import * as d3 from "d3";

export default class SongsList extends Component {

  componentDidUpdate(prevProps) {
    var diff = this.areDifferent(prevProps, this.props);
    if(diff) {
      var songs = d3.select(".songsContainer");
      var p = songs.selectAll(".playListContainer");
      p.style("background-color", "white");
      p.on("click", function() {
        p.style("background-color", "white");
        d3.select(this)
          .style("background-color", "#e9ebeb");
      });
    }
  }

  areDifferent(obj1, obj2) {
    var arr1 = obj1.songs;
    var arr2 = obj2.songs;
    var dif = false;
    if(arr1.length !== arr2.length) {
      dif = true;
    }
    else {
      for(let i = 0; i < arr1.length && !dif; i++) {
        if(arr1[i].id !== arr2[i].id) {
          dif = true;
        }
      }
    }
    return dif;
  }

  render() {
    console.log(this.props.songs);
    return (
      <div className="songsContainer">
        {this.props.songs.map((d, i) => (
          <SongsListItem name={d.name} artist={d.artists[0].name} popularity={d.popularity} id={d.id} key={i} onClick={this.props.onSongClick} />
        ))}
      </div>


    );
  }
}
