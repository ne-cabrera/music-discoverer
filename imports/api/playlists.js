import { Meteor } from "meteor/meteor";
import { HTTP } from "meteor/http";

Meteor.methods({
  "playlists.getPlaylists"(){
    var playlists = HTTP.call("GET", "https://api.spotify.com/v1/me/playlists",{
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Meteor.user().services.spotify.accessToken
      }
    });
    var res = JSON.parse(playlists.content);
    return res;
  },
  "playlist.getTracks"(playlistId){
    var tracks = HTTP.call("GET", "https://api.spotify.com/v1/users/" + Meteor.user().services.spotify.id + "/playlists/" + playlistId + "/tracks",{
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Meteor.user().services.spotify.accessToken
      }
    });
    var res = JSON.parse(tracks.content);
    return res;
  },
  "playlists.getRecentlyPlayed"(){
    var tracks = HTTP.call("GET", "https://api.spotify.com/v1/me/player/recently-played",{
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Meteor.user().services.spotify.accessToken
      }
    });
    var res = JSON.parse(tracks.content);
    return res;
  }
});