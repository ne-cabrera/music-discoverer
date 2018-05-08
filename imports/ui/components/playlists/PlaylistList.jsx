import React, { Component } from "react";
import PlaylistListItem from "./PlaylistListItem";

export default class PlaylistList extends Component {
  constructor(props){
    super(props);
    this.state = {
      playlists: []
    };
  }
  componentDidMount(){
    Meteor.call("playlists.getPlaylists", (err, res) =>{
      if(err){
        console.log(err);
      }
      else{
        var arr = [];
        res.items.map((d) => {
          var obj = {};
          obj.id = d.id;
          obj.name = d.name;
          arr.push(obj);
        });
        this.setState({
          playlists: arr
        });
      }
    });
  }
  render() {
    return (
      <ul className="list-group">
        {this.state.playlists.map((d, i) =>(
          <PlaylistListItem name={d.name} id={d.id} key={i}/>
        ))}
      </ul>
    );
  }
}
