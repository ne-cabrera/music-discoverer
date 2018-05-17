import { Meteor } from "meteor/meteor";
import "../imports/api/songs";
import "../imports/api/playlists";
import "../imports/api/comments";
Meteor.startup(() => {
  ServiceConfiguration.configurations.update(
    { "service": "spotify" },
    {
      $set: {
        "clientId": Meteor.settings.clientId,
        "secret": Meteor.settings.secret
      }
    },
    { upsert: true }
  );
});
