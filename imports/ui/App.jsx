import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import * as d3 from "d3";
import { Login } from "./components/Login";
import { NavBarHome } from "./components/navs/NavBarHome";
import { Carousel } from "./components/Carousel";
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
  onLogin() {
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
        <NavBarHome onLogin={this.onLogin.bind(this)} />
        <div>
          <Carousel />
        </div>
        <div>
          <Login />
        </div>
        <div>
          <input type="text" id="textField1" ref="elReInput" onKeyPress={this.onPressEnter.bind(this)} />
        </div>
        <div className="elCanva">
          <canvas className="elCanva" id="network" width="800" height="1000"></canvas>
        </div>

      </div>

    );
  }
}