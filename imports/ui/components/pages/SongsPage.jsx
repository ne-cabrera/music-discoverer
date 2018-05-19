import React from "react";
import { Meteor } from "meteor/meteor";
import MainNav from "../navs/MainNav";
import SongListSolo from "../Songs/SongListSolo";
import { Graph } from "../Graph";
import SongDetail from "../Songs/SongDetail";
export default class SongsPage extends React.Component {

  constructor() {
    super();
    this.state = {
      songs: [],
      grafo: null,
      popus: [],
      trackInfo: null
    };
  }

  clickNode(sId) {
    console.log(sId);
    sessionStorage.setItem("sId", sId);
    Meteor.call("songs.trackInfo", sId, (err, rest) => {
      if(err) throw err;
      console.log(rest);
      this.setState({
        trackInfo: rest
      });
    });
  }
  clickSong(sId, name, popularity) {
    sessionStorage.setItem("sId", sId);
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
        var link = { source: songs[s].name, target: name, id: sId };
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
        <div className="laInstruccion">
          <h4> Search recomendations for an specific song!</h4>
        </div>
        <div className="container container-search">
          <div className="row">
            <div className="col-sm-6 col-sm-offset-3">
              <div id="imaginary_container">
                <div className="input-group stylish-input-group">
                  <input type="text" className="form-control" placeholder="Search Song" onKeyPress={this.onPressEnter.bind(this)} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row losPds">
          <div className="col-md-2">
            {this.state.songs.length === 0 ? "" :
              <div>
                <SongListSolo songs={this.state.songs} onSongClick={this.clickSong.bind(this)} />
              </div>

            }
          </div>
          <div className="col-md-5 elgrafito">
            <Graph graph={this.state.grafo}
              pops={this.state.popus}
              clickNode={this.clickNode.bind(this)} />
          </div>
          <div className="col-md-5">
            <div className="songDet">
              {this.state.trackInfo !== null ? <SongDetail song={this.state.trackInfo} /> : ""}
            </div>

          </div>
        </div>


      </div>
    );
  }
}