import { Meteor } from "meteor/meteor";
import { HTTP } from "meteor/http";

Meteor.methods({
  "songs.getSong"(songName) {
    console.log(songName);
    var result = HTTP.call("GET", "https://api.spotify.com/v1/search?q=" + songName + "&type=track",

    );
    return result;
  }
});