import React, { Component } from "react";
import ArtistsListItem from "./ArtistsListItem";
import * as d3 from "d3";

export default class ArtistsList extends Component {


  componentDidUpdate(prevProps) {
    console.log(this.props);
    var diff = this.areDifferent(prevProps, this.props);
    if(diff) {
      var songs = d3.select(".listContainer");
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
    var arr1 = obj1.artists;
    var arr2 = obj2.artists;
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
    return (
      <div className="card card3" id="eldArtista">
        <h5 className="card-header" id="play">Top Results</h5>
        <div className="card-body">
          <div className="listContainer">
            {this.props.artists.map((d, i) => (
              <ArtistsListItem name={d.name} id={d.id} popularity={d.popularity} key={i} onClick={this.props.onSongClick} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
