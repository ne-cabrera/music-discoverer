import React, {Component} from "react";

export class Login extends Component{

  constructor(props){
    super(props);
    this.login = this.login.bind(this);
  }

  login(){
    var options = {
      showDialog: true, // Whether or not to force the user to approve the app again if they’ve already done so.
      requestPermissions: ["user-read-email playlist-read-private"] // Spotify access scopes.
    };
    Meteor.loginWithSpotify(options, function(err) {
      console.log(err || "No error");
    });
  }

  render(){
    return(
      <button className="nav-link" onClick={this.login}>Login</button>
    );
  }
}