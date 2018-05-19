import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";

export const Ratings = new Mongo.Collection("ratings");
if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish("ratings", function ratingsPublication() {
    return Ratings.find();
  });
}

Meteor.methods({
  "ratings.addRating"(sId, pRating){
    if (! this.userId) {
      throw new Meteor.Error("not-authorized");
    }
    Ratings.insert({
        sid: sId,
        val: pRating
    })
  }
});