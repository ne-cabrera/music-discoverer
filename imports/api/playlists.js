import { Meteor } from "meteor/meteor";
import { HTTP } from "meteor/http";

Meteor.methods({
  "playlists.getPlaylists"(){
    console.log(Meteor.user());
    var playlists = HTTP.call("GET", "https://api.spotify.com/v1/me/playlists",{
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Meteor.user().services.spotify.accessToken
      }
    });
    var res = JSON.parse(playlists.content);
    return res;
  }
});