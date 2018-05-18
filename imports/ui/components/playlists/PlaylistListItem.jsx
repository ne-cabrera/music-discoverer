import React, { Component } from "react";
import SongsList from "../Songs/SongsList";

export default class PlaylistListItem extends Component {

  constructor(props) {
    super(props);
    this.state={
      playlistTracks: []
    };
    this.getTracks = this.getTracks.bind(this);
  }


  getTracks() {
    Meteor.call("playlist.getTracks", this.props.id, (err, res) => {
      if(err) {
        console.log(err);
      }
      else {
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
        
      }
    });
  }

  render() {
    return (
      <div className="">
        <div className="row playListContainer" onClick={this.getTracks}>
          <div className="col-md-4">
            <img src={this.props.img} alt="playlist picture" className="albumImg" />
          </div>
          <div className="col-md-8">
            <p className="playName">{this.props.name}</p>
          </div>
        </div>
        <div className="songsList">
          <SongsList songs={this.state.playlistTracks} onSongClick={this.props.onSongClick} />
        </div>
      </div>
    );
  }
}
