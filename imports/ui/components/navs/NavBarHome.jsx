import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Login } from "../Login";
export class NavBarHome extends Component {
  constructor(props) {
    super(props);
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
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg fixed-top nav-down" >
          <div className="container">
            <div className="navbar-translate">
              <div className="navbar-header">
                Music Discoverer
              </div>
              <button className="navbar-toggler navbar-burger" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-bar">hola</span>
                <span className="navbar-toggler-bar"></span>
                <span className="navbar-toggler-bar"></span>
              </button>
            </div>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ml-auto">
                <Login />
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

