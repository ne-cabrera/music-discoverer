import React from "react";
import { Meteor } from "meteor/meteor";
import { MainNav } from "../navs/MainNav";
import SongsList from "../Songs/SongsList";
import { Graph } from "../Graph";
export default class SongsPage extends React.Component {

  constructor() {
    super();
    this.state = {
      songs: [],
      grafo: null,
      popus: []
    };
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
        var node = { name: songs[s].name, id: songs[s].id, popularity: songs[s].popularity };
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
  onPressEnter(event) {
    console.log("das");
    var content = event.target.value;
    if(event.which === 13) {
      Meteor.call("songs.getRecoSongName", content, (err, rest) => {
        if(err) throw err;

        console.log(rest);

        this.setState({
          songs: rest.tracks.items
        });


      });

    }
  }
  render() {
    return (
      <div>
        <MainNav />
        <div className="container container-search">
          <div className="row">
            <div className="col-sm-6 col-sm-offset-3">
              <div id="imaginary_container">
                <div className="input-group stylish-input-group">
                  <input type="text" className="form-control" placeholder="Search" onKeyPress={this.onPressEnter.bind(this)} />
                  <span className="input-group-addon">
                    <button type="submit">
                      <span className="glyphicon glyphicon-search"></span>
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            {this.state.songs === [] ? "" :
              <div>
                <h1>Top Results</h1>
                <SongsList songs={this.state.songs} onSongClick={this.clickSong.bind(this)} />
              </div>

            }
          </div>
          <div className="col-md-6">
            <Graph graph={this.state.grafo}
              pops={this.state.popus} />
          </div>
        </div>

      </div>
    );
  }
}