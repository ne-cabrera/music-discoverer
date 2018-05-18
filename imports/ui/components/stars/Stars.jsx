import React, { Component } from "react";
import * as d3 from "d3";

export default class Stars extends Component {

  constructor(props){
    super(props);
    this.renderStars = this.renderStars.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e){
    var num = e.target.getAttribute("value");
    console.log(num);
    //Meteor.call("ratings.addRating", sId, num)
  }

  renderStars(){
    var arr =[];
    for(let i = 0; i < 5; i++){
      let st = <span className="fa fa-star estrella" key={i} value={i+1} onClick={this.handleClick}></span>;
      arr.push(st);
    }
    return arr;
  }

  componentDidMount(){
    var stars = d3.select(".starsCont")
      .selectAll(".estrella")
      .on("mouseover", function(){
        console.log("aaaaa");
        d3.select(this).classed("checked", true);
        var prev = this.previousSibling;
        while(prev !== null){
          d3.select(prev).classed("checked", true);
          prev = prev.previousSibling;
        }
      })
      .on("mouseout", function(){
        d3.selectAll(".estrella").classed("checked", false);
      });
  }
    
  render() {
    return (
      <div className="starsCont">
        {this.renderStars().map( (d) => {
          return d;
        })}
      </div>
    );
  }
}
