import React, { Component } from "react";
import Metor from "meteor/meteor";
import PlaylistList from "./PlaylistList";
import SongsList from "../Songs/SongsList";

export default class ListsContainer extends Component {

  constructor(props){
    super(props);
    this.state = {
      playlists: [],
      playlistTracks: []
    };
    this.getTracks = this.getTracks.bind(this);
  }

  componentDidMount(){
    Meteor.call("playlists.getPlaylists", (err, res) =>{
      if(err){
        console.log(err);
      }
      else{
        var arr = [];
        console.log(res.items);
        res.items.map((d) => {
          var obj = {};
          obj.id = d.id;
          obj.name = d.name;
          obj.img = d.images[0].url;
          arr.push(obj);
        });
        this.setState({
          playlists: arr
        });
      }
    });
  }

  getTracks(playlistId){
    Meteor.call("playlist.getTracks", playlistId, (err, res) =>{
      if(err){
        console.log(err);
      }
      else{
        var arr = [];
        res.items.map((d) =>{
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
        })
      }
    });
  }

  render() {
    console.log(this.state);
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 playlistsList">
            <PlaylistList playlists={this.state.playlists} onPlaylistClick={this.getTracks}/>
          </div>
          <div className="col-md-6 songsList">
            <SongsList songs={this.state.playlistTracks} onSongClick={this.props.onClick}/>
          </div>
        </div>
      </div>
    );
  }
}
