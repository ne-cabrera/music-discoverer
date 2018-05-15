import React, { Component } from "react";
import ListsContainer from "./ListsContainer";

export default class MainContainer extends Component {

  constructor(props){
    super(props);
    this.clickSong = this.clickSong.bind(this);
  }

  clickSong(sId){
    Meteor.call("songs.getRecommendations", sId, (err, res) => {
      if(err) throw(err);
      console.log(res);
    });
  }


    
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
            <ListsContainer onClick={this.clickSong}/>
          </div>
          <div className="col-md-8">
          </div>
        </div>
      </div>
    );
  }
}
