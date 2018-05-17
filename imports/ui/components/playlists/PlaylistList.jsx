import React, { Component } from "react";
import PlaylistListItem from "./PlaylistListItem";
import * as d3 from "d3";

export default class PlaylistList extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate(prevProps) {
    if(prevProps.playlists.length === 0) {
      var songs = d3.select(".playlistsDiv");
      var p = songs.selectAll(".playListContainer");
      p.style("background-color", "white");
      p.on("click", function() {
        p.style("background-color", "white");
        d3.select(this)
          .style("background-color", "#e9ebeb");
      });
    }
  }

  handleClick() {
    this.props.onRecentlyPayedClick();
  }

  render() {
    console.log(Meteor.user());

    return (
      <div className="playlistsDiv">
        <div className="row playListContainer" onClick={this.handleClick}>
          <div className="col-md-4">

          </div>
          <div className="col-md-8">
            <p>Recently Played!</p>
          </div>
        </div>
        {this.props.playlists.map((d, i) => (
          <PlaylistListItem name={d.name} id={d.id} img={d.img} key={i} onClick={this.props.onPlaylistClick} />
        ))}
      </div>
    );
  }
}
