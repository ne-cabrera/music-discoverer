import { Meteor } from "meteor/meteor";
import { HTTP } from "meteor/http";


Meteor.methods({
  "songs.getArtists"(artist, accessToken) {
    var options = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + accessToken
      }
    };
    console.log(artist);
    var a = HTTP.call("GET", "https://api.spotify.com/v1/search?q=" + artist + "&type=artist&market=us&limit=2", options);
    var jRes = JSON.parse(a.content);
    var artId = jRes.artists.items[0].id;
    var b = HTTP.call("GET", "https://api.spotify.com/v1/artists/" + artId + "/related-artists", options);
    var jRes2 = JSON.parse(b.content);
    return jRes2.artists;
  },
  "songs.getArtistList"(artist) {
    var options = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Meteor.user().services.spotify.accessToken
      }
    };
    var a = HTTP.call("GET", "https://api.spotify.com/v1/search?q=" + artist + "&type=artist&market=us&limit=5", options);
    var jRes = JSON.parse(a.content);
    return jRes;

  },
  "songs.getArtist"(artId) {
    var options = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Meteor.user().services.spotify.accessToken
      }
    };
    var b = HTTP.call("GET", "https://api.spotify.com/v1/artists/" + artId + "/related-artists", options);
    var jRes2 = JSON.parse(b.content);
    return jRes2;
  },
  "songs.getArtistDetail"(artId) {
    var options = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Meteor.user().services.spotify.accessToken
      }
    };
    var b = HTTP.call("GET", "https://api.spotify.com/v1/artists/" + artId, options);
    var jRes2 = JSON.parse(b.content);
    return jRes2;
  },
  "songs.topTracksArtist"(artId) {
    var options = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Meteor.user().services.spotify.accessToken
      }
    };
    var a = HTTP.call("GET", "https://api.spotify.com/v1/artists/" + artId + "/top-tracks?country=US", options);
    var jRes = JSON.parse(a.content);
    return jRes;
  },
  "songs.getRecommendations"(songId) {
    var songs = HTTP.call("GET", "https://api.spotify.com/v1/recommendations?seed_tracks=" + songId, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Meteor.user().services.spotify.accessToken
      }
    });
    var jRes = JSON.parse(songs.content);
    return jRes;
  },
  "songs.getRecoSongName"(songName) {
    var options = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Meteor.user().services.spotify.accessToken
      }
    };
    var a = HTTP.call("GET", "https://api.spotify.com/v1/search?q=" + songName + "&type=track&limit=10", options);
    var jRes = JSON.parse(a.content);
    return jRes;
  }
});