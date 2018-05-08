import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import * as d3 from "d3";
import {Login} from "./components/Login";
import PlaylistList from "./components/playlists/PlaylistList";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      artist: "",
      artistId: "",
      artistPopularity: "",
      nodes: [],
      links: []
    };

  }
  componentDidUpdate() {
    Meteor.call("playlists.getPlaylists");
    const graph = {
      nodes: [

      ],
      links: [

      ]
    };
    console.log(this.state.artist);
    fetch("https://api.spotify.com/v1/search?q=" + this.state.artist + "&type=artist&market=us&limit=2",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer BQDL-mS0WCbEKOC82T1e6ei6OhTUATjBmnP6bjCThKOwzqVSIqhbv1sL4XYfRxln9WODBSqJb_2BHnimgF5w5OxnTiRj7UEspKi9D5CdVSxqioxtxwwEOQU09xazZvW5KTz14lq6NMIleX9VjIAF9xV38MZibtmsSTpAYjf1G4r0_Lqmrg"
        }
      }
    ).then(r => r.json())
      .then(res => {
        // this.setState({
        //   artistId: res.artists.items[0].id
        // });
        console.log(res);
        console.log(res.artists.items[0].id);

        fetch("https://api.spotify.com/v1/artists/" + res.artists.items[0].id + "/related-artists",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer BQDL-mS0WCbEKOC82T1e6ei6OhTUATjBmnP6bjCThKOwzqVSIqhbv1sL4XYfRxln9WODBSqJb_2BHnimgF5w5OxnTiRj7UEspKi9D5CdVSxqioxtxwwEOQU09xazZvW5KTz14lq6NMIleX9VjIAF9xV38MZibtmsSTpAYjf1G4r0_Lqmrg"
            }
          }).then(r2 => r2.json())
          .then(res2 => {
            console.log(res2);
            var artists = (res2.artists);

            for(var i in artists) {
              var node = { name: artists[i].name, popularity: artists[i].followers.total };
              var link = { source: artists[i].name, target: this.state.artist };
              // var tempNodes = this.state.nodes;
              // var templinks = this.state.links;
              // templinks.push(link);
              // tempNodes.push(node);
              graph.nodes.push(node);
              graph.links.push(link);

            }
            var nodeGrimes = { name: this.state.artist, popularity: 10000 };
            // var tempNodes2 = this.state.nodes;
            // tempNodes2.push(nodeGrimes);
            graph.nodes.push(nodeGrimes);
            // this.setState({
            //   nodes: tempNodes2
            // });
            console.log(this.state);

            var canvas = d3.select("#network"),
              ctx = canvas.node().getContext("2d"),
              r = 30,
              width = canvas.attr("width"),
              height = canvas.attr("height"),
              color = d3.scaleOrdinal(d3.schemeCategory20),
              simulation = d3.forceSimulation()
                .force("x", d3.forceX(width / 2))
                .force("y", d3.forceY(height / 3.5))
                .force("collide", d3.forceCollide(r + 1))
                .force("charge", d3.forceManyBody().strength(-2000))
                .force("link", d3.forceLink()
                  .id(function(d) { return d.name; }));


            console.log(graph);


            simulation.nodes(graph.nodes);
            simulation.force("link").links(graph.links);
            simulation.on("tick", update);

            canvas
              .call(d3.drag()
                .container(canvas.node())
                .subject(dragsubject)
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

            function update() {
              ctx.clearRect(0, 0, width, height);


              ctx.strokeStyle = "#aaa";
              ctx.globalAlpha = 1;
              graph.links.forEach(drawLink);
              // console.log("que dicen");
              ctx.stroke();

              ctx.beginPath();
              ctx.globalAlpha = 1.0;
              graph.nodes.forEach(drawNode);

            }

            function dragsubject() {
              return simulation.find(d3.event.x, d3.event.y);
            }



            function dragstarted() {
              if(!d3.event.active) simulation.alphaTarget(0.3).restart();
              d3.event.subject.fx = d3.event.subject.x;
              d3.event.subject.fy = d3.event.subject.y;
              console.log(d3.event.subject);
            }

            function dragged() {
              d3.event.subject.fx = d3.event.x;
              d3.event.subject.fy = d3.event.y;
            }

            function dragended() {
              if(!d3.event.active) simulation.alphaTarget(0);
              d3.event.subject.fx = null;
              d3.event.subject.fy = null;
            }


            function drawNode(d) {
              ctx.beginPath();
              ctx.fillStyle = color(d.party);
              ctx.moveTo(d.x, d.y);
              ctx.arc(d.x, d.y, d.popularity / 100000, 0, Math.PI * 2);
              ctx.fill();
              ctx.beginPath();
              ctx.fillStyle = "black";
              ctx.fillText(d.name, d.x + 10, d.y);
              ctx.fill();


            }


            function drawLink(l) {
              // console.log("hola")
              ctx.moveTo(l.source.x, l.source.y);
              ctx.lineTo(l.target.x, l.target.y);
            }
            update();

          });
      });





  }

  componentDidMount() {

  }
  onPressEnter(event) {
    var content = event.target.value;
    if(event.which === 13) {
      this.setState({
        artist: content
      });

    }
  }
  render() {
    return (
      <div>
        <h1>Ingresa El nombre de un artista!</h1>
        <div>
          <Login/>
        </div>
        <div>
          <PlaylistList/>
        </div>
        <div>
          <input type="text" id="textField1" ref="elReInput" onKeyPress={this.onPressEnter.bind(this)} />
        </div>

        <canvas id="network" width="800" height="800"></canvas>
      </div>

    )
  }
}