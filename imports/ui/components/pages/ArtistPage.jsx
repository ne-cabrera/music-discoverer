import React from "react";
import { Meteor } from "meteor/meteor";
import MainNav from "../navs/MainNav";
import SongsList from "../Songs/SongsList";
import { Graph } from "../Graph";
import ArtistsList from "../artists/ArtistsList";
import ArtistDetail from "../artists/ArtistDetail";
export default class ArtistPage extends React.Component {

  constructor() {
    super();
    this.state = {
      artists: [],
      grafo: null,
      popus: [],
      nodeArtist: null,
      topTracks: []
    };
  }

  clickNode(aId) {
    Meteor.call("songs.getArtistDetail", aId, (err, rest) => {
      if(err) throw err;
      console.log(rest);
      Meteor.call("songs.topTracksArtist", aId, (err, rest2) => {
        if(err) throw err;
        console.log(rest2);
        this.setState({
          nodeArtist: rest,
          topTracks: rest2
        });
      });
    });
  }


  clickArtist(aId, name, popularity) {
    console.log(aId);
    Meteor.call("songs.getArtist", aId, (err, res) => {
      if(err) throw (err);
      console.log(res, name, popularity);
      const graph = {
        nodes: [

        ],
        links: [

        ],
      };
      var pops = [];
      var artists = res.artists;
      for(var i in artists) {
        var node = { name: artists[i].name, id: artists[i].id, popularity: artists[i].popularity };
        var link = { source: artists[i].name, target: name, id: aId };
        pops.push(artists[i].popularity);
        graph.nodes.push(node);
        graph.links.push(link);

      }
      var thisArtist = { name: name, popularity: popularity };
      graph.nodes.push(thisArtist);
      console.log(graph);
      Meteor.call("songs.getArtistDetail", aId, (err, rest) => {
        if(err) throw err;
        console.log(rest);
        Meteor.call("songs.topTracksArtist", aId, (err, rest2) => {
          if(err) throw err;
          console.log(rest2);
          this.setState({
            grafo: graph,
            popus: pops,
            nodeArtist: rest,
            topTracks: rest2
          });
        });
      });
    });
  }
  onPressEnter(event) {
    console.log("ddd");
    var content = event.target.value;
    if(event.which === 13) {
      Meteor.call("songs.getArtistList", content, (err, rest) => {
        if(err) throw err;
        console.log(rest);
        this.setState({
          artists: rest.artists.items
        });

      });
    }
  }

  render() {
    return (
      <div>
        <MainNav />
        <div className="laInstruccion">
          <h4> Search for similar Artists!</h4>
        </div>
        <div className="container container-search" id="elArtista">
          <div className="row">
            <div className="col-sm-6 col-sm-offset-3">
              <div id="imaginary_container">
                <div className="input-group stylish-input-group">
                  <input type="text" className="form-control" placeholder="Search Artist" onKeyPress={this.onPressEnter.bind(this)} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row losPds">
          <div className="col-md-2">
            {this.state.artists.length === 0 ? "" :
              <ArtistsList artists={this.state.artists} onSongClick={this.clickArtist.bind(this)} />
            }
          </div>
          <div className="col-md-5 elgrafito">
            <Graph graph={this.state.grafo}
              pops={this.state.popus}
              clickNode={this.clickNode.bind(this)} />
          </div>
          <div className="col-md-5">
            <div className="songDet">
              {this.state.nodeArtist === null && this.state.topTracks.length === 0 ? "" :
                <ArtistDetail info={this.state.nodeArtist} songs={this.state.topTracks} />
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}