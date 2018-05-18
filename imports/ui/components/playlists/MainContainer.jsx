import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import ListsContainer from "./ListsContainer";
import { Graph } from "../Graph";
import { MainNav } from "../navs/MainNav";
import SongDetail from "../Songs/SongDetail";
import PlaylistList from "./PlaylistList";

export default class MainContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      grafo: null,
      popus: [],
      trackInfo: null,
      playlists: []
    };
    this.clickSong = this.clickSong.bind(this);
  }

  clickNode(sId) {
    console.log(sId);
    sessionStorage.setItem("sId", sId);
    Meteor.call("songs.trackInfo", sId, (err, rest) => {
      if(err) throw err;
      this.setState({
        trackInfo: rest
      });
      console.log(this.state.trackInfo);
    });
  }

  clickSong(sId, name, popularity) {
    console.log(sId);
    sessionStorage.setItem("sId", sId);
    Meteor.call("songs.getRecommendations", sId, (err, res) => {
      if(err) throw (err);
      console.log(res, name, popularity);
      const graph = {
        nodes: [

        ],
        links: [

        ],
      };
      var pops = [];
      var songs = res.tracks;
      console.log(songs);
      for(let s in songs) {
        var node = { name: songs[s].name, id: songs[s].id, popularity: songs[s].popularity };
        var link = { source: songs[s].name, target: name };
        pops.push(songs[s].popularity);
        graph.nodes.push(node);
        graph.links.push(link);

      }
      var thisSong = { name: name, popularity: popularity };
      graph.nodes.push(thisSong);
      console.log(graph);
      Meteor.call("songs.trackInfo", sId, (err, rest) => {
        if(err) throw err;
        this.setState({
          trackInfo: rest,
          grafo: graph,
          popus: pops
        });
      });
    });
  }

  componentDidMount() {
    Meteor.call("playlists.getPlaylists", (err, res) => {
      if(err) {
        console.log(err);
      }
      else {
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


  render() {
    return (
      <div>
        <MainNav />
        <div className="laInstruccion">
          <h4> Please Select a playList and search for a song</h4>
          <h6> If you don't have any playList you can search by the reacently played song List</h6>
        </div>
        <div className="container-fluid">
          <div className="row" >
            <div className="col-md-2">
              <div className="card card3">
                <h5 className="card-header" id="play">
                  Your playlists
                </h5>
                <div className="card-body">
                  <PlaylistList playlists={this.state.playlists} onSongClick={this.clickSong} />
                </div>
              </div>
            </div>
            <div className="col-md-5 elgrafito">
              <Graph graph={this.state.grafo}
                pops={this.state.popus}
                clickNode={this.clickNode.bind(this)} />
            </div>
            <div className="col-md-5">
              {this.state.trackInfo !== null ? <SongDetail song={this.state.trackInfo} /> : ""}
            </div>
          </div>
        </div>
        <div className="row">


          <div className="row">
            <div className="songDet">

            </div>

          </div>
        </div>
      </div>

    );
  }
}
