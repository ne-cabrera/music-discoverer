import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const Comments = new Mongo.Collection("comments");

if(Meteor.isServer) {
  Meteor.publish("comments", function commentsPublication() {
    return Comments.find();
  });
}

Meteor.methods({
  "comments.insertComment"(sId, comment, user) {
    Comments.insert({
      songId: sId,
      comment: comment,
      user: user
    });
  }
});