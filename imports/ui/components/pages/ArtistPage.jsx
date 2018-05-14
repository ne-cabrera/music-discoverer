import React from "react";
import { MainNav } from "../navs/MainNav";
import * as d3 from "d3";
import { Meteor } from "meteor/meteor";
import { ArtistDetail } from "../artists/ArtistDetail";
export default class ArtistPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      artist: "",
      cosmicLove: ""
    };
    this.cosmicLove = {};
  }


  componentDidUpdate(prevState) {
    if(prevState.artist !== this.state.artist) {
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
              .on("start", dragstarted.bind(this))
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
            this.cosmicLove = d3.event.subject;
            console.log(this.cosmicLove);
            this.setState({
              cosmicLove: d3.event.subject
            });

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
            // console.log(scale(d.popularity));
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

    } else {
      console.log("cbro");
    }




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
    console.log(this.cosmicLove);
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
        <div className="container">
          <div className="elCanva">
            <canvas className="elCanva" id="network" width="800" height="1000"></canvas>
          </div>
        </div>
        <ArtistDetail artist={this.cosmicLove} />
      </div>


    );
  }
}
