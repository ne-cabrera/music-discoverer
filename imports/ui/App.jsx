import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import * as d3 from "d3";
import { Login } from "./components/Login";
import NavBarHome from "./components/navs/NavBarHome";
import { Carousel } from "./components/Carousel";
import Footer from "./components/Footer";
import Steps from "./components/Steps";
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
        <NavBarHome />
        <div>
          <Carousel />
        </div>
        <div>
          <Steps />
        </div>
        <div>
          <Footer />
        </div>

      </div>

    );
  }
}