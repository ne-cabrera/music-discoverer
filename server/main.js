import { Meteor } from "meteor/meteor";
import "../imports/api/songs";
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
