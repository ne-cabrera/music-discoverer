import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import * as d3 from "d3";
import * as d3Chromatic from "d3-scale-chromatic";



export class Graph extends Component {
  constructor(props) {
    super(props);

  }

  componentDidUpdate() {
    var color = d3.scaleSequential(d3Chromatic.interpolateGreens);
    if(this.props.graph === null) return;
    console.log(this.props);
    var canvas = d3.select("#network"),
      ctx = canvas.node().getContext("2d"),
      r = 30,
      width = canvas.attr("width"),
      height = canvas.attr("height"),

      simulation = d3.forceSimulation()
        .force("x", d3.forceX(width / 2))
        .force("y", d3.forceY(height / 2))
        .force("collide", d3.forceCollide(r + 1))
        .force("charge", d3.forceManyBody().strength(-1000))
        .force("link", d3.forceLink()
          .id(function(d) { return d.name; }));



    var graph = this.props.graph;
    console.log(graph);
    simulation.nodes(this.props.graph.nodes);
    simulation.force("link").links(this.props.graph.links);
    simulation.on("tick", update);
    var click = this.props.clickNode;
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
      ctx.globalAlpha = 0.8;
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


    function clickNode(aId) {
      console.log("entre");
      click(aId);
    }

    function dragstarted() {
      console.log("gg");
      if(!d3.event.active) simulation.alphaTarget(0.3).restart();
      d3.event.subject.fx = d3.event.subject.x;
      d3.event.subject.fy = d3.event.subject.y;
      console.log(d3.event.subject);
      clickNode(d3.event.subject.id);
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
    console.log(this.props.pops);
    var scale = d3.scaleLinear()
      .domain([0, d3.max(this.props.pops)])
      .range([0, 20]);

    color.domain([0, d3.max(this.props.pops)]);

    function drawNode(d) {
      ctx.beginPath();
      ctx.fillStyle = color(d.popularity);
      ctx.moveTo(d.x, d.y);
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
  render() {
    return (
      <div>
        <canvas className="elCanva" id="network" width="500" height="300"></canvas>
      </div>
    );
  }
}
