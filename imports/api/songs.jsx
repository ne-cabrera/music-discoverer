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
  }
});