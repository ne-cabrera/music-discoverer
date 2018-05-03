import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import * as d3 from "d3";

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
    console.log(this.state.artist);
    fetch("https://api.spotify.com/v1/search?q=" + this.state.artist + "&type=artist&market=us&limit=2",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer BQA1aDgw4B3vGzMeT7UUQfNXyDWdlMUK-W96SaNlszVFDTg2K4G-r9IAbyQBs6vmaPykYHY2lJBPnM9G2St7M5tCHYt5E0yyisRX0eLjL86Eth55_wNMpkT9w_teiwxjohj-y3Pf4On9eXHKSZebsQcx10ndIleev7g"
        }
      }
    ).then(r => r.json())
      .then(res => {
        // this.setState({
        //   artistId: res.artists.items[0].id
        // });
        console.log(res);
        console.log(res.artists.items[0].id);
        popu = res.artists.items[0].followers.total;

        fetch("https://api.spotify.com/v1/artists/" + res.artists.items[0].id + "/related-artists",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer BQA1aDgw4B3vGzMeT7UUQfNXyDWdlMUK-W96SaNlszVFDTg2K4G-r9IAbyQBs6vmaPykYHY2lJBPnM9G2St7M5tCHYt5E0yyisRX0eLjL86Eth55_wNMpkT9w_teiwxjohj-y3Pf4On9eXHKSZebsQcx10ndIleev7g"
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
              pops.push(artists[i].followers.total);
              graph.nodes.push(node);
              graph.links.push(link);

            }
            var nodeGrimes = { name: this.state.artist, popularity: popu };
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
        <h1>Ingresa el nombre de un artista!</h1>

        <div className="laGrimes">
          <img className="laFotoGrimes" src="http://soundandvisionmex.com/wp-content/uploads/2015/11/grimes123.jpg" />
          <p className="elTextoDeGrimes">Ella es Grimes y  es muy cool!</p>
        </div>
        <div className="elCanva2">
          <input type="text" id="textField1" ref="elReInput" onKeyPress={this.onPressEnter.bind(this)} />
        </div>
        <div className="elCanva">
          <canvas className="elCanva" id="network" width="800" height="1000"></canvas>
        </div>

      </div>

    );
  }
}