import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { Login } from "../Login";
import { Redirect } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";

class NavBarHome extends Component {
  constructor(props) {
    super(props);
    this.checkLogin = this.checkLogin.bind(this);
  }

  handleLogin() {
    var options = {
      showDialog: true, // Whether or not to force the user to approve the app again if they’ve already done so.
      requestPermissions: ["user-read-email"] // Spotify access scopes.
    };
    Meteor.loginWithSpotify(options, function(err) {
      console.log(err || "No error");
    });
  }

  
  checkLogin(){
    console.log(this.props.uId);
    console.log(this.props.usr);
    var t = new Date();
    if(this.props.uId !== null){
      if(this.props.usr !== undefined){
        if(this.props.usr.services.spotify.expiresAt > t.getTime()){
          return <Redirect to="/playlists"/>;
        }
        else{
          Meteor.logout();
          return <div></div>;
        }
      }
    }
    else{
      return <div></div>;
    }
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg fixed-top nav-down" >
          <div className="container">
            <div className="navbar-translate">
              <div className="navbar-header">
                Music Discoverer
              </div>
            </div>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Login/>
                  {this.checkLogin()}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
export default withTracker(() => {
  return {
    uId: Meteor.userId(),
    usr: Meteor.user()
  };
})(NavBarHome);
