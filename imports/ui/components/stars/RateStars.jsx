import React, { Component } from 'react';
import {Ratings} from "../../../api/ratings";
import { withTracker } from "meteor/react-meteor-data";
import { Session } from "meteor/session";
import * as d3 from "d3";

class RateStars extends Component {

    renderStars(){
        var arr =[];
        for(let i = 0; i < 5; i++){
          let st = <span className="fa fa-star estrellaR" key={i} value={i+1} onClick={this.handleClick}></span>;
          arr.push(st);
        }
        return arr;
      }

      componentDidUpdate(){
      var n =0
      var num = 0;
      console.log(this.props);
      if(this.props.rating !== undefined){
        var suma = 0;
        for(let i = 0; i < this.props.rating.length; i++){
            suma += parseInt(this.props.rating[i].val);
        }
        prom = suma/this.props.rating.length;
        num = Math.ceil(prom);
      }
      console.log(prom);
    var st = d3.select(".rStarsCont")
    .selectAll(".estrellaR")
    .each( function() {
        console.log("bbbbb");
        if(num > n){
            d3.select(this).classed("checked", true);
            n ++;
        }
    })
  }

  shouldComponentUpdate(nextProps, nextState){
      d3.select(".rStarsCont")
      .selectAll(".estrellaR").classed("checked", false);
      return true
  }

  render() {
    return (
        <div className="rStarsCont">
        {this.renderStars().map( (d) => {
          return d;
        })}
      </div>
    )
  }
}
export default withTracker(() => {
    Meteor.subscribe("ratings");
    let sId = sessionStorage.getItem("sId");
    let p = Session.get("songId");
    console.log(sId);
    console.log(p);
	return {
        rating: Ratings.find({sid: p}).fetch()
	};
})(RateStars);
