import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import ListsContainer from "./ListsContainer";
import { Graph } from "../Graph";
import { MainNav } from "../navs/MainNav";
import SongDetail from "../Songs/SongDetail";

export default class MainContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      grafo: null,
      popus: [],
      trackInfo: null
    };
    this.clickSong = this.clickSong.bind(this);
  }

  clickNode(sId) {
    console.log(sId);
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


  render() {
    return (
      <div>
        <MainNav />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              <ListsContainer onClick={this.clickSong} />
            </div>
            <div className="col-md-4">
              <Graph graph={this.state.grafo}
                pops={this.state.popus}
                clickNode={this.clickNode.bind(this)} />
            </div>
          </div>
          <div className="row">
            <div className="songDet">
              {this.state.trackInfo !== null ? <SongDetail song={this.state.trackInfo} /> : ""}
            </div>

          </div>
        </div>
      </div>

    );
  }
}
