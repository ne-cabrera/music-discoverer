import React, { Component } from "react";
import PlaylistListItem from "./PlaylistListItem";
import SongsList from "../Songs/SongsList";
import * as d3 from "d3";

export default class PlaylistList extends Component {
  constructor(props) {
    super(props);
    this.state={
      playlistTracks: []
    };
    this.getRecentlyPlayed = this.getRecentlyPlayed.bind(this);
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

  getRecentlyPlayed(){
    Meteor.call("playlists.getRecentlyPlayed", (err, res) =>{
      if(err){
        throw(err);
      }
      if(this.state.playlistTracks.length === 0 || this.state.playlistTracks.length !== res.items.length)
      {
        var arr = [];
        res.items.map((d) => {
          var obj = {};
          obj.album = d.track.album;
          obj.artists = d.track.artists;
          obj.duration = d.track.duration;
          obj.id = d.track.id;
          obj.name = d.track.name;
          obj.popularity = d.track.popularity;
          obj.preview = d.track.preview_url;
          arr.push(obj);
        });
        this.setState({
          playlistTracks: arr
        });
      }
      else{
        this.setState({
          playlistTracks: []
        });
      }
    });
  }

  render() {
    console.log(Meteor.user());

    return (
      <div className="playlistsDiv playlistsList">
        <div>
          <div className="row playListContainer" onClick={this.getRecentlyPlayed}>
            <div className="col-md-4">
            </div>
            <div className="col-md-8">
              <p>Recently Played!</p>
            </div>
          </div>
          <div className="songsList">
            <SongsList songs={this.state.playlistTracks} onSongClick={this.props.onSongClick} />
          </div>
        </div>
        {this.props.playlists.map((d, i) => (
          <PlaylistListItem name={d.name} id={d.id} img={d.img} key={i} onSongClick={this.props.onSongClick}/>
        ))}
      </div>
    );
  }
}
