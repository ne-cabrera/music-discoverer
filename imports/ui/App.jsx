import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import * as d3 from "d3";
import { Login } from "./components/Login";
import { NavBarHome } from "./components/navs/NavBarHome";
import { Carousel } from "./components/Carousel";
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
    const graph = {
      nodes: [

      ],
      links: [

      ]
    };
    var pops = [];
    var popu = 0;

    Meteor.call("songs.getArtists", this.state.artist, Meteor.user().services.spotify.accessToken, (error, result) => {
      if(error) {
        throw error;
      } else {

        var artists = result;

        for(var i in artists) {
          var node = { name: artists[i].name, popularity: artists[i].followers.total };
          var link = { source: artists[i].name, target: this.state.artist };
          pops.push(artists[i].followers.total);
          graph.nodes.push(node);
          graph.links.push(link);

        }
        var nodeGrimes = { name: this.state.artist, popularity: popu };
        graph.nodes.push(nodeGrimes);
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
            .force("charge", d3.forceManyBody().strength(-3200))
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
          ctx.globalAlpha = 2.0;
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
        console.log(pops);
        var scale = d3.scaleLinear()
          .domain([0, d3.max(pops)])
          .range([0, 40]);

        function drawNode(d) {
          ctx.beginPath();
          ctx.fillStyle = color(d.popularity);
          ctx.moveTo(d.x, d.y);
          console.log(scale(d.popularity));
          ctx.arc(d.x, d.y, scale(d.popularity), 0, Math.PI * 2);
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

      }
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
  onLogin() {
    var options = {
      showDialog: true, // Whether or not to force the user to approve the app again if they’ve already done so.
      requestPermissions: ["user-read-email"] // Spotify access scopes.
    };
    Meteor.loginWithSpotify(options, function(err) {
      console.log(err || "No error");
    });
  }
  render() {
    return (
      <div>
        <NavBarHome onLogin={this.onLogin.bind(this)} />
        <div>
          <Carousel />
        </div>
        <div>
          <Login onLogin={this.onLogin.bind(this)} />
        </div>
        <div>
          <input type="text" id="textField1" ref="elReInput" onKeyPress={this.onPressEnter.bind(this)} />
        </div>
        <div className="elCanva">
          <canvas className="elCanva" id="network" width="800" height="1000"></canvas>
        </div>

      </div>

    );
  }
}