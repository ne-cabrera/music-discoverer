import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";

export const Ratings = new Mongo.Collection("ratings");
if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish("ratings", function commentsPublication() {
    return Ratings.find();
  });
}

Meteor.methods({
  "ratings.addRating"(sId, pRating){
    if (! this.userId) {
      throw new Meteor.Error("not-authorized");
    }
    var exists = Ratings.find({id: sId}).fetch();
    if(exists.length === 0){
      Ratings.insert({
        rating: pRating,
        num: 1
      });
    }
    else{
      var r = Ratings.find({id: sId}).fetch();
      let n = r[0].num;
      let ra = r[0].rating;
      ra *= n;
      ra += pRating;
      n ++;
      ra /= n;
      Ratings.update( {id: sId}, 
        {
          rating: ra,
          num: n
        });
    }
  }
});