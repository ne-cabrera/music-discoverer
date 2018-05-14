import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import ListsContainer from "./ListsContainer";
import NavBarHome from "../navs/NavBarHome";
import { Graph } from "../Graph";

export default class MainContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      grafo: null,
      popus: []
    };
    this.clickSong = this.clickSong.bind(this);
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
      for(let s in songs) {
        var node = { name: songs[s].name, popularity: songs[s].popularity };
        var link = { source: songs[s].name, target: name };
        pops.push(songs[s].popularity);
        graph.nodes.push(node);
        graph.links.push(link);

      }
      var thisSong = { name: name, popularity: popularity };
      graph.nodes.push(thisSong);
      console.log(graph);
      this.setState({
        grafo: graph,
        popus: pops
      });
    });
  }


  render() {
    return (
      <div>
        <div className="elNav">
          <NavBarHome />
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <ListsContainer onClick={this.clickSong} />
            </div>
            <div className="col-md-8">
              <Graph graph={this.state.grafo}
                pops={this.state.popus} />
            </div>
          </div>
        </div>
      </div>

    );
  }
}
