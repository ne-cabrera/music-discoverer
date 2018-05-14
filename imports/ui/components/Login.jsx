import React, { Component } from "react";
import { withHistory, Link } from "react-router-dom";

export class Login extends Component {

  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }

  login() {
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
      <button onClick={this.login}>Login</button>
    );
  }
}